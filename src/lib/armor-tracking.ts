// Armor Implementation Tracking System
// Based on Game8.co Once Human armor data

export interface ArmorPiece {
  id: string
  name: string
  gearType: "helmet" | "mask" | "torso" | "gloves" | "bottoms" | "shoes"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  set?: string // Armor set name if part of a set
  isKeyGear?: boolean
  stats: {
    hp: number
    pollutionResist: number
    psiIntensity: number
  }
  implementationStatus: "implemented" | "pending" | "planned"
  source: string // URL or reference to Game8 data
}

export interface ArmorSet {
  id: string
  name: string
  pieces: string[] // Armor piece IDs
  setBonus?: string // Set bonus description
  implementationStatus: "implemented" | "pending" | "planned"
}

export interface ModTracking {
  id: string
  name: string
  gearType:
    | "helmet"
    | "mask"
    | "torso"
    | "gloves"
    | "bottoms"
    | "shoes"
    | "weapon"
  implementationStatus: "implemented" | "pending" | "planned"
  source: string
}

export interface KeyGearTracking {
  id: string
  name: string
  gearType: "helmet" | "mask" | "torso" | "gloves" | "bottoms" | "shoes"
  specialEffect: string
  implementationStatus: "implemented" | "pending" | "planned"
  source: string
}

// Implementation Status Summary
export const implementationStatus = {
  armorPieces: {
    total: 0,
    implemented: 0,
    pending: 0,
    planned: 0,
  },
  armorSets: {
    total: 0,
    implemented: 0,
    pending: 0,
    planned: 0,
  },
  mods: {
    total: 0,
    implemented: 0,
    pending: 0,
    planned: 0,
  },
  keyGears: {
    total: 0,
    implemented: 0,
    pending: 0,
    planned: 0,
  },
}

