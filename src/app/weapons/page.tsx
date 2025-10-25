"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { weaponsData } from "../../lib/weapons-data"

export default function WeaponsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className='min-h-screen bg-gray-950 text-white pt-16 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0'>
        {/* Animated Grid */}
        <div
          className='absolute inset-0 opacity-25'
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Additional Grid Lines for Futuristic Look */}
        <div
          className='absolute inset-0 opacity-15'
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
            backgroundSize: "25px 25px",
          }}
        ></div>

        {/* Diagonal Grid Lines */}
        <div
          className='absolute inset-0 opacity-8'
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 11px)`,
          }}
        ></div>

        {/* Floating Elements */}
        <div
          className='absolute top-20 left-20 w-32 h-32 border border-white/20 transform transition-all duration-1000 ease-out'
          style={{
            transform: `rotate(${45 + mousePosition.x * 0.005}deg) translate(${
              mousePosition.x * 0.01
            }px, ${mousePosition.y * 0.01}px)`,
          }}
        ></div>
        <div
          className='absolute top-40 right-32 w-24 h-24 border border-white/15 transform transition-all duration-800 ease-out'
          style={{
            transform: `rotate(${-30 + mousePosition.y * 0.008}deg) translate(${
              -mousePosition.x * 0.005
            }px, ${mousePosition.y * 0.015}px)`,
          }}
        ></div>

        {/* Flowing Lines */}
        <div
          className='absolute top-1/3 left-0 w-96 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent transform transition-all duration-600 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.02}px) rotate(${
              mousePosition.y * 0.005
            }deg)`,
          }}
        ></div>
        <div
          className='absolute top-2/3 right-0 w-80 h-px bg-gradient-to-l from-transparent via-white/6 to-transparent transform transition-all duration-700 ease-out'
          style={{
            transform: `translateX(${-mousePosition.x * 0.015}px) rotate(${
              -mousePosition.y * 0.004
            }deg)`,
          }}
        ></div>
        <div
          className='absolute top-1/2 left-0 w-72 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transform transition-all duration-800 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.018}px) rotate(${
              mousePosition.y * 0.003
            }deg)`,
          }}
        ></div>

        {/* Vertical Lines */}
        <div
          className='absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/4 to-transparent transform transition-all duration-700 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.008}px)`,
          }}
        ></div>
        <div
          className='absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent transform transition-all duration-800 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * -0.006}px)`,
          }}
        ></div>

        {/* Additional Flowing Lines */}
        <div
          className='absolute top-1/4 left-1/3 w-64 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent transform transition-all duration-900 ease-out'
          style={{
            transform: `translateX(${mousePosition.x * 0.025}px) rotate(${
              mousePosition.y * 0.002
            }deg)`,
          }}
        ></div>
        <div
          className='absolute top-3/4 right-1/4 w-56 h-px bg-gradient-to-l from-transparent via-white/5 to-transparent transform transition-all duration-750 ease-out'
          style={{
            transform: `translateX(${-mousePosition.x * 0.012}px) rotate(${
              -mousePosition.y * 0.003
            }deg)`,
          }}
        ></div>

        {/* Dark Gradient Overlay for Bottom */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60'></div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-12 relative z-10'>
        {/* Header */}
        <div className='text-center mb-24'>
          <h1 className='text-5xl md:text-7xl font-black mb-6 font-android'>
            <span className='bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent'>
              WEAPONS
            </span>
          </h1>
          <p className='text-xl text-gray-300/80 max-w-3xl mx-auto font-light tracking-wide'>
            Choose your weapon of choice and optimize your damage output
          </p>
        </div>

        {/* Weapons Grid - Just Images */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {weaponsData.map((weapon: any) => (
            <Link
              key={weapon.id}
              href={`/weapons/${weapon.id}`}
            >
              <div className='group relative bg-gray-900/30 border border-gray-700 rounded-xl p-3 hover:scale-105 transition-all duration-300 cursor-pointer hover:border-gray-500'>
                <div className='relative w-full h-32 bg-gray-800/50 rounded-lg overflow-hidden'>
                  <Image
                    src={weapon.image}
                    alt={weapon.name}
                    fill
                    className='object-cover transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>

                {/* Weapon Name - Small and Simple */}
                <div className='mt-3 text-center'>
                  <h3 className='text-sm font-medium text-gray-300 group-hover:text-white transition-colors'>
                    {weapon.name}
                  </h3>
                </div>

                {/* Rarity Indicator */}
                <div className='absolute top-2 right-2'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      weapon.rarity === "common"
                        ? "bg-gray-400"
                        : weapon.rarity === "uncommon"
                        ? "bg-green-400"
                        : weapon.rarity === "rare"
                        ? "bg-blue-400"
                        : weapon.rarity === "epic"
                        ? "bg-purple-400"
                        : "bg-yellow-400"
                    }`}
                  ></div>
                </div>

                {/* Elemental Type Indicator */}
                {weapon.specialAbilities?.some((ability: string) =>
                  ability.toLowerCase().includes("frost")
                ) && (
                  <div className='absolute top-2 left-2'>
                    <div
                      className='w-2 h-2 rounded-full bg-blue-400 animate-pulse'
                      title='Frost Weapon'
                    ></div>
                  </div>
                )}
                {weapon.specialAbilities?.some((ability: string) =>
                  ability.toLowerCase().includes("burn")
                ) && (
                  <div className='absolute top-2 left-2'>
                    <div
                      className='w-2 h-2 rounded-full bg-orange-400 animate-pulse'
                      title='Burn Weapon'
                    ></div>
                  </div>
                )}

                {/* Tooltip */}
                <div className='absolute bottom-full left-0 right-0 mb-2 px-2 py-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 pointer-events-none z-10'>
                  <div className='text-xs text-gray-300 leading-relaxed'>
                    <div className='font-semibold text-white mb-2 text-center'>
                      {weapon.specialAbilities?.some((ability: string) =>
                        ability.toLowerCase().includes("frost")
                      )
                        ? "Frost Weapon Features:"
                        : weapon.specialAbilities?.some((ability: string) =>
                            ability.toLowerCase().includes("burn")
                          )
                        ? "Burn Weapon Features:"
                        : "Weapon Features:"}
                    </div>
                    {weapon.specialAbilities &&
                      weapon.specialAbilities.map(
                        (ability: string, index: number) => (
                          <div
                            key={index}
                            className='mb-1 break-words'
                          >
                            <span
                              className={
                                weapon.specialAbilities?.some(
                                  (ability: string) =>
                                    ability.toLowerCase().includes("frost")
                                )
                                  ? "text-blue-400"
                                  : weapon.specialAbilities?.some(
                                      (ability: string) =>
                                        ability.toLowerCase().includes("burn")
                                    )
                                  ? "text-orange-400"
                                  : "text-blue-400"
                              }
                            >
                              •
                            </span>{" "}
                            {ability}
                          </div>
                        )
                      )}
                  </div>
                  {/* Tooltip Arrow */}
                  <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600'></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className='mt-16 text-center'>
          <div className='bg-gray-900/30 border border-gray-700 rounded-2xl p-12'>
            <h3 className='text-2xl font-bold text-gray-300 mb-4 font-android tracking-wide'>
              MORE WEAPONS COMING SOON
            </h3>
            <p className='text-gray-400 max-w-2xl mx-auto'>
              We're continuously adding new weapons and updating existing ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
