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

  const burnResults = useMemo(() => {
    const psi = parseFloat(psiIntensity) || 0
    const elemental = parseFloat(elementalDamage) || 0
    const status = parseFloat(statusDamage) || 0
    const enemyMultiplier = parseFloat(enemyDamageMultiplier) || 0
    const vuln = (parseFloat(vulnerability) || 0) + (usingVulnAmp ? 8 : 0)
    const markedTargetBonus =
      keyArmor === "shoes" && selectedArmor.shoes === "earthly-boots" ? 30 : 0
    const burnBonus = parseFloat(burnDamageBonus) || 0

    // Set bonuses are already included in game stats, so only add Deviant Energy
    const totalElemental = elemental + deviantEnergyBonus
    const totalStatus = status

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
    const exp6 = step(exp5 * (1 + (enemyMultiplier + markedTargetBonus) / 100))
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
  }, [
    psiIntensity,
    elementalDamage,
    statusDamage,
    enemyDamageMultiplier,
    burnDamageBonus,
    selectedMods,
    selectedArmor,
    vulnerability, // ✅ missing in original
    usingVulnAmp, // ✅ missing in original
    keyArmor, // ✅ missing in original
    deviantEnergyBonus,
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
      className={`min-h-screen ${theme.background} relative overflow-hidden`}
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
      <div className='relative z-50 max-w-7xl mx-auto px-6 py-12'>
        {/* Header */}
        <div className='mb-12'>
          <Link
            href='/weapons'
            className={`inline-flex items-center space-x-2 ${theme.accent} hover:text-white transition-colors mb-6`}
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Weapons</span>
          </Link>

          <div className='grid grid-cols-12 gap-8 items-start'>
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
              <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight'>
                {weapon.name}
              </h1>
              <p className='text-xl text-gray-300 leading-relaxed'>
                {weapon.description}
              </p>
            </div>

            {/* Special Abilities */}
            <div className='col-span-12 md:col-span-5'>
              <h2 className='text-2xl font-bold text-white mb-6'>
                Special Abilities
              </h2>
              <div className='space-y-4'>
                {weapon.specialAbilities?.map((ability, index) => (
                  <div
                    key={index}
                    className={`${theme.cardBg} ${theme.border} border rounded-3xl p-6 hover:scale-105 transition-all duration-300`}
                  >
                    <p className='text-gray-200 leading-relaxed'>{ability}</p>
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
      </div>

      {/* Weapon-Specific Calculator */}
      <div className='w-full bg-gray-900/20 py-12 relative z-50'>
        <div className='max-w-full mx-auto px-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h3
              className={`text-4xl md:text-6xl font-bold mb-6  ${theme.highlight}`}
            >
              Boom Boom Damage Calculator
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
                      Burn Damage (Per Tick)
                    </div>
                    <div className='space-y-1'>
                      {[1, 2, 3, 4, 5, 6, 7].map((tick) => (
                        <div
                          key={tick}
                          className='flex justify-between items-center'
                        >
                          <span className='text-gray-300 text-sm'>
                            Tick {tick}:
                          </span>
                          <span className='text-orange-400 font-mono text-sm'>
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

                  <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                    <div className='text-sm font-medium text-gray-400 mb-3'>
                      Explosion Damage
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300 text-sm'>
                        Base Explosion:
                      </span>
                      <span className='text-orange-400 font-mono text-sm'>
                        {burnResults.explosion}
                      </span>
                    </div>
                  </div>
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
                              {selectedMods.mask === "blaze-amplifier" && (
                                <div className='text-orange-300'>
                                  • Blaze Amplifier: Burn Factor 0.12 → 0.15
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
                          <p className='mb-3'>
                            <strong className='text-orange-400'>
                              How Burn Damage Works:
                            </strong>{" "}
                            Your Psi Intensity is multiplied by a burn factor
                            (0.12 base, 0.15 with Blaze Amplifier), then
                            enhanced by Elemental Damage, Status Damage, Burn
                            Damage Bonus, Enemy Damage Multiplier, and optional
                            Vulnerability effects.
                          </p>
                          <p className='mb-3'>
                            <strong className='text-orange-400'>
                              Formula:
                            </strong>{" "}
                            Final Damage = Psi Intensity × Burn Factor × (1 +
                            Elemental%) × (1 + Status%) × (1 + Burn Bonus%) × (1
                            + Enemy Multiplier%) × (1 + Vulnerability%)
                          </p>
                          <p>
                            <strong className='text-orange-400'>
                              Tick vs Explosion:
                            </strong>{" "}
                            Tick damage uses the full formula above. Explosion
                            damage uses Psi Intensity directly (not multiplied
                            by burn factor) and gets a 200% special ability
                            bonus.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Three-Column Calculation Layout */}
                    <div className='md:col-span-3'>
                      <h4 className='text-sm font-semibold text-gray-400 mb-3'>
                        STEP-BY-STEP CALCULATIONS
                      </h4>
                      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        {/* Column 1: Base Damage Steps */}
                        <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                          <div className='text-sm font-medium text-gray-400 mb-3'>
                            BASE DAMAGE CALCULATION
                          </div>
                          <div className='space-y-2 text-xs text-gray-400 font-mono leading-relaxed'>
                            <div>
                              <span className='text-gray-300'>Step 1:</span> Psi
                              Intensity = {parseFloat(psiIntensity) || 0}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
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
                                        selectedArmor.shoes === "earthly-boots"
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
                              </>
                            )}
                          </div>
                        </div>

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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
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
                              Each tick multiplies base damage by stack count,
                              then rounds:
                              <br />• Tick 1: base × 1 → rounded
                              <br />• Tick 2: base × 2 → rounded
                              <br />• Tick 3: base × 3 → rounded
                              <br />• etc.
                            </div>
                            <div className='text-gray-300 font-semibold mb-2'>
                              Tick Results:
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 1:</span>{" "}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
                                    (keyArmor === "shoes" &&
                                    selectedArmor.shoes === "earthly-boots"
                                      ? 30
                                      : 0)) /
                                    100) *
                                (1 +
                                  ((parseFloat(vulnerability) || 0) +
                                    (usingVulnAmp ? 8 : 0)) /
                                    100) *
                                1
                              ).toFixed(0)}{" "}
                              (1 stack)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 2:</span>{" "}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
                                    (keyArmor === "shoes" &&
                                    selectedArmor.shoes === "earthly-boots"
                                      ? 30
                                      : 0)) /
                                    100) *
                                (1 +
                                  ((parseFloat(vulnerability) || 0) +
                                    (usingVulnAmp ? 8 : 0)) /
                                    100) *
                                2
                              ).toFixed(0)}{" "}
                              (2 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 3:</span>{" "}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
                                    (keyArmor === "shoes" &&
                                    selectedArmor.shoes === "earthly-boots"
                                      ? 30
                                      : 0)) /
                                    100) *
                                (1 +
                                  ((parseFloat(vulnerability) || 0) +
                                    (usingVulnAmp ? 8 : 0)) /
                                    100) *
                                3
                              ).toFixed(0)}{" "}
                              (3 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 4:</span>{" "}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
                                    (keyArmor === "shoes" &&
                                    selectedArmor.shoes === "earthly-boots"
                                      ? 30
                                      : 0)) /
                                    100) *
                                (1 +
                                  ((parseFloat(vulnerability) || 0) +
                                    (usingVulnAmp ? 8 : 0)) /
                                    100) *
                                4
                              ).toFixed(0)}{" "}
                              (4 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 5:</span>{" "}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
                                    (keyArmor === "shoes" &&
                                    selectedArmor.shoes === "earthly-boots"
                                      ? 30
                                      : 0)) /
                                    100) *
                                (1 +
                                  ((parseFloat(vulnerability) || 0) +
                                    (usingVulnAmp ? 8 : 0)) /
                                    100) *
                                5
                              ).toFixed(0)}{" "}
                              (5 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 6:</span>{" "}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
                                    (keyArmor === "shoes" &&
                                    selectedArmor.shoes === "earthly-boots"
                                      ? 30
                                      : 0)) /
                                    100) *
                                (1 +
                                  ((parseFloat(vulnerability) || 0) +
                                    (usingVulnAmp ? 8 : 0)) /
                                    100) *
                                6
                              ).toFixed(0)}{" "}
                              (6 stacks)
                            </div>
                            <div>
                              <span className='text-gray-300'>Tick 7:</span>{" "}
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
                                (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                                (1 +
                                  ((parseFloat(enemyDamageMultiplier) || 0) +
                                    (keyArmor === "shoes" &&
                                    selectedArmor.shoes === "earthly-boots"
                                      ? 30
                                      : 0)) /
                                    100) *
                                (1 +
                                  ((parseFloat(vulnerability) || 0) +
                                    (usingVulnAmp ? 8 : 0)) /
                                    100) *
                                7
                              ).toFixed(0)}{" "}
                              (7 stacks)
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Explosion Damage */}
                        <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                          <div className='text-sm font-medium text-gray-400 mb-3'>
                            EXPLOSION DAMAGE CALCULATION
                          </div>
                          <div className='space-y-2 text-xs text-gray-400 font-mono leading-relaxed'>
                            <div>
                              <span className='text-gray-300'>Step 1:</span> Psi
                              Intensity = {parseFloat(psiIntensity) || 0}
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
                              After Elemental = {parseFloat(psiIntensity) || 0}{" "}
                              × (1 +{" "}
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
                                        selectedArmor.shoes === "earthly-boots"
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
                                        selectedArmor.shoes === "earthly-boots"
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