// Armor Sets from Game8 data
export const armorSets: ArmorSet[] = [
  // Regular Armor Sets (Complete 6-piece sets)
  {
    id: "stormweaver-set",
    name: "Stormweaver Set",
    pieces: [
      "stormweaver-hood",
      "stormweaver-mask",
      "stormweaver-tops",
      "stormweaver-pants",
      "stormweaver-gloves",
      "stormweaver-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "gravity-tide-set",
    name: "Gravity Tide Set",
    pieces: [
      "gravity-tide-cap",
      "gravity-tide-mask",
      "gravity-tide-tops",
      "gravity-tide-pants",
      "gravity-tide-gloves",
      "gravity-tide-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "treacherous-tides-set",
    name: "Treacherous Tides Set",
    pieces: [
      "treacherous-tides-helmet",
      "treacherous-tides-mask",
      "treacherous-tides-tops",
      "treacherous-tides-pants",
      "treacherous-tides-gloves",
      "treacherous-tides-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "blackstone-set",
    name: "Blackstone Set",
    pieces: [
      "blackstone-helmet",
      "blackstone-mask",
      "blackstone-tops",
      "blackstone-pants",
      "blackstone-gloves",
      "blackstone-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "bastille-set",
    name: "Bastille Set",
    pieces: [
      "bastille-hood",
      "bastille-mask",
      "bastille-tops",
      "bastille-pants",
      "bastille-gloves",
      "bastille-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "shelterer-set",
    name: "Shelterer Set",
    pieces: [
      "shelterer-hood",
      "shelterer-mask",
      "shelterer-tops",
      "shelterer-pants",
      "shelterer-gloves",
      "shelterer-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "savior-set",
    name: "Savior Set",
    pieces: [
      "savior-hood",
      "savior-mask",
      "savior-tops",
      "savior-pants",
      "savior-gloves",
      "savior-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "renegade-set",
    name: "Renegade Set",
    pieces: [
      "renegade-hood",
      "renegade-mask",
      "renegade-tops",
      "renegade-pants",
      "renegade-gloves",
      "renegade-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "lonewolf-set",
    name: "Lonewolf Set",
    pieces: [
      "lonewolf-hood",
      "lonewolf-mask",
      "lonewolf-tops",
      "lonewolf-pants",
      "lonewolf-gloves",
      "lonewolf-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
  {
    id: "cage-set",
    name: "Cage Set",
    pieces: [
      "cage-helmet",
      "cage-mask",
      "cage-tops",
      "cage-pants",
      "cage-gloves",
      "cage-boots",
    ],
    setBonus: "Legendary set bonus - TBD",
    implementationStatus: "pending",
  },
]

// Key Gears from Game8 data
export const keyGears: KeyGearTracking[] = [
  // Key Armor (Helmet only pieces)
  {
    id: "gas-mask-hood",
    name: "Gas Mask Hood",
    gearType: "helmet",
    specialEffect: "Key gear special effect - TBD",
    implementationStatus: "pending",
    source: "Game8.co",
  },
  {
    id: "yellow-paint-mask",
    name: "Yellow Paint Mask",
    gearType: "helmet",
    specialEffect: "Key gear special effect - TBD",
    implementationStatus: "pending",
    source: "Game8.co",
  },
  {
    id: "gas-tight-helmet",
    name: "Gas-tight Helmet",
    gearType: "helmet",
    specialEffect: "Key gear special effect - TBD",
    implementationStatus: "pending",
    source: "Game8.co",
  },
  // Legacy key gears (from previous implementation)
  {
    id: "fire-rune-boots",
    name: "Fire Rune Boots",
    gearType: "shoes",
    specialEffect: "Key gear special effect - TBD",
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480973",
  },
  {
    id: "snow-camo-gloves",
    name: "Snow Camo Gloves",
    gearType: "gloves",
    specialEffect: "Key gear special effect - TBD",
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480968",
  },
]

// Armor Pieces from Game8 data (Way of Winter)
export const armorPieces: ArmorPiece[] = [
  // Blackstone Set (Legendary)
  {
    id: "blackstone-helmet",
    name: "Blackstone Helmet",
    gearType: "helmet",
    rarity: "legendary",
    set: "Blackstone Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480962",
  },
  {
    id: "blackstone-mask",
    name: "Blackstone Mask",
    gearType: "mask",
    rarity: "legendary",
    set: "Blackstone Set",
    stats: { hp: 30, pollutionResist: 12, psiIntensity: 20 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480964",
  },
  {
    id: "blackstone-tops",
    name: "Blackstone Tops",
    gearType: "torso",
    rarity: "legendary",
    set: "Blackstone Set",
    stats: { hp: 156, pollutionResist: 12, psiIntensity: 11 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480966",
  },
  {
    id: "blackstone-pants",
    name: "Blackstone Pants",
    gearType: "bottoms",
    rarity: "legendary",
    set: "Blackstone Set",
    stats: { hp: 144, pollutionResist: 9, psiIntensity: 13 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480971",
  },
  {
    id: "blackstone-gloves",
    name: "Blackstone Gloves",
    gearType: "gloves",
    rarity: "legendary",
    set: "Blackstone Set",
    stats: { hp: 90, pollutionResist: 9, psiIntensity: 12 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480969",
  },
  {
    id: "blackstone-boots",
    name: "Blackstone Boots",
    gearType: "shoes",
    rarity: "legendary",
    set: "Blackstone Set",
    stats: { hp: 120, pollutionResist: 9, psiIntensity: 8 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480974",
  },

  // Snow Panther Set (Epic)
  {
    id: "snow-panther-hat",
    name: "Snow Panther Hat",
    gearType: "helmet",
    rarity: "epic",
    set: "Snow Panther Set",
    stats: { hp: 54, pollutionResist: 9, psiIntensity: 14 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480961",
  },
  {
    id: "snow-panther-mask",
    name: "Snow Panther Mask",
    gearType: "mask",
    rarity: "epic",
    set: "Snow Panther Set",
    stats: { hp: 27, pollutionResist: 12, psiIntensity: 18 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480963",
  },
  {
    id: "snow-panther-tops",
    name: "Snow Panther Tops",
    gearType: "torso",
    rarity: "epic",
    set: "Snow Panther Set",
    stats: { hp: 140, pollutionResist: 12, psiIntensity: 10 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480965",
  },
  {
    id: "snow-panther-pants",
    name: "Snow Panther Pants",
    gearType: "bottoms",
    rarity: "epic",
    set: "Snow Panther Set",
    stats: { hp: 130, pollutionResist: 9, psiIntensity: 12 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480970",
  },
  {
    id: "snow-panther-gloves",
    name: "Snow Panther Gloves",
    gearType: "gloves",
    rarity: "epic",
    set: "Snow Panther Set",
    stats: { hp: 81, pollutionResist: 9, psiIntensity: 11 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480967",
  },
  {
    id: "snow-panther-shoes",
    name: "Snow Panther Shoes",
    gearType: "shoes",
    rarity: "epic",
    set: "Snow Panther Set",
    stats: { hp: 108, pollutionResist: 9, psiIntensity: 7 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480972",
  },

  // Key Gears
  {
    id: "fire-rune-boots",
    name: "Fire Rune Boots",
    gearType: "shoes",
    rarity: "legendary",
    isKeyGear: true,
    stats: { hp: 120, pollutionResist: 9, psiIntensity: 8 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480973",
  },
  {
    id: "snow-camo-gloves",
    name: "Snow Camo Gloves",
    gearType: "gloves",
    rarity: "legendary",
    isKeyGear: true,
    stats: { hp: 90, pollutionResist: 9, psiIntensity: 12 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/480968",
  },

  // Main game armor (sample from Game8 data)
  {
    id: "rustic-hat",
    name: "Rustic Hat",
    gearType: "helmet",
    rarity: "common",
    set: "Rustic Set",
    stats: { hp: 42, pollutionResist: 9, psiIntensity: 11 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/462818",
  },
  {
    id: "cage-helmet",
    name: "Cage Helmet",
    gearType: "helmet",
    rarity: "legendary",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
    source: "https://game8.co/games/Once-Human/archives/463207",
  },
]

// Helper functions
export const getArmorBySet = (setName: string): ArmorPiece[] => {
  return armorPieces.filter((armor) => armor.set === setName)
}

export const getKeyGears = (): ArmorPiece[] => {
  return armorPieces.filter((armor) => armor.isKeyGear)
}

export const getArmorByRarity = (
  rarity: ArmorPiece["rarity"]
): ArmorPiece[] => {
  return armorPieces.filter((armor) => armor.rarity === rarity)
}

export const getImplementationStatus = () => {
  const armorStats = armorPieces.reduce(
    (acc, armor) => {
      acc.total++
      acc[armor.implementationStatus]++
      return acc
    },
    { total: 0, implemented: 0, pending: 0, planned: 0 }
  )

  const setStats = armorSets.reduce(
    (acc, set) => {
      acc.total++
      acc[set.implementationStatus]++
      return acc
    },
    { total: 0, implemented: 0, pending: 0, planned: 0 }
  )

  return {
    armorPieces: armorStats,
    armorSets: setStats,
    mods: { total: 0, implemented: 0, pending: 0, planned: 0 }, // To be updated
    keyGears: { total: 0, implemented: 0, pending: 0, planned: 0 }, // To be updated
  }
}
