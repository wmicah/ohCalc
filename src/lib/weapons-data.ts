export interface Weapon {
  id: string
  name: string
  type:
    | "assault_rifle"
    | "shotgun"
    | "sniper"
    | "pistol"
    | "smg"
    | "lmg"
    | "elemental"
  damageType: "normal" | "elemental"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  image: string
  description: string
  baseStats: {
    attack: number
    fireRate: number
    magazineSize: number
    reloadTime: number
    range: number
  }
  damageStats: {
    weaponDamageBonus?: number
    critDamage?: number
    weakspotDamage?: number
    enemyBonus?: number
  }
  elementalStats?: {
    psi?: number
    elemental?: number
    statusDamage?: number
  }
  specialAbilities?: string[]
  unlockLevel?: number
}

export const weaponsData: Weapon[] = [
  {
    id: "kvd-boom-boom",
    name: "KVD - Boom! Boom!",
    type: "lmg",
    damageType: "elemental",
    rarity: "legendary",
    image: "/weapons/kvd boom boom.png",
    description:
      "Light Machine Gun with Rapid Shot Style. Features explosive AoE damage and burn effects that make it devastating against groups of enemies.",
    baseStats: {
      attack: 447,
      fireRate: 500, // RPM
      magazineSize: 120,
      reloadTime: 3.5,
      range: 25,
    },
    damageStats: {
      weaponDamageBonus: 0,
      critDamage: 30,
      weakspotDamage: 40,
      enemyBonus: 0,
    },
    elementalStats: {
      psi: 300,
      elemental: 30,
      statusDamage: 0,
    },
    specialAbilities: [
      "18% chance to trigger Burn on hit",
      "Hitting a target triggers an explosion, dealing 300% Psi Intensity AoE Blaze DMG, with a cooldown of 2s (40% DMG against Meta-Humans)",
      "This explosion will apply 1 stacks of Burn to non-Meta-Human units",
      "Blaze DMG +30%",
    ],
    unlockLevel: 40,
  },
  // Add more weapons here as you create them
]

// Helper functions for weapon data
export const getWeaponById = (id: string): Weapon | undefined => {
  return weaponsData.find((weapon) => weapon.id === id)
}

export const getWeaponsByType = (type: Weapon["type"]): Weapon[] => {
  return weaponsData.filter((weapon) => weapon.type === type)
}

export const getWeaponsByRarity = (rarity: Weapon["rarity"]): Weapon[] => {
  return weaponsData.filter((weapon) => weapon.rarity === rarity)
}

export const getWeaponsByDamageType = (
  damageType: Weapon["damageType"]
): Weapon[] => {
  return weaponsData.filter((weapon) => weapon.damageType === damageType)
}
