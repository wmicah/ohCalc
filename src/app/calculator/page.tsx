"use client"

import { useState } from "react"
import { Calculator, Target, Zap, Shield, Sword } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalculatorPage() {
  const [weaponDamage, setWeaponDamage] = useState("")
  const [fireRate, setFireRate] = useState("")
  const [magazineSize, setMagazineSize] = useState("")
  const [reloadTime, setReloadTime] = useState("")
  const [armorValue, setArmorValue] = useState("")
  const [results, setResults] = useState<any>(null)

  const calculateDamage = () => {
    const damage = parseFloat(weaponDamage) || 0
    const rate = parseFloat(fireRate) || 0
    const mag = parseFloat(magazineSize) || 0
    const reload = parseFloat(reloadTime) || 0
    const armor = parseFloat(armorValue) || 0

    if (damage === 0 || rate === 0) return

    const dps = damage * rate
    const burstDPS = damage * rate * mag
    const sustainedDPS = (damage * rate * mag) / (mag / rate + reload)
    const effectiveDamage = Math.max(1, damage - armor)
    const effectiveDPS = effectiveDamage * rate

    setResults({
      dps: dps.toFixed(2),
      burstDPS: burstDPS.toFixed(2),
      sustainedDPS: sustainedDPS.toFixed(2),
      effectiveDamage: effectiveDamage.toFixed(2),
      effectiveDPS: effectiveDPS.toFixed(2),
    })
  }

  return (
    <div className='min-h-screen bg-black text-white pt-16'>
      <div className='max-w-6xl mx-auto px-6 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm'>
            <Calculator className='h-5 w-5 text-orange-400' />
            <span className='text-orange-300 font-medium'>
              Damage Calculator
            </span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-white'>WEAPON</span>{" "}
            <span className='text-orange-400'>CALCULATOR</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Calculate optimal damage output for your weapons and gear in the
            post-apocalyptic world
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Input Form */}
          <div className='bg-gray-900/50 border border-gray-800 rounded-2xl p-8'>
            <h2 className='text-2xl font-bold mb-6 text-orange-400'>
              Weapon Stats
            </h2>

            <div className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Base Damage
                </label>
                <input
                  type='number'
                  value={weaponDamage}
                  onChange={(e) => setWeaponDamage(e.target.value)}
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none'
                  placeholder='Enter base damage'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Fire Rate (RPM)
                </label>
                <input
                  type='number'
                  value={fireRate}
                  onChange={(e) => setFireRate(e.target.value)}
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none'
                  placeholder='Enter fire rate'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Magazine Size
                </label>
                <input
                  type='number'
                  value={magazineSize}
                  onChange={(e) => setMagazineSize(e.target.value)}
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none'
                  placeholder='Enter magazine size'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Reload Time (seconds)
                </label>
                <input
                  type='number'
                  value={reloadTime}
                  onChange={(e) => setReloadTime(e.target.value)}
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none'
                  placeholder='Enter reload time'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Target Armor Value
                </label>
                <input
                  type='number'
                  value={armorValue}
                  onChange={(e) => setArmorValue(e.target.value)}
                  className='w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none'
                  placeholder='Enter armor value'
                />
              </div>

              <Button
                onClick={calculateDamage}
                className='w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 text-lg'
              >
                <Calculator className='h-5 w-5 mr-2' />
                Calculate Damage
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className='bg-gray-900/50 border border-gray-800 rounded-2xl p-8'>
            <h2 className='text-2xl font-bold mb-6 text-orange-400'>
              Calculation Results
            </h2>

            {results ? (
              <div className='space-y-6'>
                <div className='bg-gray-800/50 rounded-xl p-6 border border-gray-700'>
                  <div className='flex items-center gap-3 mb-3'>
                    <Zap className='h-6 w-6 text-orange-400' />
                    <h3 className='text-lg font-bold text-white'>
                      DPS (Damage Per Second)
                    </h3>
                  </div>
                  <div className='text-3xl font-bold text-orange-400'>
                    {results.dps}
                  </div>
                  <p className='text-gray-300 text-sm'>
                    Continuous damage output
                  </p>
                </div>

                <div className='bg-gray-800/50 rounded-xl p-6 border border-gray-700'>
                  <div className='flex items-center gap-3 mb-3'>
                    <Target className='h-6 w-6 text-orange-400' />
                    <h3 className='text-lg font-bold text-white'>Burst DPS</h3>
                  </div>
                  <div className='text-3xl font-bold text-orange-400'>
                    {results.burstDPS}
                  </div>
                  <p className='text-gray-300 text-sm'>Damage per magazine</p>
                </div>

                <div className='bg-gray-800/50 rounded-xl p-6 border border-gray-700'>
                  <div className='flex items-center gap-3 mb-3'>
                    <Shield className='h-6 w-6 text-orange-400' />
                    <h3 className='text-lg font-bold text-white'>
                      Sustained DPS
                    </h3>
                  </div>
                  <div className='text-3xl font-bold text-orange-400'>
                    {results.sustainedDPS}
                  </div>
                  <p className='text-gray-300 text-sm'>Including reload time</p>
                </div>

                <div className='bg-gray-800/50 rounded-xl p-6 border border-gray-700'>
                  <div className='flex items-center gap-3 mb-3'>
                    <Sword className='h-6 w-6 text-orange-400' />
                    <h3 className='text-lg font-bold text-white'>
                      Effective Damage
                    </h3>
                  </div>
                  <div className='text-3xl font-bold text-orange-400'>
                    {results.effectiveDamage}
                  </div>
                  <p className='text-gray-300 text-sm'>After armor reduction</p>
                </div>

                <div className='bg-gray-800/50 rounded-xl p-6 border border-gray-700'>
                  <div className='flex items-center gap-3 mb-3'>
                    <Zap className='h-6 w-6 text-orange-400' />
                    <h3 className='text-lg font-bold text-white'>
                      Effective DPS
                    </h3>
                  </div>
                  <div className='text-3xl font-bold text-orange-400'>
                    {results.effectiveDPS}
                  </div>
                  <p className='text-gray-300 text-sm'>
                    DPS after armor reduction
                  </p>
                </div>
              </div>
            ) : (
              <div className='text-center py-12'>
                <Calculator className='h-16 w-16 text-gray-600 mx-auto mb-4' />
                <p className='text-gray-400'>
                  Enter weapon stats to see calculations
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
