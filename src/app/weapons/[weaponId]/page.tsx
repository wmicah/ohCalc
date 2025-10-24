"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calculator, Zap, Target, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getWeaponById, Weapon } from "../../../lib/weapons-data"
import { DamageCalculator } from "@/lib/damage-formulas"

export default function WeaponDetailPage() {
  const params = useParams()
  const weaponId = params.weaponId as string
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [weapon, setWeapon] = useState<Weapon | null>(null)

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

  // Calculate damage scenarios for this weapon
  const damageResults =
    weapon.damageType === "normal"
      ? DamageCalculator.calculateNormalWeaponDamage(
          {
            attack: weapon.baseStats.attack,
            weaponDamageBonus: weapon.damageStats.weaponDamageBonus || 0,
            critDamage: weapon.damageStats.critDamage || 0,
            weakspotDamage: weapon.damageStats.weakspotDamage || 0,
            enemyBonus: weapon.damageStats.enemyBonus || 0,
          },
          0
        )
      : null

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

      <div className='max-w-6xl mx-auto px-6 py-12 relative z-10'>
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
                  <h1 className='text-6xl font-black text-white font-android tracking-tight leading-none'>
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
                        className={`text-2xl font-bold ${theme.highlight} font-android tracking-wide`}
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
                className={`text-2xl font-bold ${theme.highlight} font-android tracking-wide`}
              >
                Burn Effect Details
              </h3>

              <div className='bg-gray-800/50 rounded-xl p-6 border border-orange-500/30'>
                <div className='space-y-6'>
                  <h4
                    className={`text-lg font-semibold ${theme.accent} font-android`}
                  >
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
                      <span className={`${theme.accent} font-medium text-sm`}>
                        Formula:
                      </span>
                      <p className='text-gray-400 text-xs font-mono mt-2'>
                        12% × Psi Intensity × (1 + Burn DMG Factor Bonus) × (1 +
                        Burn Final DMG Bonus)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Damage Calculations */}
        {damageResults && (
          <div
            className={`${theme.cardBg} border ${theme.border} rounded-2xl p-8`}
          >
            <h3
              className={`text-2xl font-bold ${theme.highlight} mb-6 font-android tracking-wide`}
            >
              DAMAGE CALCULATIONS
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-gray-800/30 rounded-lg p-4 text-center'>
                <div className='text-sm text-gray-400 mb-1'>Base Damage</div>
                <div className='text-2xl font-bold text-white'>
                  {damageResults.base.damage}
                </div>
              </div>
              <div className='bg-gray-800/30 rounded-lg p-4 text-center'>
                <div className='text-sm text-gray-400 mb-1'>Crit Damage</div>
                <div className='text-2xl font-bold text-white'>
                  {damageResults.crit.damage}
                </div>
              </div>
              <div className='bg-gray-800/30 rounded-lg p-4 text-center'>
                <div className='text-sm text-gray-400 mb-1'>Weakspot Hit</div>
                <div className='text-2xl font-bold text-white'>
                  {damageResults.weakspot.damage}
                </div>
              </div>
              <div className='bg-gray-800/30 rounded-lg p-4 text-center'>
                <div className='text-sm text-gray-400 mb-1'>Crit Weakspot</div>
                <div className='text-2xl font-bold text-white'>
                  {damageResults.critWeakspot.damage}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
