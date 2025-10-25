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

  // Armor and mod selection state
  const [selectedArmor, setSelectedArmor] = useState<Record<string, string>>({})
  const [selectedMods, setSelectedMods] = useState<Record<string, string>>({})
  const [keyArmor, setKeyArmor] = useState<string>("")

  useEffect(() => {
    const weaponData = getWeaponById(weaponId)
    setWeapon(weaponData)
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

  const burnResults = useMemo(() => {
    const psi = parseFloat(psiIntensity) || 0
    const elemental = parseFloat(elementalDamage) || 0
    const status = parseFloat(statusDamage) || 0
    const enemyMultiplier = parseFloat(enemyDamageMultiplier) || 0
    const burnBonus = parseFloat(burnDamageBonus) || 0

    // Check if Blaze Amplifier mod is selected (increases burn damage factor from 0.12 to 0.15)
    const blazeAmplifierMod = selectedMods.mask === "blaze-amplifier"
    const burnDamageFactor = blazeAmplifierMod ? 0.15 : 0.12

    // Base burn damage formula: psi × burnDamageFactor × (1 + elemental/100) × (1 + status/100) × (1 + burnBonus/100) × (1 + enemyMultiplier/100)
    const baseBurnDamage =
      psi *
      burnDamageFactor *
      (1 + elemental / 100) *
      (1 + status / 100) *
      (1 + burnBonus / 100) *
      (1 + enemyMultiplier / 100)

    // Each tick gets cumulative damage (stack 1 = base, stack 2 = 2×base, etc.)
    // Try rounding at intermediate steps to match game calculation
    const step1 = Math.round(psi * burnDamageFactor * 100) / 100
    const step2 = Math.round(step1 * (1 + elemental / 100) * 100) / 100
    const step3 = Math.round(step2 * (1 + status / 100) * 100) / 100
    const step4 = Math.round(step3 * (1 + burnBonus / 100) * 100) / 100
    const finalBaseDamage = Math.round(step4 * (1 + enemyMultiplier / 100))

    const tick1 = finalBaseDamage
    const tick2 = Math.floor(finalBaseDamage * 2)
    const tick3 = Math.floor(finalBaseDamage * 3)
    const tick4 = Math.floor(finalBaseDamage * 4)
    const tick5 = Math.floor(finalBaseDamage * 5)
    const tick6 = Math.floor(finalBaseDamage * 6)
    const tick7 = Math.floor(finalBaseDamage * 7)

    // Explosion damage: psi × (1 + elemental/100) × (1 + status/100) × (1 + initial/100) × (1 + final/100) × (1 + enemyMultiplier/100)
    // Use even more intermediate rounding steps to match game calculation
    const expStep1 = Math.floor(psi * 1000) / 1000
    const expStep2 = Math.floor(expStep1 * (1 + elemental / 100) * 1000) / 1000
    const expStep3 = Math.floor(expStep2 * (1 + status / 100) * 1000) / 1000
    const expStep4 = Math.floor(expStep3 * (1 + 200 / 100) * 1000) / 1000 // Initial bonus (200%)
    const expStep5 = Math.floor(expStep4 * (1 + 0 / 100) * 1000) / 1000 // Final bonus (0% for now)
    const expStep6 =
      Math.floor(expStep5 * (1 + enemyMultiplier / 100) * 1000) / 1000

    const explosionDamage = Math.ceil(expStep6)

    return {
      tick1,
      tick2,
      tick3,
      tick4,
      tick5,
      tick6,
      tick7,
      explosion: explosionDamage,
    }
  }, [
    psiIntensity,
    elementalDamage,
    statusDamage,
    enemyDamageMultiplier,
    burnDamageBonus,
    selectedMods,
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
        ></div>
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
          }}
        ></div>

        {/* Flowing Lines */}
        <div
          className='absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-orange-400/30 to-transparent transform transition-all duration-1000 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.01}px) translateY(${
              mousePosition.y * 0.005
            }px)`,
          }}
        ></div>
        <div
          className='absolute top-40 right-20 w-24 h-1 bg-gradient-to-r from-transparent to-orange-400/20 transform transition-all duration-1200 ease-out'
          style={{
            transform: `translateX(${-mousePosition.x * 0.008}px) translateY(${
              mousePosition.y * 0.012
            }px)`,
          }}
        ></div>
        <div
          className='absolute bottom-32 left-1/4 w-40 h-1 bg-gradient-to-r from-orange-400/20 to-transparent transform transition-all duration-800 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.006}px) translateY(${
              -mousePosition.y * 0.008
            }px)`,
          }}
        ></div>

        {/* Geometric Shapes */}
        <div
          className='absolute top-32 right-16 w-16 h-16 border border-white/8 transform transition-all duration-1000 ease-out'
          style={{
            transform: `rotate(${45 + mousePosition.x * 0.01}deg) translate(${
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
            <div className='col-span-7'>
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
              <h1 className='text-6xl font-bold text-white mb-6 tracking-tight'>
                {weapon.name}
              </h1>
              <p className='text-xl text-gray-300 leading-relaxed'>
                {weapon.description}
              </p>
            </div>

            {/* Special Abilities */}
            <div className='col-span-5'>
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
              Burn Damage Calculator
            </h3>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
            {/* Input Form */}
            <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-1'>
              <h2 className='text-2xl font-bold mb-6 text-gray-300  tracking-wide'>
                WEAPON STATS & BUILD
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

                {/* Armor & Mod Selection */}
                <div className='border-t border-gray-600 pt-6'>
                  <h3 className='text-lg font-semibold text-gray-300 mb-4'>
                    Armor & Mods
                  </h3>

                  {/* Armor Selection Grid */}
                  <div className='grid grid-cols-2 gap-3 mb-4'>
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
                        className='space-y-2'
                      >
                        <div className='flex items-center justify-between'>
                          <label className='text-xs font-medium text-gray-400 capitalize'>
                            {gearType}
                          </label>
                          <button
                            onClick={() =>
                              setKeyArmor(keyArmor === gearType ? "" : gearType)
                            }
                            className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                              keyArmor === gearType
                                ? "bg-orange-400 border-orange-400"
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
                          className='w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:border-orange-400 focus:outline-none text-xs'
                        >
                          <option value=''>Select armor</option>
                          {getArmorByGearType(gearType).map((armor) => (
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
                          value={selectedMods[gearType]}
                          onChange={(e) =>
                            setSelectedMods((prev) => ({
                              ...prev,
                              [gearType]: e.target.value,
                            }))
                          }
                          className='w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-gray-100 focus:border-orange-400 focus:outline-none text-xs'
                        >
                          <option value=''>Select mod</option>
                          {getModsByGearType(gearType).map((mod) => (
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
                    <label className='text-xs font-medium text-gray-400 block mb-1'>
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
                      className='w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:border-orange-400 focus:outline-none text-sm'
                    >
                      <option value=''>Select weapon mod</option>
                      {getModsByGearType("weapon").map((mod) => (
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
              <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl font-bold text-gray-300 tracking-wide'>
                  RESULTS
                </h2>
                <span className='text-xs text-gray-400'>
                  Disclaimer: Game was made using ChatGPT, so the rounding is
                  funny. Results may be 0-1% off.
                </span>
              </div>

              <div className='space-y-4'>
                <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                  <div className='text-sm font-medium text-gray-400 mb-3'>
                    Burn Damage (Per Tick)
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>Tick 1:</span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.tick1}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>Tick 2:</span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.tick2}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>Tick 3:</span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.tick3}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>Tick 4:</span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.tick4}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>Tick 5:</span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.tick5}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>Tick 6:</span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.tick6}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>Tick 7:</span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.tick7}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-600'>
                  <div className='text-sm font-medium text-gray-400 mb-3'>
                    Explosion Damage
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-300'>
                        Base Explosion (200% Psi):
                      </span>
                      <span className='text-orange-400 font-mono'>
                        {burnResults.explosion}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations */}
            <div className='bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-2'>
              <h2 className='text-2xl font-bold mb-8 text-gray-300 tracking-wide'>
                CALCULATIONS
              </h2>

              {psiIntensity ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {/* Burn Damage Calculations */}
                  <div>
                    <h3 className='text-lg font-semibold text-gray-300 mb-4'>
                      BURN DAMAGE CALCULATION
                    </h3>
                    <div className='space-y-2 text-sm font-mono'>
                      <div className='text-gray-400'>
                        Step 1: Base Damage = {parseFloat(psiIntensity) || 0} ×{" "}
                        {selectedMods.mask === "blaze-amplifier"
                          ? "0.15"
                          : "0.12"}{" "}
                        ={" "}
                        {Math.round(
                          (parseFloat(psiIntensity) || 0) *
                            (selectedMods.mask === "blaze-amplifier"
                              ? 0.15
                              : 0.12) *
                            100
                        ) / 100}
                      </div>
                      <div className='text-gray-400'>
                        Step 2: With Elemental ={" "}
                        {Math.round(
                          (parseFloat(psiIntensity) || 0) *
                            (selectedMods.mask === "blaze-amplifier"
                              ? 0.15
                              : 0.12) *
                            100
                        ) / 100}{" "}
                        × (1 + {(parseFloat(elementalDamage) || 0) / 100}) ={" "}
                        {Math.round(
                          (Math.round(
                            (parseFloat(psiIntensity) || 0) *
                              (selectedMods.mask === "blaze-amplifier"
                                ? 0.15
                                : 0.12) *
                              100
                          ) /
                            100) *
                            (1 + (parseFloat(elementalDamage) || 0) / 100) *
                            100
                        ) / 100}
                      </div>
                      <div className='text-gray-400'>
                        Step 3: With Status ={" "}
                        {Math.round(
                          (Math.round(
                            (parseFloat(psiIntensity) || 0) *
                              (selectedMods.mask === "blaze-amplifier"
                                ? 0.15
                                : 0.12) *
                              100
                          ) /
                            100) *
                            (1 + (parseFloat(elementalDamage) || 0) / 100) *
                            100
                        ) / 100}{" "}
                        × (1 + {(parseFloat(statusDamage) || 0) / 100}) ={" "}
                        {Math.round(
                          (Math.round(
                            (Math.round(
                              (parseFloat(psiIntensity) || 0) *
                                (selectedMods.mask === "blaze-amplifier"
                                  ? 0.15
                                  : 0.12) *
                                100
                            ) /
                              100) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              100
                          ) /
                            100) *
                            (1 + (parseFloat(statusDamage) || 0) / 100) *
                            100
                        ) / 100}
                      </div>
                      <div className='text-gray-400'>
                        Step 4: With Burn Bonus ={" "}
                        {Math.round(
                          (Math.round(
                            (Math.round(
                              (parseFloat(psiIntensity) || 0) *
                                (selectedMods.mask === "blaze-amplifier"
                                  ? 0.15
                                  : 0.12) *
                                100
                            ) /
                              100) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              100
                          ) /
                            100) *
                            (1 + (parseFloat(statusDamage) || 0) / 100) *
                            100
                        ) / 100}{" "}
                        × (1 + {(parseFloat(burnDamageBonus) || 0) / 100}) ={" "}
                        {Math.round(
                          (Math.round(
                            (Math.round(
                              (Math.round(
                                (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  100
                              ) /
                                100) *
                                (1 + (parseFloat(elementalDamage) || 0) / 100) *
                                100
                            ) /
                              100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              100
                          ) /
                            100) *
                            (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                            100
                        ) / 100}
                      </div>
                      <div className='text-orange-400 font-semibold'>
                        Final: With Enemy Multiplier ={" "}
                        {Math.round(
                          (Math.round(
                            (Math.round(
                              (Math.round(
                                (parseFloat(psiIntensity) || 0) *
                                  (selectedMods.mask === "blaze-amplifier"
                                    ? 0.15
                                    : 0.12) *
                                  100
                              ) /
                                100) *
                                (1 + (parseFloat(elementalDamage) || 0) / 100) *
                                100
                            ) /
                              100) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              100
                          ) /
                            100) *
                            (1 + (parseFloat(burnDamageBonus) || 0) / 100) *
                            100
                        ) / 100}{" "}
                        × (1 + {(parseFloat(enemyDamageMultiplier) || 0) / 100})
                        = {burnResults.tick1}
                      </div>
                    </div>
                  </div>

                  {/* Explosion Damage Calculations */}
                  <div>
                    <h3 className='text-lg font-semibold text-gray-300 mb-4'>
                      EXPLOSION DAMAGE CALCULATION
                    </h3>
                    <div className='space-y-2 text-sm font-mono'>
                      <div className='text-gray-400'>
                        Step 1: Base = {parseFloat(psiIntensity) || 0} × (1 +{" "}
                        {(parseFloat(elementalDamage) || 0) / 100}) ={" "}
                        {Math.floor(
                          (parseFloat(psiIntensity) || 0) *
                            (1 + (parseFloat(elementalDamage) || 0) / 100) *
                            1000
                        ) / 1000}
                      </div>
                      <div className='text-gray-400'>
                        Step 2: With Status ={" "}
                        {Math.floor(
                          (parseFloat(psiIntensity) || 0) *
                            (1 + (parseFloat(elementalDamage) || 0) / 100) *
                            1000
                        ) / 1000}{" "}
                        × (1 + {(parseFloat(statusDamage) || 0) / 100}) ={" "}
                        {Math.floor(
                          (Math.floor(
                            (parseFloat(psiIntensity) || 0) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              1000
                          ) /
                            1000) *
                            (1 + (parseFloat(statusDamage) || 0) / 100) *
                            1000
                        ) / 1000}
                      </div>
                      <div className='text-gray-400'>
                        Step 3: With Initial Bonus ={" "}
                        {Math.floor(
                          (Math.floor(
                            (parseFloat(psiIntensity) || 0) *
                              (1 + (parseFloat(elementalDamage) || 0) / 100) *
                              1000
                          ) /
                            1000) *
                            (1 + (parseFloat(statusDamage) || 0) / 100) *
                            1000
                        ) / 1000}{" "}
                        × (1 + 2.00) ={" "}
                        {Math.floor(
                          (Math.floor(
                            (Math.floor(
                              (parseFloat(psiIntensity) || 0) *
                                (1 + (parseFloat(elementalDamage) || 0) / 100) *
                                1000
                            ) /
                              1000) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              1000
                          ) /
                            1000) *
                            3 *
                            1000
                        ) / 1000}
                      </div>
                      <div className='text-gray-400'>
                        Step 4: With Final Bonus ={" "}
                        {Math.floor(
                          (Math.floor(
                            (Math.floor(
                              (parseFloat(psiIntensity) || 0) *
                                (1 + (parseFloat(elementalDamage) || 0) / 100) *
                                1000
                            ) /
                              1000) *
                              (1 + (parseFloat(statusDamage) || 0) / 100) *
                              1000
                          ) /
                            1000) *
                            3 *
                            1000
                        ) / 1000}{" "}
                        × (1 + 0.00) ={" "}
                        {Math.floor(
                          (Math.floor(
                            (Math.floor(
                              (Math.floor(
                                (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    (parseFloat(elementalDamage) || 0) / 100) *
                                  1000
                              ) /
                                1000) *
                                (1 + (parseFloat(statusDamage) || 0) / 100) *
                                1000
                            ) /
                              1000) *
                              3 *
                              1000
                          ) /
                            1000) *
                            1 *
                            1000
                        ) / 1000}
                      </div>
                      <div className='text-orange-400 font-semibold'>
                        Final: With Enemy Multiplier ={" "}
                        {Math.floor(
                          (Math.floor(
                            (Math.floor(
                              (Math.floor(
                                (parseFloat(psiIntensity) || 0) *
                                  (1 +
                                    (parseFloat(elementalDamage) || 0) / 100) *
                                  1000
                              ) /
                                1000) *
                                (1 + (parseFloat(statusDamage) || 0) / 100) *
                                1000
                            ) /
                              1000) *
                              3 *
                              1000
                          ) /
                            1000) *
                            1 *
                            1000
                        ) / 1000}{" "}
                        × (1 + {(parseFloat(enemyDamageMultiplier) || 0) / 100})
                        = {burnResults.explosion}
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
