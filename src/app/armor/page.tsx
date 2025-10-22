"use client"

import { useState } from "react"
import { Shield, Search, Filter, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock armor data
const armorPieces = [
  {
    id: 1,
    name: "Combat Helmet",
    type: "Head",
    armorValue: 25,
    durability: 100,
    weight: 2.5,
    rarity: "Common",
    resistances: {
      ballistic: 15,
      energy: 10,
      explosive: 5,
    },
  },
  {
    id: 2,
    name: "Tactical Vest",
    type: "Chest",
    armorValue: 45,
    durability: 100,
    weight: 4.2,
    rarity: "Uncommon",
    resistances: {
      ballistic: 25,
      energy: 15,
      explosive: 10,
    },
  },
  {
    id: 3,
    name: "Reinforced Leg Guards",
    type: "Legs",
    armorValue: 30,
    durability: 100,
    weight: 3.8,
    rarity: "Rare",
    resistances: {
      ballistic: 20,
      energy: 12,
      explosive: 8,
    },
  },
  {
    id: 4,
    name: "Combat Boots",
    type: "Feet",
    armorValue: 15,
    durability: 100,
    weight: 1.5,
    rarity: "Common",
    resistances: {
      ballistic: 8,
      energy: 5,
      explosive: 3,
    },
  },
  {
    id: 5,
    name: "Power Armor Suit",
    type: "Full Body",
    armorValue: 120,
    durability: 100,
    weight: 25.0,
    rarity: "Legendary",
    resistances: {
      ballistic: 50,
      energy: 40,
      explosive: 30,
    },
  },
]

export default function ArmorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterRarity, setFilterRarity] = useState("All")

  const filteredArmor = armorPieces.filter((armor) => {
    const matchesSearch = armor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = filterType === "All" || armor.type === filterType
    const matchesRarity =
      filterRarity === "All" || armor.rarity === filterRarity
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
            <Shield className='h-5 w-5 text-orange-400' />
            <span className='text-orange-300 font-medium'>Armor Database</span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-white'>ARMOR</span>{" "}
            <span className='text-orange-400'>ANALYSIS</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Analyze armor effectiveness and penetration values for optimal
            protection
          </p>
        </div>

        {/* Search and Filters */}
        <div className='bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search armor...'
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
              <option value='Head'>Head</option>
              <option value='Chest'>Chest</option>
              <option value='Legs'>Legs</option>
              <option value='Feet'>Feet</option>
              <option value='Full Body'>Full Body</option>
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

        {/* Armor Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredArmor.map((armor) => (
            <div
              key={armor.id}
              className='bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300'
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-bold text-white'>{armor.name}</h3>
                <span
                  className={`text-sm font-medium ${getRarityColor(
                    armor.rarity
                  )}`}
                >
                  {armor.rarity}
                </span>
              </div>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center gap-3'>
                  <Shield className='h-5 w-5 text-orange-400' />
                  <span className='text-gray-300'>Armor Value:</span>
                  <span className='text-white font-bold'>
                    {armor.armorValue}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <Target className='h-5 w-5 text-orange-400' />
                  <span className='text-gray-300'>Type:</span>
                  <span className='text-white font-bold'>{armor.type}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <Zap className='h-5 w-5 text-orange-400' />
                  <span className='text-gray-300'>Weight:</span>
                  <span className='text-white font-bold'>{armor.weight}kg</span>
                </div>
              </div>

              {/* Resistances */}
              <div className='mb-6'>
                <h4 className='text-sm font-bold text-gray-300 mb-3'>
                  Resistances
                </h4>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>Ballistic:</span>
                    <span className='text-white'>
                      {armor.resistances.ballistic}%
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>Energy:</span>
                    <span className='text-white'>
                      {armor.resistances.energy}%
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-400'>Explosive:</span>
                    <span className='text-white'>
                      {armor.resistances.explosive}%
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex gap-2'>
                <Button
                  asChild
                  className='flex-1 bg-orange-500 hover:bg-orange-400 text-black font-bold'
                >
                  <a href={`/calculator?armor=${armor.id}`}>Calculate</a>
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

        {filteredArmor.length === 0 && (
          <div className='text-center py-12'>
            <Shield className='h-16 w-16 text-gray-600 mx-auto mb-4' />
            <p className='text-gray-400'>
              No armor found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
