"use client"

import { useState } from "react"
import { Search, Filter, Zap, Target, Shield, Sword } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock weapons data
const weapons = [
  {
    id: 1,
    name: "Assault Rifle M4A1",
    type: "Assault Rifle",
    damage: 45,
    fireRate: 600,
    magazineSize: 30,
    reloadTime: 2.5,
    range: "Medium",
    rarity: "Common",
  },
  {
    id: 2,
    name: "Sniper Rifle AWM",
    type: "Sniper Rifle",
    damage: 120,
    fireRate: 40,
    magazineSize: 5,
    reloadTime: 4.0,
    range: "Long",
    rarity: "Rare",
  },
  {
    id: 3,
    name: "SMG MP5",
    type: "Submachine Gun",
    damage: 35,
    fireRate: 800,
    magazineSize: 25,
    reloadTime: 2.0,
    range: "Short",
    rarity: "Common",
  },
  {
    id: 4,
    name: "Shotgun SPAS-12",
    type: "Shotgun",
    damage: 80,
    fireRate: 60,
    magazineSize: 8,
    reloadTime: 3.5,
    range: "Short",
    rarity: "Uncommon",
  },
  {
    id: 5,
    name: "LMG M249",
    type: "Light Machine Gun",
    damage: 55,
    fireRate: 700,
    magazineSize: 100,
    reloadTime: 5.0,
    range: "Long",
    rarity: "Epic",
  },
  {
    id: 6,
    name: "Pistol Glock-17",
    type: "Pistol",
    damage: 25,
    fireRate: 400,
    magazineSize: 17,
    reloadTime: 1.5,
    range: "Short",
    rarity: "Common",
  },
]

export default function WeaponsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterRarity, setFilterRarity] = useState("All")

  const filteredWeapons = weapons.filter((weapon) => {
    const matchesSearch = weapon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = filterType === "All" || weapon.type === filterType
    const matchesRarity =
      filterRarity === "All" || weapon.rarity === filterRarity
    return matchesSearch && matchesType && matchesRarity
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-400"
      case "Uncommon":
        return "text-green-400"
      case "Rare":
        return "text-blue-400"
      case "Epic":
        return "text-purple-400"
      case "Legendary":
        return "text-orange-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className='min-h-screen bg-black text-white pt-16'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm'>
            <Sword className='h-5 w-5 text-orange-400' />
            <span className='text-orange-300 font-medium'>
              Weapons Database
            </span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-white'>WEAPONS</span>{" "}
            <span className='text-orange-400'>DATABASE</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Comprehensive database of weapons with detailed stats and
            optimization tips
          </p>
        </div>

        {/* Search and Filters */}
        <div className='bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search weapons...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-orange-500 focus:outline-none'
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className='bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none'
            >
              <option value='All'>All Types</option>
              <option value='Assault Rifle'>Assault Rifle</option>
              <option value='Sniper Rifle'>Sniper Rifle</option>
              <option value='Submachine Gun'>SMG</option>
              <option value='Shotgun'>Shotgun</option>
              <option value='Light Machine Gun'>LMG</option>
              <option value='Pistol'>Pistol</option>
            </select>

            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value)}
              className='bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none'
            >
              <option value='All'>All Rarities</option>
              <option value='Common'>Common</option>
              <option value='Uncommon'>Uncommon</option>
              <option value='Rare'>Rare</option>
              <option value='Epic'>Epic</option>
              <option value='Legendary'>Legendary</option>
            </select>
          </div>
        </div>

        {/* Weapons Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredWeapons.map((weapon) => (
            <div
              key={weapon.id}
              className='bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300'
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-bold text-white'>{weapon.name}</h3>
                <span
                  className={`text-sm font-medium ${getRarityColor(
                    weapon.rarity
                  )}`}
                >
                  {weapon.rarity}
                </span>
              </div>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center gap-3'>
                  <Zap className='h-5 w-5 text-orange-400' />
                  <span className='text-gray-300'>Damage:</span>
                  <span className='text-white font-bold'>{weapon.damage}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <Target className='h-5 w-5 text-orange-400' />
                  <span className='text-gray-300'>Fire Rate:</span>
                  <span className='text-white font-bold'>
                    {weapon.fireRate} RPM
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <Shield className='h-5 w-5 text-orange-400' />
                  <span className='text-gray-300'>Magazine:</span>
                  <span className='text-white font-bold'>
                    {weapon.magazineSize}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <Sword className='h-5 w-5 text-orange-400' />
                  <span className='text-gray-300'>Range:</span>
                  <span className='text-white font-bold'>{weapon.range}</span>
                </div>
              </div>

              <div className='flex gap-2'>
                <Button
                  asChild
                  className='flex-1 bg-orange-500 hover:bg-orange-400 text-black font-bold'
                >
                  <a href={`/calculator?weapon=${weapon.id}`}>Calculate</a>
                </Button>
                <Button
                  variant='outline'
                  className='border-orange-500 text-orange-400 hover:bg-orange-500/10'
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredWeapons.length === 0 && (
          <div className='text-center py-12'>
            <Sword className='h-16 w-16 text-gray-600 mx-auto mb-4' />
            <p className='text-gray-400'>
              No weapons found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
