"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calculator, ChevronDown, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button" // (unused)
import { getWeaponById, Weapon } from "../../../lib/weapons-data"
import {
  getArmorByGearType,
  getActiveSetEffects,
} from "../../../lib/armor-data"
import { getModsByGearType } from "../../../lib/mods-data"

export default function WeaponDetailPage() {
  const params = useParams()
  const weaponId = params.weaponId as string

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [weapon, setWeapon] = useState<Weapon | null>(null)
  const [formulaExpanded, setFormulaExpanded] = useState(false)

  // Calculator state
  const [psiIntensity, setPsiIntensity] = useState("")
  const [elementalDamage, setElementalDamage] = useState("")
  const [statusDamage, setStatusDamage] = useState("")
  const [enemyDamageMultiplier, setEnemyDamageMultiplier] = useState("")
  const [vulnerability, setVulnerability] = useState("")
  const [usingVulnAmp, setUsingVulnAmp] = useState(false)
  const [burnDamageBonus, setBurnDamageBonus] = useState("")
  const [frostDamageBonus, setFrostDamageBonus] = useState("")

  // Armor and mod selection state
  const [selectedArmor, setSelectedArmor] = useState<Record<string, string>>({})
  const [selectedMods, setSelectedMods] = useState<Record<string, string>>({})
  const [keyArmor, setKeyArmor] = useState<string>("")

  useEffect(() => {
    const weaponData = getWeaponById(weaponId)
    setWeapon(weaponData || null)
  }, [weaponId])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const getThemeColors = (weapon: Weapon) => {
    const hasBurn = weapon.specialAbilities?.some((ability) =>
      ability.toLowerCase().includes("burn")
    )
    const hasFrost = weapon.specialAbilities?.some((ability) =>
      ability.toLowerCase().includes("frost")
    )

    if (hasBurn) {
      return {
        background: "bg-gradient-to-br from-black via-orange-950 to-black",
        cardBg: "bg-black/60",
        buttonBg:
          "bg-gradient-to-r from-orange-800 to-black hover:from-orange-700 hover:to-gray-900 border-orange-500/50",
        accent: "text-orange-400",
        secondaryAccent: "text-orange-300",
        highlight: "text-orange-200",
        border: "border-orange-500/30",
      }
    }

    if (hasFrost) {
      return {
        background: "bg-gradient-to-br from-black via-blue-950 to-slate-900",
        cardBg: "bg-black/60",
        buttonBg:
          "bg-gradient-to-r from-blue-800 to-slate-900 hover:from-blue-700 hover:to-slate-800 border-blue-500/50",
        accent: "text-blue-400",
        secondaryAccent: "text-blue-300",
        highlight: "text-blue-200",
        border: "border-blue-500/30",
      }
    }

    return {
      background: "bg-gradient-to-br from-gray-950 to-black",
      cardBg: "bg-gray-900/40",
      buttonBg:
        "bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border-gray-500/50",
      accent: "text-gray-400",
      secondaryAccent: "text-gray-300",
      highlight: "text-gray-200",
      border: "border-gray-500/30",
    }
  }

  // Active set effects & Deviant Energy bonus
  const activeSets = getActiveSetEffects(selectedArmor)
  const sheltererSet = activeSets.find((set) => set.setName === "Shelterer Set")
  const hasSheltererTier3 = sheltererSet && sheltererSet.pieces >= 3
  const hasSheltererTier4 = sheltererSet && sheltererSet.pieces >= 4
  const deviantEnergyBonus = hasSheltererTier4 ? 30 : hasSheltererTier3 ? 20 : 0 // 30 stacks if 4+ pieces, 20 if 3+ pieces, 0 otherwise

  // Check weapon type
  const isFrostWeapon = weapon?.specialAbilities?.some((ability) =>
    ability.toLowerCase().includes("frost")
  )
  const isBurnWeapon = weapon?.specialAbilities?.some((ability) =>
    ability.toLowerCase().includes("burn")
  )

  const burnResults = useMemo(() => {
    const psi = parseFloat(psiIntensity) || 0
    const elemental = parseFloat(elementalDamage) || 0
    const status = parseFloat(statusDamage) || 0
    const enemyMultiplier = parseFloat(enemyDamageMultiplier) || 0
    const vuln = (parseFloat(vulnerability) || 0) + (usingVulnAmp ? 8 : 0)
    const markedTargetBonus =
      keyArmor === "shoes" && selectedArmor.shoes === "earthly-boots" ? 30 : 0
    const burnBonus = parseFloat(burnDamageBonus) || 0
    const frostBonus = parseFloat(frostDamageBonus) || 0

    // Set bonuses are already included in game stats, so only add Deviant Energy
    const totalElemental = elemental + deviantEnergyBonus
    const totalStatus = status

    if (isFrostWeapon) {
      // Check if this is KAM - Abyss Glance (has enhanced frequency)
      const isAbyssGlance = weapon?.id === "kam-abyss-glance"

      // Frost Vortex calculations
      const frostBaseFactor = 0.5 // 50% Psi Intensity per 0.5s
      const maxTicks = isAbyssGlance ? 11 : 8 // 11 ticks for Abyss Glance (max stacking at tick 10), 8 ticks for normal frost

      // Abyss Glance specific bonuses
      // Meta-Human penalty is 30% damage against Meta-Humans (note: not applied in base calculation)

      // Check for Frostwave Wither mod (mask slot) - gives +30% Frost Vortex Final DMG
      const hasFrostwaveWither = selectedMods.mask === "frostwave-wither"
      const frostwaveWitherBonus = hasFrostwaveWither ? 30 : 0

      // Base frost damage per tick (Status DMG)
      // Actual Factor = 50% × (1 + Elemental%) × (1 + Status%)
      // Note: Frostwave Wither is applied as a separate final multiplier, not here
      const baseFrostPerTick =
        psi *
        frostBaseFactor *
        (1 + totalElemental / 100) *
        (1 + totalStatus / 100) *
        (1 + frostBonus / 100) *
        (1 + (enemyMultiplier + markedTargetBonus) / 100) *
        (1 + vuln / 100)

      // Normal frost (no vuln/marked)
      const normalFrostPerTick =
        psi *
        frostBaseFactor *
        (1 + totalElemental / 100) *
        (1 + totalStatus / 100) *
        (1 + frostBonus / 100) *
        (1 + enemyMultiplier / 100)

      // Build frost ticks (8 or 11 ticks total)
      // For KAM - Abyss Glance: Each tick adds +5% stacking bonus (max +50% at tick 10)
      // After tick 10, damage stays the same
      const makeFrostTicks = (v: number, withCryoBlast: boolean = false) => {
        const ticks: Record<string, number> = {}
        for (let i = 1; i <= maxTicks; i++) {
          if (isAbyssGlance) {
            // KAM - Abyss Glance stacking bonus: +5% per tick, max +50% at tick 10
            const stackingBonus = Math.min(i - 1, 10) * 5 // +5% per hit, max 10 hits = +50%

            // Cryo Blast: +4% per stack, max 5 stacks = +20%
            // Assuming you're continuously shooting, you get max stacks quickly
            const cryoBlastBonus = withCryoBlast ? Math.min(i - 1, 5) * 4 : 0

            // Calculate damage with all multipliers
            let damage =
              v * (1 + stackingBonus / 100) * (1 + cryoBlastBonus / 100)

            // Frostwave Wither: +30% final DMG, decreasing by 8% per second
            // Note: When re-proccing, the bonus resets to +30%, causing damage to fluctuate
            // The calculator shows the decay over time, but max damage (455+) can occur when
            // stacks align perfectly with a fresh +30% proc at later ticks
            if (hasFrostwaveWither) {
              const timeInSeconds = (i - 1) * 0.25 // Time elapsed since first tick
              const frostwaveDecay = Math.max(0, 30 - timeInSeconds * 8) // Min 0%
              damage = damage * (1 + frostwaveDecay / 100)
            }

            ticks[`t${i}`] = Math.round(damage)
          } else {
            // Normal frost: no stacking
            let damage = v
            if (hasFrostwaveWither) {
              const timeInSeconds = (i - 1) * 0.5 // Normal frost ticks every 0.5s
              const frostwaveDecay = Math.max(0, 30 - timeInSeconds * 8) // Min 0%
              damage = damage * (1 + frostwaveDecay / 100)
            }
            ticks[`t${i}`] = Math.round(damage)
          }
        }
        return ticks
      }

      const normalFrostTicks = makeFrostTicks(normalFrostPerTick)
      const enhancedFrostTicks = makeFrostTicks(baseFrostPerTick)

      // Check if Cryo Blast mod is equipped
      const hasCryoBlast = selectedMods.weapon === "cryo-blast"
      const cryoBlastFrostTicks = hasCryoBlast
        ? makeFrostTicks(baseFrostPerTick, true)
        : null

      // Build the result object dynamically
      const result: any = {
        normalExplosion: 0, // Frost doesn't have explosion
        explosion: 0, // Frost doesn't have explosion
      }

      // Add normal ticks
      for (let i = 1; i <= maxTicks; i++) {
        result[`normalTick${i}`] = normalFrostTicks[`t${i}`]
        result[`tick${i}`] = enhancedFrostTicks[`t${i}`]
      }

      // Add Cryo Blast ticks if mod is equipped
      if (hasCryoBlast && cryoBlastFrostTicks) {
        for (let i = 1; i <= maxTicks; i++) {
          result[`cryoBlastTick${i}`] = cryoBlastFrostTicks[`t${i}`]
        }
      }

      return result
    } else {
      // Burn weapon calculations (existing logic)
      // Blaze Amplifier increases factor 0.12 -> 0.15
      const blazeAmplifierMod = selectedMods.mask === "blaze-amplifier"
      const burnDamageFactor = blazeAmplifierMod ? 0.15 : 0.12

      // Base per tick (with vuln/marked)
      const baseDamagePerTick =
        psi *
        burnDamageFactor *
        (1 + totalElemental / 100) *
        (1 + totalStatus / 100) *
        (1 + burnBonus / 100) *
        (1 + (enemyMultiplier + markedTargetBonus) / 100) *
        (1 + vuln / 100)

      // Normal (no vuln/marked)
      const normalBaseDamagePerTick =
        psi *
        burnDamageFactor *
        (1 + totalElemental / 100) *
        (1 + totalStatus / 100) *
        (1 + burnBonus / 100) *
        (1 + enemyMultiplier / 100)

      // Build rounded ticks
      const makeTicks = (v: number) => ({
        t1: Math.round(v * 1),
        t2: Math.round(v * 2),
        t3: Math.round(v * 3),
        t4: Math.round(v * 4),
        t5: Math.round(v * 5),
        t6: Math.round(v * 6),
        t7: Math.round(v * 7),
      })

      const normalTicks = makeTicks(normalBaseDamagePerTick)
      const ticks = makeTicks(baseDamagePerTick)

      // Explosion damage with step rounding to better match in‑game behavior
      const step = (x: number) => Math.floor(x * 1000) / 1000
      const exp1 = step(psi)
      const exp2 = step(exp1 * (1 + totalElemental / 100))
      const exp3 = step(exp2 * (1 + totalStatus / 100))
      const exp4 = step(exp3 * (1 + 200 / 100)) // Initial bonus 200%
      const exp5 = step(exp4 * (1 + 0 / 100)) // Final bonus 0%
      const exp6 = step(
        exp5 * (1 + (enemyMultiplier + markedTargetBonus) / 100)
      )
      const exp7 = step(exp6 * (1 + vuln / 100))
      const explosion = Math.round(exp7)

      // Normal explosion (no vuln/marked)
      const n1 = step(psi)
      const n2 = step(n1 * (1 + totalElemental / 100))
      const n3 = step(n2 * (1 + totalStatus / 100))
      const n4 = step(n3 * (1 + 200 / 100))
      const n5 = step(n4 * (1 + 0 / 100))
      const n6 = step(n5 * (1 + enemyMultiplier / 100))
      const normalExplosion = Math.round(n6)

      return {
        // Normal
        normalTick1: normalTicks.t1,
        normalTick2: normalTicks.t2,
        normalTick3: normalTicks.t3,
        normalTick4: normalTicks.t4,
        normalTick5: normalTicks.t5,
        normalTick6: normalTicks.t6,
        normalTick7: normalTicks.t7,
        normalExplosion,
        // Enhanced
        tick1: ticks.t1,
        tick2: ticks.t2,
        tick3: ticks.t3,
        tick4: ticks.t4,
        tick5: ticks.t5,
        tick6: ticks.t6,
        tick7: ticks.t7,
        explosion,
      }
    }
  }, [
    psiIntensity,
    elementalDamage,
    statusDamage,
    enemyDamageMultiplier,
    burnDamageBonus,
    frostDamageBonus,
    selectedMods,
    selectedArmor,
    vulnerability, // ✅ missing in original
    usingVulnAmp, // ✅ missing in original
    keyArmor, // ✅ missing in original
    deviantEnergyBonus,
    weapon, // Add weapon to dependencies for frost detection
  ])

  if (!weapon) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-xl'>Loading...</div>
      </div>
    )
  }

  const theme = getThemeColors(weapon)

  return (
    <div
      className={`min-h-screen ${theme.background} relative overflow-hidden pt-16`}
    >
      {/* Background Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Grid Lines */}
        <div
          className='absolute inset-0 opacity-20'
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
          }}
        />

        {/* Flowing Lines */}
        <div
          className='absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-orange-400/30 to-transparent transform transition-all duration-1000 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.01}px) translateY(${
              mousePosition.y * 0.005
            }px)`,
          }}
        />
        <div
          className='absolute top-40 right-20 w-24 h-1 bg-gradient-to-r from-transparent to-orange-400/20 transform transition-all duration-1200 ease-out'
          style={{
            transform: `translateX(${-mousePosition.x * 0.008}px) translateY(${
              mousePosition.y * 0.012
            }px)`,
          }}
        />
        <div
          className='absolute bottom-32 left-1/4 w-40 h-1 bg-gradient-to-r from-orange-400/20 to-transparent transform transition-all duration-800 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.006}px) translateY(${
              -mousePosition.y * 0.008
            }px)`,
          }}
        />

        {/* Geometric Shapes */}
        <div
          className='absolute top-32 right-16 w-16 h-16 border border-white/8 transform transition-all duration-1000 ease-out'
          style={{
            transform: `rotate(${45 + mousePosition.x * 0.01}deg) translate(${
              mousePosition.x * 0.01
            }px, ${mousePosition.y * 0.01}px)`,
          }}
        />
        <div
          className='absolute top-40 right-32 w-24 h-24 border border-white/8 transform transition-all duration-800 ease-out'
          style={{
            transform: `rotate(${-30 + mousePosition.y * 0.008}deg) translate(${
              -mousePosition.x * 0.005
            }px, ${mousePosition.y * 0.015}px)`,
          }}
        />

        {/* Additional Futuristic Elements */}
        <div
          className='absolute top-1/4 right-20 w-16 h-16 border border-white/6 transform transition-all duration-1200 ease-out'
          style={{
            transform: `rotate(${60 + mousePosition.x * 0.003}deg) translate(${
              mousePosition.x * 0.008
            }px, ${mousePosition.y * 0.012}px)`,
          }}
        />
        <div
          className='absolute bottom-1/4 left-40 w-20 h-20 border border-white/7 transform transition-all duration-900 ease-out'
          style={{
            transform: `rotate(${-45 + mousePosition.y * 0.006}deg) translate(${
              -mousePosition.x * 0.007
            }px, ${mousePosition.y * 0.009}px)`,
          }}
        />

        {/* Hexagonal Elements */}
        <div
          className='absolute top-1/2 right-1/4 w-12 h-12 border border-white/5 transform transition-all duration-1000 ease-out'
          style={{
            transform: `rotate(${30 + mousePosition.x * 0.004}deg) translate(${
              mousePosition.x * 0.006
            }px, ${mousePosition.y * 0.008}px)`,
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
          }}
        />
        <div
          className='absolute bottom-1/3 right-10 w-8 h-8 border border-white/4 transform transition-all duration-800 ease-out'
          style={{
            transform: `rotate(${-60 + mousePosition.y * 0.005}deg) translate(${
              -mousePosition.x * 0.004
            }px, ${mousePosition.y * 0.006}px)`,
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className='relative z-50 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8'>
        {/* Header */}
        <div className='mb-6 sm:mb-8'>
          <Link
            href='/weapons'
            className={`inline-flex items-center space-x-2 ${theme.accent} hover:text-white transition-colors mb-4 sm:mb-6 bg-black/20 px-3 py-2 rounded-lg border ${theme.border} hover:bg-black/40 hover:scale-105 text-sm sm:text-base`}
          >
            <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
            <span className='font-medium'>Back to Weapons</span>
          </Link>

          <div className='grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start'>
            {/* Weapon Info */}
            <div className='col-span-12 md:col-span-7'>
              <div className='flex items-center space-x-4 mb-4'>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    weapon.rarity === "legendary"
                      ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
                      : weapon.rarity === "epic"
                      ? "bg-purple-900/30 text-purple-400 border border-purple-500/30"
                      : "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {weapon.rarity.toUpperCase()}
                </span>
              </div>
              <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight'>
                {weapon.name}
              </h1>
              <p className='text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed'>
                {weapon.description}
              </p>
            </div>

            {/* Special Abilities */}
            <div className='col-span-12 md:col-span-5'>
              <h2 className='text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6'>
                Special Abilities
              </h2>
              <div className='space-y-3 sm:space-y-4'>
                {weapon.specialAbilities?.map((ability, index) => (
                  <div
                    key={index}
                    className={`${theme.cardBg} ${theme.border} border rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:scale-105 transition-all duration-300`}
                  >
                    <p className='text-sm sm:text-base text-gray-200 leading-relaxed'>
                      {ability}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Burn Effect Details */}
        {weapon.specialAbilities?.some((ability) =>
          ability.toLowerCase().includes("burn")
        ) && (
          <div
            className={`${theme.cardBg} ${theme.border} border rounded-3xl p-8 mb-12`}
          >
            <h2 className='text-3xl font-bold text-white mb-6'>
              Burn Effect Details
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  Properties
                </h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Base Damage: 12% Psi Intensity per tick</li>
                  <li>• Duration: 6 seconds</li>
                  <li>• Max Stacks: 7</li>
                  <li>• Damage Type: Elemental</li>
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  Formula:{" "}
                  <button
                    onClick={() => setFormulaExpanded(!formulaExpanded)}
                    className='inline-flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors'
                  >
                    {formulaExpanded ? (
                      <ChevronDown className='w-5 h-5' />
                    ) : (
                      <ChevronRight className='w-5 h-5' />
                    )}
                  </button>
                </h3>
                <div className='bg-black/40 rounded-lg p-4 font-mono text-sm'>
                  <p className='text-gray-300'>
                    Base Damage × (1 + Elemental DMG%) × (1 + Status DMG%) × (1
                    + Burn DMG Bonus%) × (1 + Enemy DMG Multiplier%)
                  </p>
                </div>
                {formulaExpanded && (
                  <div className='mt-4 bg-black/40 rounded-lg p-4 text-sm'>
                    <p className='text-gray-300 mb-2'>
                      <strong className='text-orange-400'>Base Damage:</strong>{" "}
                      Psi Intensity × 0.12
                    </p>
                    <p className='text-gray-300 mb-2'>
                      <strong className='text-orange-400'>
                        Elemental DMG%:
                      </strong>{" "}
                      Increases burn damage
                    </p>
                    <p className='text-gray-300 mb-2'>
                      <strong className='text-orange-400'>Status DMG%:</strong>{" "}
                      Increases burn damage
                    </p>
                    <p className='text-gray-300 mb-2'>
                      <strong className='text-orange-400'>
                        Burn DMG Bonus%:
                      </strong>{" "}
                      Different from elemental damage
                    </p>
                    <p className='text-gray-300 mb-4'>
                      <strong className='text-orange-400'>
                        Enemy DMG Multiplier%:
                      </strong>{" "}
                      Affects final damage
                    </p>
                    <p className='text-gray-300'>
                      <strong className='text-orange-400'>Example:</strong> 500
                      Psi × 0.12 × (1 + 0.2) × (1 + 0.1) × (1 + 0.05) × (1 +
                      0.04) = 87.12 damage per tick
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Frost Effect Details */}
        {weapon.specialAbilities?.some((ability) =>
          ability.toLowerCase().includes("frost")
        ) && (
          <div
            className={`${theme.cardBg} ${theme.border} border rounded-3xl p-8 mb-12`}
          >
            <h2 className='text-3xl font-bold text-white mb-6'>
              Frost Vortex Effect Details
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  Properties
                </h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Base Damage: 50% Psi Intensity per 0.5s</li>
                  <li>
                    • Duration: 4 seconds (
                    {weapon.id === "kam-abyss-glance"
                      ? "11 ticks (max stacking at tick 10)"
                      : "8 ticks"}
                    )
                  </li>
                  <li>• Area of Effect: 4.5m radius</li>
                  <li>• Damage Type: Status DMG (Frost)</li>
                  <li>• Max Vortexes: 1 at a time</li>
                  <li>• Cannot Crit or hit Weakspots</li>
                  {weapon.id === "kam-abyss-glance" && (
                    <>
                      <li>
                        •{" "}
                        <span className='text-blue-400'>
                          Enhanced Frequency:
                        </span>{" "}
                        100% increased tick rate (0.25s intervals)
                      </li>
                      <li>
                        • <span className='text-blue-400'>Stacking Bonus:</span>{" "}
                        +5% damage per hit (max +50%)
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  Formula:{" "}
                  <button
                    onClick={() => setFormulaExpanded(!formulaExpanded)}
                    className='inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors'
                  >
                    {formulaExpanded ? (
                      <ChevronDown className='w-5 h-5' />
                    ) : (
                      <ChevronRight className='w-5 h-5' />
                    )}
                  </button>
                </h3>
                <div className='bg-black/40 rounded-lg p-4 font-mono text-sm'>
                  <p className='text-gray-300'>
                    Actual Factor = 50% × (1 + Frost Vortex DMG Factor Bonus) ×
                    (1 + Frost Vortex Final DMG Bonus)
                  </p>
                </div>
                {formulaExpanded && (
                  <div className='mt-4 bg-black/40 rounded-lg p-4 text-sm'>
                    <p className='text-gray-300 mb-2'>
                      <strong className='text-blue-400'>Base Factor:</strong>{" "}
                      50% Psi Intensity per 0.5s
                    </p>
                    <p className='text-gray-300 mb-2'>
                      <strong className='text-blue-400'>
                        Frost Vortex DMG Factor Bonus:
                      </strong>{" "}
                      Increases the base 50% factor
                    </p>
                    <p className='text-gray-300 mb-2'>
                      <strong className='text-blue-400'>
                        Frost Vortex Final DMG Bonus:
                      </strong>{" "}
                      Final damage multiplier
                    </p>
                    <p className='text-gray-300 mb-4'>
                      <strong className='text-blue-400'>Status DMG%:</strong>{" "}
                      Affects final damage
                    </p>
                    <p className='text-gray-300'>
                      <strong className='text-blue-400'>Example:</strong> 500
                      Psi × 0.50 × (1 + 0.2) × (1 + 0.1) × (1 + 0.15) = 379.5
                      damage per tick
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weapon-Specific Calculator */}
      <div className='w-full bg-gray-900/20 py-12 relative z-50'>
        <div className='max-w-full mx-auto px-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h3
              className={`text-4xl md:text-6xl font-bold mb-6  ${theme.highlight}`}
            >
              {weapon.specialAbilities?.some((ability) =>
                ability.toLowerCase().includes("frost")
              )
                ? "Frost Vortex Damage Calculator"
                : weapon.specialAbilities?.some((ability) =>
                    ability.toLowerCase().includes("burn")
                  )
                ? "Boom Boom Damage Calculator"
                : "Weapon Damage Calculator"}
            </h3>
          </div>

          {/* Main Calculator Layout */}
          <div className='space-y-6'>
            {/* Top Row: Input and Build Setup */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
              {/* Left Sidebar: Weapon Stats */}
              <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-6 lg:col-span-4'>
                <h2 className='text-xl font-bold mb-6 text-gray-300 tracking-wide'>
                  WEAPON STATS
                </h2>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Psi Intensity
                    </label>
                    <input
                      type='number'
                      value={psiIntensity}
                      onChange={(e) => setPsiIntensity(e.target.value)}
                      className='w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
                      placeholder='Enter Psi Intensity'
                      autoComplete='off'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Elemental Damage (%)
                    </label>
                    <input
                      type='number'
                      value={elementalDamage}
                      onChange={(e) => setElementalDamage(e.target.value)}
                      className='w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
                      placeholder='Enter elemental damage %'
                      autoComplete='off'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Status Damage (%)
                    </label>
                    <input
                      type='number'
                      value={statusDamage}
                      onChange={(e) => setStatusDamage(e.target.value)}
                      className='w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
                      placeholder='Enter status damage %'
                      autoComplete='off'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      Enemy Damage Multiplier (%)
                    </label>
                    <input
                      type='number'
                      value={enemyDamageMultiplier}
                      onChange={(e) => setEnemyDamageMultiplier(e.target.value)}
                      className='w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
                      placeholder='Enter enemy damage multiplier %'
                      autoComplete='off'
                    />
                  </div>
                  {isBurnWeapon && (
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Burn Damage Bonus (%)
                      </label>
                      <input
                        type='number'
                        value={burnDamageBonus}
                        onChange={(e) => setBurnDamageBonus(e.target.value)}
                        className='w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
                        placeholder='Enter burn damage bonus %'
                        autoComplete='off'
                      />
                    </div>
                  )}
                  {isFrostWeapon && (
                    <div>
                      <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Frost Damage Bonus (%)
                      </label>
                      <input
                        type='number'
                        value={frostDamageBonus}
                        onChange={(e) => setFrostDamageBonus(e.target.value)}
                        className='w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none transition-colors cursor-text'
                        placeholder='Enter frost damage bonus %'
                        autoComplete='off'
                      />
                    </div>
                  )}
                  <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                      <span className='text-blue-400'>Vulnerability</span>{" "}
                      (Bull's Eye Effect) (%)
                    </label>
                    <div className='flex gap-2'>
                      <input
                        type='number'
                        value={vulnerability}
                        onChange={(e) => setVulnerability(e.target.value)}
                        className='flex-1 bg-gray-800 border border-blue-400 rounded-lg px-3 py-2 text-white focus:border-blue-300 focus:outline-none transition-colors cursor-text'
                        placeholder="Enter vulnerability % (e.g., 8% from Bull's Eye)"
                        autoComplete='off'
                      />
                      <label className='flex items-center gap-2 px-3 py-2 bg-gray-800 border border-blue-400 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors'>
                        <input
                          type='checkbox'
                          checked={usingVulnAmp}
                          onChange={(e) => setUsingVulnAmp(e.target.checked)}
                          className='w-4 h-4 text-blue-400 bg-gray-800 border-blue-400 rounded focus:ring-blue-300 focus:ring-2'
                        />
                        <span className='text-xs text-blue-400 font-medium'>
                          Using Vuln Amp
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Area: Build Setup */}
              <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-6 lg:col-span-8'>
                <h2 className='text-xl font-bold mb-6 text-gray-300 tracking-wide'>
                  BUILD SETUP
                </h2>

                {/* Armor Selection Grid */}
                <div className='grid grid-cols-3 gap-4 mb-6'>
                  {(
                    [
                      "helmet",
                      "mask",
                      "torso",
                      "gloves",
                      "bottoms",
                      "shoes",
                    ] as const
                  ).map((gearType) => (
                    <div
                      key={gearType}
                      className='space-y-2 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30'
                    >
                      <div className='flex items-center justify-between'>
                        <label className='text-sm font-medium text-gray-300 capitalize'>
                          {gearType}
                        </label>
                        <button
                          onClick={() =>
                            setKeyArmor(keyArmor === gearType ? "" : gearType)
                          }
                          className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                            keyArmor === gearType
                              ? "bg-orange-400 border-orange-400"
                              : "border-gray-500 hover:border-orange-400"
                          }`}
                          title='Key Armor'
                        />
                      </div>

                      {/* Armor Dropdown */}
                      <select
                        value={selectedArmor[gearType] || ""}
                        onChange={(e) =>
                          setSelectedArmor((prev) => ({
                            ...prev,
                            [gearType]: e.target.value,
                          }))
                        }
                        className='w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:border-orange-400 focus:outline-none text-sm'
                      >
                        <option value=''>Select armor</option>
                        {getArmorByGearType(gearType)
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((armor) => (
                            <option
                              key={armor.id}
                              value={armor.id}
                            >
                              {armor.name}
                            </option>
                          ))}
                      </select>

                      {/* Mod Dropdown */}
                      <select
                        value={selectedMods[gearType] || ""}
                        onChange={(e) =>
                          setSelectedMods((prev) => ({
                            ...prev,
                            [gearType]: e.target.value,
                          }))
                        }
                        className='w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:border-orange-400 focus:outline-none text-sm'
                      >
                        <option value=''>Select mod</option>
                        {getModsByGearType(gearType)
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((mod) => (
                            <option
                              key={mod.id}
                              value={mod.id}
                            >
                              {mod.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Weapon Mod Selection */}
                <div className='mb-4'>
                  <label className='text-sm font-medium text-gray-300 block mb-2'>
                    Weapon Mod
                  </label>
                  <select
                    value={selectedMods.weapon || ""}
                    onChange={(e) =>
                      setSelectedMods((prev) => ({
                        ...prev,
                        weapon: e.target.value,
                      }))
                    }
                    className='w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-orange-400 focus:outline-none'
                  >
                    <option value=''>Select weapon mod</option>
                    {getModsByGearType("weapon")
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((mod) => (
                        <option
                          key={mod.id}
                          value={mod.id}
                        >
                          {mod.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Key Armor Indicator */}
                {keyArmor && (
                  <div className='mb-4 p-3 bg-orange-900/20 border border-orange-500/30 rounded'>
                    <div className='flex items-center space-x-2'>
                      <div className='w-2 h-2 bg-orange-400 rounded-full'></div>
                      <p className='text-orange-200 text-sm'>
                        Key Armor:{" "}
                        <span className='text-orange-400 capitalize font-semibold'>
                          {keyArmor}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row: Results & Calculations */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {/* Results */}
              <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-6'>
                <h2 className='text-xl font-bold mb-6 text-gray-300 tracking-wide'>
                  RESULTS
                </h2>

                <div className='space-y-4'>
                  <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                    <div className='text-sm font-medium text-gray-400 mb-3'>
                      {weapon.specialAbilities?.some((ability) =>
                        ability.toLowerCase().includes("frost")
                      )
                        ? "Frost Vortex Damage (Per Tick)"
                        : "Burn Damage (Per Tick)"}
                    </div>
                    <div className='space-y-1'>
                      {(weapon.specialAbilities?.some((ability) =>
                        ability.toLowerCase().includes("frost")
                      )
                        ? weapon.id === "kam-abyss-glance"
                          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                          : [1, 2, 3, 4, 5, 6, 7, 8]
                        : [1, 2, 3, 4, 5, 6, 7]
                      ).map((tick) => (
                        <div
                          key={tick}
                          className='flex justify-between items-center'
                        >
                          <span className='text-gray-300 text-sm'>
                            Tick {tick}:
                          </span>
                          <span className={`${theme.accent} font-mono text-sm`}>
                            {
                              burnResults[
                                `tick${tick}` as keyof typeof burnResults
                              ] as number
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cryo Blast Mod Results */}
                  {isFrostWeapon &&
                    selectedMods.weapon === "cryo-blast" &&
                    weapon?.id === "kam-abyss-glance" && (
                      <div className='bg-blue-800/30 rounded-lg p-4 border border-blue-500/50'>
                        <div className='text-sm font-medium text-blue-300 mb-3'>
                          Frost Vortex Damage (With Cryo Blast Mod)
                        </div>
                        <div className='space-y-1'>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((tick) => (
                            <div
                              key={tick}
                              className='flex justify-between items-center'
                            >
                              <span className='text-gray-300 text-sm'>
                                Tick {tick}:
                              </span>
                              <span className='text-blue-400 font-mono text-sm'>
                                {
                                  burnResults[
                                    `cryoBlastTick${tick}` as keyof typeof burnResults
                                  ] as number
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className='mt-3 text-xs text-blue-200'>
                          Cryo Blast: +4% per stack (max +20%)
                        </div>
                      </div>
                    )}

                  {!weapon.specialAbilities?.some((ability) =>
                    ability.toLowerCase().includes("frost")
                  ) && (
                    <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                      <div className='text-sm font-medium text-gray-400 mb-3'>
                        Explosion Damage
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-300 text-sm'>
                          Base Explosion:
                        </span>
                        <span className={`${theme.accent} font-mono text-sm`}>
                          {burnResults.explosion}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Calculations */}
              <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-6 lg:col-span-2'>
                <h2 className='text-xl font-bold mb-6 text-gray-300 tracking-wide'>
                  CALCULATIONS
                </h2>

                {psiIntensity ? (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* Active Mods Section */}
                    <div className='md:col-span-3 mb-4'>
                      <h4 className='text-sm font-semibold text-gray-400 mb-2'>
                        ACTIVE MODS & EFFECTS
                      </h4>
                      <div className='bg-gray-800/30 rounded-lg p-3 border border-gray-600/30'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-xs'>
                          <div>
                            <div className='text-gray-300 font-medium mb-1'>
                              Armor Mods:
                            </div>
                            <div className='space-y-1'>
                              {Object.entries(selectedMods).map(
                                ([gearType, modId]) => {
                                  if (gearType === "weapon" || !modId)
                                    return null
                                  const mod = getModsByGearType(
                                    gearType as any
                                  ).find((m) => m.id === modId)
                                  if (!mod) return null
                                  return (
                                    <div
                                      key={gearType}
                                      className='text-gray-400'
                                    >
                                      <span className='text-gray-300 capitalize'>
                                        {gearType}:
                                      </span>{" "}
                                      {mod.name}
                                    </div>
                                  )
                                }
                              )}
                            </div>
                          </div>
                          <div>
                            <div className='text-gray-300 font-medium mb-1'>
                              Weapon Mod:
                            </div>
                            <div className='text-gray-400'>
                              {selectedMods.weapon
                                ? getModsByGearType("weapon").find(
                                    (m) => m.id === selectedMods.weapon
                                  )?.name || "None"
                                : "None"}
                            </div>
                          </div>
                          <div>
                            <div className='text-yellow-100 font-medium mb-1'>
                              Important Effects:
                            </div>
                            <div className='space-y-1'>
                              {isBurnWeapon &&
                                selectedMods.mask === "blaze-amplifier" && (
                                  <div className='text-orange-300'>
                                    • Blaze Amplifier: Burn Factor 0.12 → 0.15
                                  </div>
                                )}
                              {isFrostWeapon && (
                                <div className='text-blue-300'>
                                  • Frost Weapon: Status AND Elemental DMG based
                                </div>
                              )}
                              {!selectedMods.mask && (
                                <div className='text-gray-500'>
                                  • No mod effects active
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Set Effects Section */}
                        <div className='mt-4 pt-4 border-t border-gray-600/30'>
                          <div className='text-purple-300 font-medium mb-2 text-sm'>
                            ACTIVE SET EFFECTS:
                          </div>
                          <div className='space-y-2'>
                            {getActiveSetEffects(selectedArmor).map((set) => (
                              <div
                                key={set.setName}
                                className='bg-purple-900/20 rounded p-2 border border-purple-500/30'
                              >
                                <div className='flex items-center justify-between mb-1'>
                                  <span className='text-purple-300 font-semibold text-xs'>
                                    {set.setName}
                                  </span>
                                  <span className='text-purple-200 text-xs'>
                                    ({set.pieces}/6 pieces)
                                  </span>
                                </div>
                                <div className='space-y-1'>
                                  {set.activeEffects.map((effect, index) => (
                                    <div
                                      key={index}
                                      className='text-purple-200 text-xs'
                                    >
                                      <span className='text-purple-400 font-medium'>
                                        Tier {effect.tier}:
                                      </span>{" "}
                                      {effect.description}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {getActiveSetEffects(selectedArmor).length ===
                              0 && (
                              <div className='text-gray-500 text-xs'>
                                No set effects active
                              </div>
                            )}

                            {/* Deviant Energy Indicator */}
                            {deviantEnergyBonus > 0 && (
                              <div className='bg-orange-900/20 rounded p-2 border border-orange-500/30 mt-2'>
                                <div className='flex items-center justify-between mb-1'>
                                  <span className='text-orange-300 font-semibold text-xs'>
                                    Deviant Energy Active
                                  </span>
                                  <span className='text-orange-200 text-xs'>
                                    ({deviantEnergyBonus} stacks)
                                  </span>
                                </div>
                                <div className='text-orange-200 text-xs'>
                                  <span className='text-orange-400 font-medium'>
                                    Effect:
                                  </span>{" "}
                                  +{deviantEnergyBonus}% Elemental DMG
                                  (calculated at max stacks)
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Damage Calculation Overview */}
                    <div className='md:col-span-3 mb-6'>
                      <h4 className='text-sm font-semibold text-gray-400 mb-3'>
                        DAMAGE CALCULATION OVERVIEW
                      </h4>
                      <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                        <div className='text-sm text-gray-300 leading-relaxed'>
                          {isFrostWeapon ? (
                            <>
                              <p className='mb-3'>
                                <strong className='text-blue-400'>
                                  How Frost Vortex Damage Works:
                                </strong>{" "}
                                Your Psi Intensity is multiplied by a frost
                                factor (50% base), then enhanced by Elemental
                                Damage, Status Damage, Enemy Damage Multiplier,
                                Vulnerability effects, and stacking bonuses (for
                                KAM - Abyss Glance).
                              </p>
                              <p className='mb-3'>
                                <strong className='text-blue-400'>
                                  Formula:
                                </strong>{" "}
                                Final Damage = Psi Intensity × 0.5 × (1 +
                                Elemental%) × (1 + Status%) × (1 + Enemy
                                Multiplier%) × (1 + Vulnerability%) × (1 +
                                Stacking Bonus%)
                              </p>
                              <p>
                                <strong className='text-blue-400'>
                                  Tick Calculation:
                                </strong>{" "}
                                Each tick multiplies the base damage by the
                                stack count, then rounds. Frost has no explosion
                                damage.
                              </p>
                            </>
                          ) : (
                            <>
                              <p className='mb-3'>
                                <strong className='text-orange-400'>
                                  How Burn Damage Works:
                                </strong>{" "}
                                Your Psi Intensity is multiplied by a burn
                                factor (0.12 base, 0.15 with Blaze Amplifier),
                                then enhanced by Elemental Damage, Status
                                Damage, Burn Damage Bonus, Enemy Damage
                                Multiplier, and optional Vulnerability effects.
                              </p>
                              <p className='mb-3'>
                                <strong className='text-orange-400'>
                                  Formula:
                                </strong>{" "}
                                Final Damage = Psi Intensity × Burn Factor × (1
                                + Elemental%) × (1 + Status%) × (1 + Burn
                                Bonus%) × (1 + Enemy Multiplier%) × (1 +
                                Vulnerability%)
                              </p>
                              <p>
                                <strong className='text-orange-400'>
                                  Tick vs Explosion:
                                </strong>{" "}
                                Tick damage uses the full formula above.
                                Explosion damage uses Psi Intensity directly
                                (not multiplied by burn factor) and gets a 200%
                                special ability bonus.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Three-Column Calculation Layout */}
                    <div className='md:col-span-3'>
                      <h4 className='text-sm font-semibold text-gray-400 mb-3'>
                        STEP-BY-STEP CALCULATIONS
                      </h4>
                      <div
                        className={`grid grid-cols-1 gap-4 ${
                          isBurnWeapon ? "lg:grid-cols-3" : "lg:grid-cols-2"
                        }`}
                      >
                        {/* Column 1: Base Damage Steps */}
                        {isBurnWeapon && (
                          <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                            <div className='text-sm font-medium text-gray-400 mb-3'>
                              BASE DAMAGE CALCULATION
                            </div>
                            <div className='space-y-2 text-xs text-gray-400 font-mono leading-relaxed'>
                              <div>
                                <span className='text-gray-300'>Step 1:</span>{" "}
                                Psi Intensity = {parseFloat(psiIntensity) || 0}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 2:</span>{" "}
                                Burn Factor ={" "}
                                {selectedMods.mask === "blaze-amplifier"
                                  ? "0.15"
                                  : "0.12"}
                                {selectedMods.mask === "blaze-amplifier" &&
                                  " (Blaze Amplifier)"}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 3:</span>{" "}
                                Base Damage = {parseFloat(psiIntensity) || 0} ×{" "}
                                {selectedMods.mask === "blaze-amplifier"
                                  ? "0.15"
                                  : "0.12"}{" "}
                                ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12)
                                ).toFixed(2)}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 4:</span>{" "}
                                Elemental Damage ={" "}
                                {parseFloat(elementalDamage) || 0}%
                                {deviantEnergyBonus > 0 &&
                                  ` + ${deviantEnergyBonus}% (Deviant Energy)`}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 5:</span>{" "}
                                After Elemental ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12)
                                ).toFixed(2)}{" "}
                                × (1 +{" "}
                                {(parseFloat(elementalDamage) || 0) +
                                  deviantEnergyBonus}
                                /100) ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100)
                                ).toFixed(2)}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 6:</span>{" "}
                                Status Damage = {parseFloat(statusDamage) || 0}%
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 7:</span>{" "}
                                After Status ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100)
                                ).toFixed(2)}{" "}
                                × (1 + {parseFloat(statusDamage) || 0}/100) ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100)
                                ).toFixed(2)}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 8:</span>{" "}
                                Burn Damage Bonus ={" "}
                                {parseFloat(burnDamageBonus) || 0}%
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 9:</span>{" "}
                                After Burn Bonus ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100)
                                ).toFixed(2)}{" "}
                                × (1 + {parseFloat(burnDamageBonus) || 0}/100) ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100) *
                                  (1 + (parseFloat(burnDamageBonus) || 0) / 100)
                                ).toFixed(2)}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 10:</span>{" "}
                                Enemy Multiplier ={" "}
                                {parseFloat(enemyDamageMultiplier) || 0}%
                                {keyArmor === "shoes" &&
                                  selectedArmor.shoes === "earthly-boots" && (
                                    <span className='text-green-400'>
                                      {" "}
                                      + 30% (Earthly Boots)
                                    </span>
                                  )}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 11:</span>{" "}
                                After Enemy ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100) *
                                  (1 + (parseFloat(burnDamageBonus) || 0) / 100)
                                ).toFixed(2)}{" "}
                                × (1 +{" "}
                                {(parseFloat(enemyDamageMultiplier) || 0) +
                                  (keyArmor === "shoes" &&
                                  selectedArmor.shoes === "earthly-boots"
                                    ? 30
                                    : 0)}
                                /100) ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100) *
                                  (1 +
                                    (parseFloat(burnDamageBonus) || 0) / 100) *
                                  (1 +
                                    ((parseFloat(enemyDamageMultiplier) || 0) +
                                      (keyArmor === "shoes" &&
                                      selectedArmor.shoes === "earthly-boots"
                                        ? 30
                                        : 0)) /
                                      100)
                                ).toFixed(2)}
                              </div>
                              {(parseFloat(vulnerability) || 0) > 0 && (
                                <>
                                  <div>
                                    <span className='text-blue-400'>
                                      Step 12:
                                    </span>{" "}
                                    Vulnerability ={" "}
                                    {parseFloat(vulnerability) || 0}%
                                    {usingVulnAmp && " + 8% (Vuln Amp)"}
                                  </div>
                                  <div>
                                    <span className='text-blue-400'>
                                      Step 13:
                                    </span>{" "}
                                    Final Base ={" "}
                                    {(
                                      (parseFloat(psiIntensity) || 0) *
                                      (selectedMods.mask === "blaze-amplifier"
                                        ? 0.15
                                        : 0.12) *
                                      (1 +
                                        ((parseFloat(elementalDamage) || 0) +
                                          deviantEnergyBonus) /
                                          100) *
                                      (1 +
                                        (parseFloat(statusDamage) || 0) / 100) *
                                      (1 +
                                        (parseFloat(burnDamageBonus) || 0) /
                                          100) *
                                      (1 +
                                        ((parseFloat(enemyDamageMultiplier) ||
                                          0) +
                                          (keyArmor === "shoes" &&
                                          selectedArmor.shoes ===
                                            "earthly-boots"
                                            ? 30
                                            : 0)) /
                                          100)
                                    ).toFixed(2)}{" "}
                                    × (1 +{" "}
                                    {(parseFloat(vulnerability) || 0) +
                                      (usingVulnAmp ? 8 : 0)}
                                    /100) ={" "}
                                    {(
                                      (parseFloat(psiIntensity) || 0) *
                                      (selectedMods.mask === "blaze-amplifier"
                                        ? 0.15
                                        : 0.12) *
                                      (1 +
                                        ((parseFloat(elementalDamage) || 0) +
                                          deviantEnergyBonus) /
                                          100) *
                                      (1 +
                                        (parseFloat(statusDamage) || 0) / 100) *
                                      (1 +
                                        (parseFloat(burnDamageBonus) || 0) /
                                          100) *
                                      (1 +
                                        ((parseFloat(enemyDamageMultiplier) ||
                                          0) +
                                          (keyArmor === "shoes" &&
                                          selectedArmor.shoes ===
                                            "earthly-boots"
                                            ? 30
                                            : 0)) /
                                          100) *
                                      (1 +
                                        ((parseFloat(vulnerability) || 0) +
                                          (usingVulnAmp ? 8 : 0)) /
                                          100)
                                    ).toFixed(2)}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Column 2: Tick Damage */}
                        <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                          <div className='text-sm font-medium text-gray-400 mb-3'>
                            TICK DAMAGE CALCULATION
                          </div>
                          <div className='space-y-2 text-xs text-gray-400 font-mono leading-relaxed'>
                            <div>
                              <span className='text-gray-300'>
                                Base per tick:
                              </span>{" "}
                              {isFrostWeapon
                                ? // Frost calculation
                                  (() => {
                                    const base =
                                      (parseFloat(psiIntensity) || 0) *
                                      0.5 *
                                      (1 +
                                        ((parseFloat(elementalDamage) || 0) +
                                          deviantEnergyBonus) /
                                          100) *
                                      (1 +
                                        (parseFloat(statusDamage) || 0) / 100) *
                                      (1 +
                                        (parseFloat(frostDamageBonus) || 0) /
                                          100) *
                                      (1 +
                                        ((parseFloat(enemyDamageMultiplier) ||
                                          0) +
                                          (keyArmor === "shoes" &&
                                          selectedArmor.shoes ===
                                            "earthly-boots"
                                            ? 30
                                            : 0)) /
                                          100) *
                                      (1 +
                                        ((parseFloat(vulnerability) || 0) +
                                          (usingVulnAmp ? 8 : 0)) /
                                          100)

                                    // Apply Frostwave Wither if equipped (starts at +30%, decreases over time)
                                    const withFrostwave =
                                      selectedMods.mask === "frostwave-wither"
                                        ? base * 1.3
                                        : base

                                    return withFrostwave.toFixed(2)
                                  })()
                                : // Burn calculation
                                  (
                                    (parseFloat(psiIntensity) || 0) *
                                    (selectedMods.mask === "blaze-amplifier"
                                      ? 0.15
                                      : 0.12) *
                                    (1 +
                                      ((parseFloat(elementalDamage) || 0) +
                                        deviantEnergyBonus) /
                                        100) *
                                    (1 +
                                      (parseFloat(statusDamage) || 0) / 100) *
                                    (1 +
                                      (parseFloat(burnDamageBonus) || 0) /
                                        100) *
                                    (1 +
                                      ((parseFloat(enemyDamageMultiplier) ||
                                        0) +
                                        (keyArmor === "shoes" &&
                                        selectedArmor.shoes === "earthly-boots"
                                          ? 30
                                          : 0)) /
                                        100) *
                                    (1 +
                                      ((parseFloat(vulnerability) || 0) +
                                        (usingVulnAmp ? 8 : 0)) /
                                        100)
                                  ).toFixed(2)}
                            </div>
                            <div className='text-gray-300 font-semibold mt-3 mb-2'>
                              Tick Calculation Method:
                            </div>
                            <div className='text-gray-500 mb-3'>
                              {isFrostWeapon &&
                              weapon?.id === "kam-abyss-glance" ? (
                                <>
                                  KAM - Abyss Glance: Each tick gains +5%
                                  stacking bonus (max +50% at tick 10):
                                  <br />• Tick 1: base × 1.00 (0% bonus)
                                  <br />• Tick 2: base × 1.05 (5% bonus)
                                  <br />• Tick 3: base × 1.10 (10% bonus)
                                  <br />• ...
                                  <br />• Tick 11+: base × 1.50 (50% bonus -
                                  max)
                                </>
                              ) : (
                                <>
                                  Each tick multiplies base damage by stack
                                  count, then rounds:
                                  <br />• Tick 1: base × 1 → rounded
                                  <br />• Tick 2: base × 2 → rounded
                                  <br />• Tick 3: base × 3 → rounded
                                  <br />• etc.
                                </>
                              )}
                            </div>

                            {/* Cryo Blast Explanation */}
                            {isFrostWeapon &&
                              weapon?.id === "kam-abyss-glance" &&
                              selectedMods.weapon === "cryo-blast" && (
                                <div className='bg-blue-900/20 rounded-lg p-3 border border-blue-500/30 mt-3 mb-3'>
                                  <div className='text-blue-300 font-semibold mb-2 text-xs'>
                                    Cryo Blast Mod Effect:
                                  </div>
                                  <div className='text-gray-400 text-xs'>
                                    Each tick gains +4% Cryo Blast bonus (max
                                    +20% at tick 5):
                                    <br />• Tick 1: weapon bonus (1.00) × cryo
                                    bonus (1.00) = 1.00
                                    <br />• Tick 2: weapon bonus (1.05) × cryo
                                    bonus (1.04) = 1.092
                                    <br />• Tick 3: weapon bonus (1.10) × cryo
                                    bonus (1.08) = 1.188
                                    <br />• Tick 4: weapon bonus (1.15) × cryo
                                    bonus (1.12) = 1.288
                                    <br />• Tick 5: weapon bonus (1.20) × cryo
                                    bonus (1.16) = 1.392
                                    <br />• Tick 6+: weapon bonus (1.25+) × cryo
                                    bonus (1.20) = max
                                  </div>
                                </div>
                              )}

                            <div className='text-gray-300 font-semibold mb-2'>
                              Tick Results:
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 1:</span>{" "}
                              {burnResults.tick1} (1 stack)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 2:</span>{" "}
                              {burnResults.tick2} (2 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 3:</span>{" "}
                              {burnResults.tick3} (3 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 4:</span>{" "}
                              {burnResults.tick4} (4 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 5:</span>{" "}
                              {burnResults.tick5} (5 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 6:</span>{" "}
                              {burnResults.tick6} (6 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 7:</span>{" "}
                              {burnResults.tick7} (7 stacks)
                            </div>
                            {isFrostWeapon &&
                              weapon?.id === "kam-abyss-glance" && (
                                <>
                                  <div>
                                    <span className='text-gray-300'>
                                      Tick 8:
                                    </span>{" "}
                                    {burnResults.tick8} (8 stacks)
                                  </div>
                                  <div>
                                    <span className='text-gray-300'>
                                      Tick 9:
                                    </span>{" "}
                                    {burnResults.tick9} (9 stacks)
                                  </div>
                                  <div>
                                    <span className='text-gray-300'>
                                      Tick 10:
                                    </span>{" "}
                                    {burnResults.tick10} (10 stacks)
                                  </div>
                                  <div>
                                    <span className='text-gray-300'>
                                      Tick 11:
                                    </span>{" "}
                                    {burnResults.tick11} (max stacking - damage
                                    stays at this)
                                  </div>
                                </>
                              )}
                          </div>
                        </div>

                        {/* Column 3: Explosion Damage (Burn only) */}
                        {isBurnWeapon && (
                          <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                            <div className='text-sm font-medium text-gray-400 mb-3'>
                              EXPLOSION DAMAGE CALCULATION
                            </div>
                            <div className='space-y-2 text-xs text-gray-400 font-mono leading-relaxed'>
                              <div>
                                <span className='text-gray-300'>Step 1:</span>{" "}
                                Psi Intensity = {parseFloat(psiIntensity) || 0}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 2:</span>{" "}
                                Elemental Damage ={" "}
                                {parseFloat(elementalDamage) || 0}%
                                {deviantEnergyBonus > 0 &&
                                  ` + ${deviantEnergyBonus}% (Deviant Energy)`}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 3:</span>{" "}
                                After Elemental ={" "}
                                {parseFloat(psiIntensity) || 0} × (1 +{" "}
                                {(parseFloat(elementalDamage) || 0) +
                                  deviantEnergyBonus}
                                /100) ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100)
                                ).toFixed(3)}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 4:</span>{" "}
                                Status Damage = {parseFloat(statusDamage) || 0}%
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 5:</span>{" "}
                                After Status ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100)
                                ).toFixed(3)}{" "}
                                × (1 + {parseFloat(statusDamage) || 0}/100) ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100)
                                ).toFixed(3)}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 6:</span>{" "}
                                Special Ability Bonus = 200% (KVD Boom Boom)
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 7:</span>{" "}
                                After Special ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100)
                                ).toFixed(3)}{" "}
                                × 3 ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100) *
                                  3
                                ).toFixed(3)}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 8:</span>{" "}
                                Enemy Multiplier ={" "}
                                {parseFloat(enemyDamageMultiplier) || 0}%
                                {keyArmor === "shoes" &&
                                  selectedArmor.shoes === "earthly-boots" && (
                                    <span className='text-green-400'>
                                      {" "}
                                      + 30% (Earthly Boots)
                                    </span>
                                  )}
                              </div>
                              <div>
                                <span className='text-gray-300'>Step 9:</span>{" "}
                                After Enemy ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100) *
                                  3
                                ).toFixed(3)}{" "}
                                × (1 +{" "}
                                {(parseFloat(enemyDamageMultiplier) || 0) +
                                  (keyArmor === "shoes" &&
                                  selectedArmor.shoes === "earthly-boots"
                                    ? 30
                                    : 0)}
                                /100) ={" "}
                                {(
                                  (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    ((parseFloat(elementalDamage) || 0) +
                                      deviantEnergyBonus) /
                                      100) *
                                  (1 + (parseFloat(statusDamage) || 0) / 100) *
                                  3 *
                                  (1 +
                                    ((parseFloat(enemyDamageMultiplier) || 0) +
                                      (keyArmor === "shoes" &&
                                      selectedArmor.shoes === "earthly-boots"
                                        ? 30
                                        : 0)) /
                                      100)
                                ).toFixed(3)}
                              </div>
                              {(parseFloat(vulnerability) || 0) > 0 && (
                                <>
                                  <div>
                                    <span className='text-blue-400'>
                                      Step 10:
                                    </span>{" "}
                                    Vulnerability ={" "}
                                    {parseFloat(vulnerability) || 0}%
                                    {usingVulnAmp && " + 8% (Vuln Amp)"}
                                  </div>
                                  <div>
                                    <span className='text-blue-400'>
                                      Step 11:
                                    </span>{" "}
                                    Final Explosion ={" "}
                                    {(
                                      (parseFloat(psiIntensity) || 0) *
                                      (1 +
                                        ((parseFloat(elementalDamage) || 0) +
                                          deviantEnergyBonus) /
                                          100) *
                                      (1 +
                                        (parseFloat(statusDamage) || 0) / 100) *
                                      3 *
                                      (1 +
                                        ((parseFloat(enemyDamageMultiplier) ||
                                          0) +
                                          (keyArmor === "shoes" &&
                                          selectedArmor.shoes ===
                                            "earthly-boots"
                                            ? 30
                                            : 0)) /
                                          100)
                                    ).toFixed(3)}{" "}
                                    × (1 +{" "}
                                    {(parseFloat(vulnerability) || 0) +
                                      (usingVulnAmp ? 8 : 0)}
                                    /100) ={" "}
                                    {(
                                      (parseFloat(psiIntensity) || 0) *
                                      (1 +
                                        ((parseFloat(elementalDamage) || 0) +
                                          deviantEnergyBonus) /
                                          100) *
                                      (1 +
                                        (parseFloat(statusDamage) || 0) / 100) *
                                      3 *
                                      (1 +
                                        ((parseFloat(enemyDamageMultiplier) ||
                                          0) +
                                          (keyArmor === "shoes" &&
                                          selectedArmor.shoes ===
                                            "earthly-boots"
                                            ? 30
                                            : 0)) /
                                          100) *
                                      (1 +
                                        ((parseFloat(vulnerability) || 0) +
                                          (usingVulnAmp ? 8 : 0)) /
                                          100)
                                    ).toFixed(3)}
                                  </div>
                                </>
                              )}
                              <div className='text-orange-400 font-semibold mt-3'>
                                → Final Explosion: {burnResults.explosion}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <Calculator className='h-8 w-8 text-gray-600 mx-auto mb-2' />
                    <p className='text-gray-400 text-sm'>
                      Enter weapon stats to see calculations
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
