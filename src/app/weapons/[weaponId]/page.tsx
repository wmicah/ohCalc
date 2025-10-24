"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calculator, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getWeaponById, Weapon } from "../../../lib/weapons-data"
import { armorData, getArmorByGearType } from "../../../lib/armor-data"
import { modsData, getModsByGearType } from "../../../lib/mods-data"

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
  const [burnDamageBonus, setBurnDamageBonus] = useState("")

  // Armor selection state
  const [selectedArmor, setSelectedArmor] = useState({
    helmet: "",
    mask: "",
    torso: "",
    gloves: "",
    bottoms: "",
    shoes: "",
  })

  // Mod selection state
  const [selectedMods, setSelectedMods] = useState({
    helmet: "",
    mask: "",
    torso: "",
    gloves: "",
    bottoms: "",
    shoes: "",
    weapon: "",
  })

  // Key armor selection
  const [keyArmor, setKeyArmor] = useState("")

  // Calculate burn damage
  const burnResults = useMemo(() => {
    const psi = parseFloat(psiIntensity) || 0
    const elemental = parseFloat(elementalDamage) || 0
    const status = parseFloat(statusDamage) || 0
    const enemyMultiplier = parseFloat(enemyDamageMultiplier) || 0
    const burnBonus = parseFloat(burnDamageBonus) || 0

    // Base burn damage formula: psi × 0.12 × (1 + elemental/100) × (1 + status/100) × (1 + burnBonus/100) × (1 + enemyMultiplier/100)
    const baseBurnDamage =
      psi *
      0.12 *
      (1 + elemental / 100) *
      (1 + status / 100) *
      (1 + burnBonus / 100) *
      (1 + enemyMultiplier / 100)

    // Each tick gets cumulative damage (stack 1 = base, stack 2 = 2×base, etc.)
    const tick1 = Math.round(baseBurnDamage)
    const tick2 = Math.round(baseBurnDamage * 2)
    const tick3 = Math.round(baseBurnDamage * 3)
    const tick4 = Math.round(baseBurnDamage * 4)
    const tick5 = Math.round(baseBurnDamage * 5)
    const tick6 = Math.round(baseBurnDamage * 6)
    const tick7 = Math.round(baseBurnDamage * 7)

    // Explosion damage: psi × (1 + elemental/100) × (1 + status/100) × (1 + initial/100) × (1 + final/100) × (1 + enemyMultiplier/100)
    const explosionDamage =
      psi *
      (1 + elemental / 100) *
      (1 + status / 100) *
      (1 + 200 / 100) * // Initial bonus (200%)
      (1 + 0 / 100) * // Final bonus (0% for now)
      (1 + enemyMultiplier / 100)

    return {
      tick1,
      tick2,
      tick3,
      tick4,
      tick5,
      tick6,
      tick7,
      explosion: Math.round(explosionDamage),
    }
  }, [
    psiIntensity,
    elementalDamage,
    statusDamage,
    enemyDamageMultiplier,
    burnDamageBonus,
  ])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const foundWeapon = getWeaponById(weaponId)
    setWeapon(foundWeapon || null)
  }, [weaponId])

  if (!weapon) {
    return (
      <div className='min-h-screen bg-black text-white pt-16 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>Weapon Not Found</h1>
          <p className='text-gray-400 mb-8'>
            The weapon you're looking for doesn't exist.
          </p>
          <Link href='/weapons'>
            <Button>Back to Weapons</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Determine theme based on weapon type
  const getThemeColors = (weapon: Weapon) => {
    if (
      weapon.specialAbilities?.some((ability) =>
        ability.toLowerCase().includes("burn")
      )
    ) {
      return {
        background: "bg-gradient-to-br from-black via-orange-950 to-black",
        accent: "text-orange-400",
        secondaryAccent: "text-orange-300",
        highlight: "text-orange-200",
        border: "border-orange-500/30",
        cardBg: "bg-black/60",
        buttonBg:
          "bg-gradient-to-r from-orange-800 to-black hover:from-orange-700 hover:to-gray-900 border-orange-500/50",
      }
    }
    // Default theme for other weapons
    return {
      background: "bg-black",
      accent: "text-blue-400",
      secondaryAccent: "text-gray-400",
      highlight: "text-white",
      border: "border-gray-700",
      cardBg: "bg-gray-900/30",
      buttonBg:
        "bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border-gray-600/50",
    }
  }

  const theme = getThemeColors(weapon)

  return (
    <div
      className={`min-h-screen ${theme.background} text-white pt-16 relative overflow-hidden`}
    >
      {/* Background Effects */}
      <div className='absolute inset-0'>
        {/* Subtle Grid */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Floating Elements */}
        <div
          className='absolute top-20 left-20 w-32 h-32 border border-white/10 transform transition-all duration-1000 ease-out'
          style={{
            transform: `rotate(${45 + mousePosition.x * 0.005}deg) translate(${
              mousePosition.x * 0.01
            }px, ${mousePosition.y * 0.01}px)`,
          }}
        ></div>
        <div
          className='absolute top-40 right-32 w-24 h-24 border border-white/8 transform transition-all duration-800 ease-out'
          style={{
            transform: `rotate(${-30 + mousePosition.y * 0.008}deg) translate(${
              -mousePosition.x * 0.005
            }px, ${mousePosition.y * 0.015}px)`,
          }}
        ></div>

        {/* Additional Futuristic Elements */}
        <div
          className='absolute top-1/4 right-20 w-16 h-16 border border-white/6 transform transition-all duration-1200 ease-out'
          style={{
            transform: `rotate(${60 + mousePosition.x * 0.003}deg) translate(${
              mousePosition.x * 0.008
            }px, ${mousePosition.y * 0.012}px)`,
          }}
        ></div>
        <div
          className='absolute bottom-1/4 left-40 w-20 h-20 border border-white/7 transform transition-all duration-900 ease-out'
          style={{
            transform: `rotate(${-45 + mousePosition.y * 0.006}deg) translate(${
              -mousePosition.x * 0.007
            }px, ${mousePosition.y * 0.009}px)`,
          }}
        ></div>

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
        ></div>
        <div
          className='absolute bottom-1/3 right-10 w-8 h-8 border border-white/4 transform transition-all duration-800 ease-out'
          style={{
            transform: `rotate(${-60 + mousePosition.y * 0.005}deg) translate(${
              -mousePosition.x * 0.004
            }px, ${mousePosition.y * 0.006}px)`,
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
          }}
        ></div>

        {/* Flowing Lines */}
        <div
          className='absolute top-1/3 left-0 w-96 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transform transition-all duration-600 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.02}px) rotate(${
              mousePosition.y * 0.005
            }deg)`,
          }}
        ></div>
        <div
          className='absolute top-2/3 right-0 w-80 h-px bg-gradient-to-l from-transparent via-white/4 to-transparent transform transition-all duration-700 ease-out'
          style={{
            transform: `translateX(${-mousePosition.x * 0.015}px) rotate(${
              -mousePosition.y * 0.004
            }deg)`,
          }}
        ></div>

        {/* Additional Flowing Lines */}
        <div
          className='absolute top-1/6 left-1/3 w-64 h-px bg-gradient-to-r from-transparent via-white/3 to-transparent transform transition-all duration-900 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.018}px) rotate(${
              mousePosition.y * 0.003
            }deg)`,
          }}
        ></div>
        <div
          className='absolute bottom-1/4 left-1/4 w-72 h-px bg-gradient-to-r from-transparent via-white/2 to-transparent transform transition-all duration-750 ease-out'
          style={{
            transform: `translateX(${-mousePosition.x * 0.012}px) rotate(${
              -mousePosition.y * 0.002
            }deg)`,
          }}
        ></div>

        {/* Vertical Lines */}
        <div
          className='absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent transform transition-all duration-800 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.006}px)`,
          }}
        ></div>
        <div
          className='absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/2 to-transparent transform transition-all duration-900 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * -0.004}px)`,
          }}
        ></div>
      </div>

      {/* Main Container */}
      <div className='max-w-6xl mx-auto px-6 py-12 relative z-50'>
        {/* Back Button */}
        <div className='mb-8'>
          <Link href='/weapons'>
            <Button
              className={`${theme.buttonBg} border ${theme.border} text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2`}
            >
              <ArrowLeft className='w-4 h-4' />
              Back to Weapons
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className='mb-16'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
            {/* Weapon Info - 7 columns */}
            <div className='lg:col-span-7'>
              <div className='space-y-8'>
                {/* Weapon Header */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-4'>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        weapon.rarity === "common"
                          ? "bg-gray-700/50 text-gray-300 border border-gray-600"
                          : weapon.rarity === "uncommon"
                          ? "bg-green-900/30 text-green-400 border border-green-600/50"
                          : weapon.rarity === "rare"
                          ? "bg-blue-900/30 text-blue-400 border border-blue-600/50"
                          : weapon.rarity === "epic"
                          ? "bg-purple-900/30 text-purple-400 border border-purple-600/50"
                          : "bg-yellow-900/30 text-yellow-400 border border-yellow-600/50"
                      }`}
                    >
                      {weapon.rarity}
                    </span>
                  </div>
                  <h1 className='text-6xl font-black text-white  tracking-tight leading-none'>
                    {weapon.name}
                  </h1>
                </div>

                {/* Description */}
                <div className='space-y-4'>
                  <p className='text-xl text-gray-300 leading-relaxed font-light'>
                    {weapon.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className='pt-4'>
                  <Link href='/calculator'>
                    <Button
                      className={`${theme.buttonBg} border ${theme.border} text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20 px-8 py-4 text-lg`}
                    >
                      <Calculator className='w-5 h-5 mr-3' />
                      Open Damage Calculator
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Special Abilities - 5 columns */}
            {weapon.specialAbilities && (
              <div className='lg:col-span-5'>
                <div
                  className={`${theme.cardBg} border ${theme.border} rounded-3xl p-8 backdrop-blur-sm`}
                >
                  <div className='space-y-6'>
                    <div className='border-b border-gray-700/50 pb-4'>
                      <h3
                        className={`text-2xl font-bold ${theme.highlight}  tracking-wide`}
                      >
                        Special Abilities
                      </h3>
                    </div>
                    <div className='space-y-4'>
                      {weapon.specialAbilities.map((ability, index) => (
                        <div
                          key={index}
                          className='group relative overflow-hidden rounded-xl bg-gray-800/40 border border-gray-700/30 p-5 transition-all duration-300 hover:bg-gray-800/60 hover:border-gray-600/50'
                        >
                          <div className='flex items-start gap-4'>
                            <div className='flex-shrink-0 mt-1'>
                              <div
                                className={`w-2 h-2 ${theme.accent.replace(
                                  "text-",
                                  "bg-"
                                )} rounded-full transition-all duration-300 group-hover:scale-125`}
                              ></div>
                            </div>
                            <p className='text-gray-300 leading-relaxed text-sm font-medium'>
                              {ability}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Burn Effect Details */}
        {weapon.specialAbilities?.some((ability) =>
          ability.toLowerCase().includes("burn")
        ) && (
          <div
            className={`${theme.cardBg} border ${theme.border} rounded-2xl p-8 mb-8`}
          >
            <div className='space-y-6'>
              <h3
                className={`text-2xl font-bold ${theme.highlight}  tracking-wide`}
              >
                Burn Effect Details
              </h3>

              <div className='bg-gray-800/50 rounded-xl p-6 border border-orange-500/30'>
                <div className='space-y-6'>
                  <h4 className={`text-lg font-semibold ${theme.accent} `}>
                    [Burn] Status Effect
                  </h4>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-3'>
                      <div>
                        <span className={`${theme.accent} font-medium text-sm`}>
                          Damage:
                        </span>
                        <p className='text-gray-300 text-sm mt-1'>
                          12% Psi Intensity as Status DMG every 0.5s for 6s
                        </p>
                      </div>
                      <div>
                        <span className={`${theme.accent} font-medium text-sm`}>
                          Stacks:
                        </span>
                        <p className='text-gray-300 text-sm mt-1'>
                          Up to 5 stacks
                        </p>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <div>
                        <span className={`${theme.accent} font-medium text-sm`}>
                          Element:
                        </span>
                        <p className='text-gray-300 text-sm mt-1'>
                          Blaze element
                        </p>
                      </div>
                      <div>
                        <span className={`${theme.accent} font-medium text-sm`}>
                          Properties:
                        </span>
                        <p className='text-gray-300 text-sm mt-1'>
                          Cannot Crit, cannot strike Weakspots, and will not
                          decay with distance
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='pt-4 border-t border-gray-700/50'>
                    <div className='bg-gray-900/50 rounded-lg p-4'>
                      <div
                        className='flex items-center gap-2 cursor-pointer'
                        onClick={() => setFormulaExpanded(!formulaExpanded)}
                      >
                        <span className={`${theme.accent} font-medium text-sm`}>
                          Formula:
                        </span>
                        {formulaExpanded ? (
                          <ChevronDown
                            className={`w-4 h-4 ${theme.accent} transition-transform duration-200`}
                          />
                        ) : (
                          <ChevronRight
                            className={`w-4 h-4 ${theme.accent} transition-transform duration-200`}
                          />
                        )}
                      </div>
                      <p className='text-gray-400 text-xs font-mono mt-2'>
                        12% × Psi Intensity × (1 + Burn DMG Factor Bonus) × (1 +
                        Burn Final DMG Bonus)
                      </p>

                      {formulaExpanded && (
                        <div className='mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30'>
                          <h5
                            className={`${theme.accent} font-medium text-sm mb-3`}
                          >
                            What this means in practice:
                          </h5>
                          <div className='space-y-2 text-xs text-gray-300'>
                            <p>
                              <span className={theme.accent}>
                                • Base Damage:
                              </span>{" "}
                              12% of your Psi Intensity as damage every 0.5
                              seconds
                            </p>
                            <p>
                              <span className={theme.accent}>
                                • Burn DMG Factor Bonus:
                              </span>{" "}
                              Your burn damage factor bonuses (elemental damage)
                              multiply the burn damage
                            </p>
                            <p>
                              <span className={theme.accent}>
                                • Burn Final DMG Bonus:
                              </span>{" "}
                              Your burn final damage bonuses (status damage)
                              also multiply the burn damage
                            </p>
                            <p>
                              <span className={theme.accent}>• Example:</span>{" "}
                              With 1000 Psi Intensity, 50% elemental damage, and
                              30% status damage, each tick deals ~234 damage
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weapon-Specific Calculator */}
      <div className='w-full bg-gray-900/20 py-12 relative z-50'>
        <div className='max-w-full mx-auto px-8'>
          {/* Armor & Mod Selection */}
          <div className='bg-black/60 border border-orange-500/30 rounded-2xl p-8 mb-12'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-3xl font-bold text-orange-400'>
                Armor & Mod Selection
              </h2>
              <Calculator className='w-8 h-8 text-orange-400' />
            </div>

            {/* Armor Selection Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8'>
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
                  className='space-y-4 p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300'
                >
                  <div className='flex items-center justify-between'>
                    <label className='text-sm font-semibold text-gray-200 capitalize tracking-wide'>
                      {gearType}
                    </label>
                    <button
                      onClick={() =>
                        setKeyArmor(keyArmor === gearType ? "" : gearType)
                      }
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                        keyArmor === gearType
                          ? "bg-gradient-to-r from-orange-400 to-orange-500 border-orange-400 shadow-lg shadow-orange-400/25"
                          : "border-gray-500 hover:border-orange-400"
                      }`}
                      title='Key Armor'
                    />
                  </div>

                  {/* Armor Dropdown */}
                  <select
                    value={selectedArmor[gearType]}
                    onChange={(e) =>
                      setSelectedArmor((prev) => ({
                        ...prev,
                        [gearType]: e.target.value,
                      }))
                    }
                    className='w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-200 hover:border-gray-500'
                  >
                    <option value=''>Select {gearType}</option>
                    {getArmorByGearType(gearType).map((armor) => (
                      <option
                        key={armor.id}
                        value={armor.id}
                        className='bg-gray-800'
                      >
                        {armor.name}
                      </option>
                    ))}
                  </select>

                  {/* Mod Dropdown */}
                  <select
                    value={selectedMods[gearType]}
                    onChange={(e) =>
                      setSelectedMods((prev) => ({
                        ...prev,
                        [gearType]: e.target.value,
                      }))
                    }
                    className='w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600/50 rounded-lg px-4 py-2 text-gray-100 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-200 hover:border-gray-500 text-sm'
                  >
                    <option value=''>Select mod</option>
                    {getModsByGearType(gearType).map((mod) => (
                      <option
                        key={mod.id}
                        value={mod.id}
                        className='bg-gray-800'
                      >
                        {mod.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Weapon Mod Selection */}
            <div className='mb-8 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300'>
              <label className='text-sm font-semibold text-gray-200 mb-4 block tracking-wide'>
                Weapon Mod
              </label>
              <select
                value={selectedMods.weapon}
                onChange={(e) =>
                  setSelectedMods((prev) => ({
                    ...prev,
                    weapon: e.target.value,
                  }))
                }
                className='w-full max-w-md bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-100 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-200 hover:border-gray-500'
              >
                <option value=''>Select weapon mod</option>
                {getModsByGearType("weapon").map((mod) => (
                  <option
                    key={mod.id}
                    value={mod.id}
                    className='bg-gray-800'
                  >
                    {mod.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Key Armor Indicator */}
            {keyArmor && (
              <div className='mb-8 p-6 bg-gradient-to-r from-orange-900/30 to-orange-800/20 border border-orange-500/50 rounded-xl shadow-lg shadow-orange-500/10'>
                <div className='flex items-center space-x-3'>
                  <div className='w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-lg shadow-orange-400/50'></div>
                  <p className='text-orange-200 font-semibold tracking-wide'>
                    Key Armor:{" "}
                    <span className='text-orange-400 capitalize font-bold'>
                      {keyArmor}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Header */}
          <div className='text-center mb-12'>
            <h3
              className={`text-4xl md:text-6xl font-bold mb-6  ${theme.highlight}`}
            >
              Burn Damage Calculator
            </h3>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
            {/* Input Form */}
            <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-1'>
              <h2 className='text-2xl font-bold mb-6 text-gray-300  tracking-wide'>
                WEAPON STATS
              </h2>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Psi Intensity
                  </label>
                  <input
                    type='number'
                    value={psiIntensity}
                    onChange={(e) => setPsiIntensity(e.target.value)}
                    className='w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
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
                    className='w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
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
                    className='w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
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
                    className='w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
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
                    className='w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-orange-400 focus:outline-none transition-colors cursor-text'
                    placeholder='Enter burn damage bonus %'
                    autoComplete='off'
                  />
                </div>

                <button
                  className={`w-full ${theme.buttonBg} ${theme.border} px-6 py-3 rounded-lg font-medium text-white hover:scale-105 transition-all duration-200`}
                >
                  <Calculator className='h-5 w-5 mr-2 inline' />
                  CALCULATE DAMAGE
                </button>
              </div>
            </div>

            {/* Results */}
            <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-1'>
              <h2 className='text-2xl font-bold mb-8 text-gray-300  tracking-wide'>
                RESULTS
              </h2>

              <div className='space-y-4'>
                <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                  <div className='text-sm font-medium text-gray-400 mb-3'>
                    Burn Damage (Per Tick)
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>1st Tick:</span>
                      <span className='text-lg font-bold text-white'>
                        {burnResults.tick1}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>2nd Tick:</span>
                      <span className='text-lg font-bold text-white'>
                        {burnResults.tick2}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>3rd Tick:</span>
                      <span className='text-lg font-bold text-white'>
                        {burnResults.tick3}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>4th Tick:</span>
                      <span className='text-lg font-bold text-white'>
                        {burnResults.tick4}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>5th Tick:</span>
                      <span className='text-lg font-bold text-white'>
                        {burnResults.tick5}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>6th Tick:</span>
                      <span className='text-lg font-bold text-white'>
                        {burnResults.tick6}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-400'>7th Tick:</span>
                      <span className='text-lg font-bold text-white'>
                        {burnResults.tick7}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                  <div className='text-sm font-medium text-gray-400 mb-2'>
                    Explosion Damage
                  </div>
                  <div className='text-3xl font-bold text-white'>
                    {burnResults.explosion}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations */}
            <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-2'>
              <h2 className='text-2xl font-bold mb-8 text-gray-300  tracking-wide'>
                CALCULATIONS
              </h2>

              {psiIntensity ? (
                <div className='space-y-4'>
                  {/* Burn Damage Calculation Steps */}
                  <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                    <div className='text-sm font-medium text-gray-400 mb-3'>
                      Burn Damage Calculation Steps
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                      {/* Left Column - Base Damage */}
                      <div className='space-y-1'>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          BASE DAMAGE
                        </div>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          === BASE DAMAGE CALCULATION ===
                        </div>
                        <div className='space-y-1'>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 1: Start with your Psi Intensity
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            → psiIntensity({psiIntensity || 0})
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 2: Apply base burn damage (12%)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            → {psiIntensity || 0} × 12%
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            → {psiIntensity || 0} × 0.12
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {((parseFloat(psiIntensity) || 0) * 0.12).toFixed(
                              2
                            )}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 3: Apply elemental damage bonus
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {((parseFloat(psiIntensity) || 0) * 0.12).toFixed(
                              2
                            )}{" "}
                            × (1 + {elementalDamage || 0}%)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {((parseFloat(psiIntensity) || 0) * 0.12).toFixed(
                              2
                            )}{" "}
                            × (1 + {(parseFloat(elementalDamage) || 0) / 100})
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {((parseFloat(psiIntensity) || 0) * 0.12).toFixed(
                              2
                            )}{" "}
                            × {1 + (parseFloat(elementalDamage) || 0) / 100}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              0.12 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 4: Apply status damage bonus
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              0.12 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100)
                            ).toFixed(2)}{" "}
                            × (1 + {statusDamage || 0}%)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              0.12 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 5: Apply burn damage bonus
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              0.12 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100)
                            ).toFixed(2)}{" "}
                            × (1 + {burnDamageBonus || 0}%)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              0.12 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              (1 + (parseFloat(burnDamageBonus) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Final Calculation */}
                      <div className='space-y-1'>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          FINAL DAMAGE
                        </div>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          === FINAL DAMAGE CALCULATION ===
                        </div>
                        <div className='space-y-1'>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 6: Apply enemy damage multiplier
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              0.12 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              (1 + (parseFloat(burnDamageBonus) || 0) / 100)
                            ).toFixed(2)}{" "}
                            × (1 + {enemyDamageMultiplier || 0}%)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              0.12 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                              (1 +
                                (parseFloat(enemyDamageMultiplier) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            → {burnResults.tick1}
                          </div>
                          <div className='text-xs text-orange-400 font-mono leading-relaxed font-semibold'>
                            Stack 1 Damage = {burnResults.tick1}
                          </div>
                          <div className='text-xs text-orange-400 font-mono leading-relaxed font-semibold'>
                            Stack 7 Damage = {burnResults.tick7}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explosion Damage Calculation Steps */}
                  <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                    <div className='text-sm font-medium text-gray-400 mb-3'>
                      Explosion Damage Calculation Steps
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                      {/* Left Column - Base Explosion */}
                      <div className='space-y-1'>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          BASE EXPLOSION
                        </div>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          === BASE EXPLOSION CALCULATION ===
                        </div>
                        <div className='space-y-1'>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 1: Start with your Psi Intensity
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            → psiIntensity({psiIntensity || 0})
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 2: Apply elemental damage bonus
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            → {psiIntensity || 0} × (1 + {elementalDamage || 0}
                            %)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 3: Apply status damage bonus
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100)
                            ).toFixed(2)}{" "}
                            × (1 + {statusDamage || 0}%)
                          </div>

                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100)
                            ).toFixed(2)}{" "}
                            × {1 + (parseFloat(statusDamage) || 0) / 100}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Final Explosion */}
                      <div className='space-y-1'>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          FINAL EXPLOSION
                        </div>
                        <div className='text-xs text-gray-300 font-mono font-semibold mb-2'>
                          === FINAL EXPLOSION CALCULATION ===
                        </div>
                        <div className='space-y-1'>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 4: Apply status damage bonus
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              2 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100)
                            ).toFixed(2)}{" "}
                            × (1 + {statusDamage || 0}%)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              2 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            Step 5: Apply enemy damage multiplier
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              2 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100)
                            ).toFixed(2)}{" "}
                            × (1 + {enemyDamageMultiplier || 0}%)
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            →{" "}
                            {(
                              (parseFloat(psiIntensity) || 0) *
                              2 *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              (1 +
                                (parseFloat(enemyDamageMultiplier) || 0) / 100)
                            ).toFixed(2)}
                          </div>
                          <div className='text-xs text-gray-400 font-mono leading-relaxed'>
                            → {burnResults.explosion}
                          </div>
                          <div className='text-xs text-orange-400 font-mono leading-relaxed font-semibold'>
                            Explosion Damage = {burnResults.explosion}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-center py-12'>
                  <Calculator className='h-16 w-16 text-gray-600 mx-auto mb-4' />
                  <p className='text-gray-400'>
                    Enter weapon stats to see step-by-step burn damage
                    calculations
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
