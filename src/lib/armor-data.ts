export interface Armor {
  id: string
  name: string
  gearType: "helmet" | "mask" | "torso" | "gloves" | "bottoms" | "shoes"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  image: string
  stats: {
    [key: string]: number
  }
  perks?: string[]
  isKeyArmor?: boolean
}

export const armorData: Armor[] = [
  // Helmet Armors
  {
    id: "combat-helmet",
    name: "Combat Helmet",
    gearType: "helmet",
    rarity: "common",
    image: "/armor/combat-helmet.png",
    stats: {
      defense: 50,
      hp: 100,
    },
  },
  {
    id: "tactical-helmet",
    name: "Tactical Helmet",
    gearType: "helmet",
    rarity: "uncommon",
    image: "/armor/tactical-helmet.png",
    stats: {
      defense: 75,
      hp: 150,
      critRate: 5,
    },
  },
  {
    id: "assault-helmet",
    name: "Assault Helmet",
    gearType: "helmet",
    rarity: "rare",
    image: "/armor/assault-helmet.png",
    stats: {
      defense: 100,
      hp: 200,
      critRate: 8,
      weaponDamage: 10,
    },
  },
  {
    id: "elite-helmet",
    name: "Elite Helmet",
    gearType: "helmet",
    rarity: "epic",
    image: "/armor/elite-helmet.png",
    stats: {
      defense: 125,
      hp: 250,
      critRate: 12,
      weaponDamage: 15,
      elementalDamage: 10,
    },
  },
  {
    id: "legendary-helmet",
    name: "Legendary Helmet",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/legendary-helmet.png",
    stats: {
      defense: 150,
      hp: 300,
      critRate: 15,
      weaponDamage: 20,
      elementalDamage: 15,
      statusDamage: 10,
    },
  },

  // Mask Armors
  {
    id: "combat-mask",
    name: "Combat Mask",
    gearType: "mask",
    rarity: "common",
    image: "/armor/combat-mask.png",
    stats: {
      defense: 40,
      hp: 80,
    },
  },
  {
    id: "tactical-mask",
    name: "Tactical Mask",
    gearType: "mask",
    rarity: "uncommon",
    image: "/armor/tactical-mask.png",
    stats: {
      defense: 60,
      hp: 120,
      statusDamage: 8,
    },
  },
  {
    id: "assault-mask",
    name: "Assault Mask",
    gearType: "mask",
    rarity: "rare",
    image: "/armor/assault-mask.png",
    stats: {
      defense: 80,
      hp: 160,
      statusDamage: 12,
      elementalDamage: 8,
    },
  },
  {
    id: "elite-mask",
    name: "Elite Mask",
    gearType: "mask",
    rarity: "epic",
    image: "/armor/elite-mask.png",
    stats: {
      defense: 100,
      hp: 200,
      statusDamage: 16,
      elementalDamage: 12,
      critDamage: 15,
    },
  },
  {
    id: "legendary-mask",
    name: "Legendary Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/legendary-mask.png",
    stats: {
      defense: 120,
      hp: 240,
      statusDamage: 20,
      elementalDamage: 16,
      critDamage: 20,
      weaponDamage: 12,
    },
  },

  // Torso Armors
  {
    id: "combat-vest",
    name: "Combat Vest",
    gearType: "torso",
    rarity: "common",
    image: "/armor/combat-vest.png",
    stats: {
      defense: 100,
      hp: 200,
    },
  },
  {
    id: "tactical-vest",
    name: "Tactical Vest",
    gearType: "torso",
    rarity: "uncommon",
    image: "/armor/tactical-vest.png",
    stats: {
      defense: 150,
      hp: 300,
      damageReduction: 5,
    },
  },
  {
    id: "assault-vest",
    name: "Assault Vest",
    gearType: "torso",
    rarity: "rare",
    image: "/armor/assault-vest.png",
    stats: {
      defense: 200,
      hp: 400,
      damageReduction: 8,
      weaponDamage: 12,
    },
  },
  {
    id: "elite-vest",
    name: "Elite Vest",
    gearType: "torso",
    rarity: "epic",
    image: "/armor/elite-vest.png",
    stats: {
      defense: 250,
      hp: 500,
      damageReduction: 12,
      weaponDamage: 18,
      elementalDamage: 12,
    },
  },
  {
    id: "legendary-vest",
    name: "Legendary Vest",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/legendary-vest.png",
    stats: {
      defense: 300,
      hp: 600,
      damageReduction: 15,
      weaponDamage: 24,
      elementalDamage: 18,
      statusDamage: 15,
    },
  },

  // Gloves Armors
  {
    id: "combat-gloves",
    name: "Combat Gloves",
    gearType: "gloves",
    rarity: "common",
    image: "/armor/combat-gloves.png",
    stats: {
      defense: 30,
      hp: 60,
    },
  },
  {
    id: "tactical-gloves",
    name: "Tactical Gloves",
    gearType: "gloves",
    rarity: "uncommon",
    image: "/armor/tactical-gloves.png",
    stats: {
      defense: 45,
      hp: 90,
      critRate: 8,
    },
  },
  {
    id: "assault-gloves",
    name: "Assault Gloves",
    gearType: "gloves",
    rarity: "rare",
    image: "/armor/assault-gloves.png",
    stats: {
      defense: 60,
      hp: 120,
      critRate: 12,
      weaponDamage: 8,
    },
  },
  {
    id: "elite-gloves",
    name: "Elite Gloves",
    gearType: "gloves",
    rarity: "epic",
    image: "/armor/elite-gloves.png",
    stats: {
      defense: 75,
      hp: 150,
      critRate: 16,
      weaponDamage: 12,
      elementalDamage: 10,
    },
  },
  {
    id: "legendary-gloves",
    name: "Legendary Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/legendary-gloves.png",
    stats: {
      defense: 90,
      hp: 180,
      critRate: 20,
      weaponDamage: 16,
      elementalDamage: 14,
      statusDamage: 12,
    },
  },

  // Bottoms Armors
  {
    id: "combat-pants",
    name: "Combat Pants",
    gearType: "bottoms",
    rarity: "common",
    image: "/armor/combat-pants.png",
    stats: {
      defense: 60,
      hp: 120,
    },
  },
  {
    id: "tactical-pants",
    name: "Tactical Pants",
    gearType: "bottoms",
    rarity: "uncommon",
    image: "/armor/tactical-pants.png",
    stats: {
      defense: 90,
      hp: 180,
      movementSpeed: 5,
    },
  },
  {
    id: "assault-pants",
    name: "Assault Pants",
    gearType: "bottoms",
    rarity: "rare",
    image: "/armor/assault-pants.png",
    stats: {
      defense: 120,
      hp: 240,
      movementSpeed: 8,
      weaponDamage: 10,
    },
  },
  {
    id: "elite-pants",
    name: "Elite Pants",
    gearType: "bottoms",
    rarity: "epic",
    image: "/armor/elite-pants.png",
    stats: {
      defense: 150,
      hp: 300,
      movementSpeed: 12,
      weaponDamage: 15,
      elementalDamage: 10,
    },
  },
  {
    id: "legendary-pants",
    name: "Legendary Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/legendary-pants.png",
    stats: {
      defense: 180,
      hp: 360,
      movementSpeed: 15,
      weaponDamage: 20,
      elementalDamage: 15,
      statusDamage: 12,
    },
  },

  // Shoes Armors
  {
    id: "combat-boots",
    name: "Combat Boots",
    gearType: "shoes",
    rarity: "common",
    image: "/armor/combat-boots.png",
    stats: {
      defense: 40,
      hp: 80,
    },
  },
  {
    id: "tactical-boots",
    name: "Tactical Boots",
    gearType: "shoes",
    rarity: "uncommon",
    image: "/armor/tactical-boots.png",
    stats: {
      defense: 60,
      hp: 120,
      movementSpeed: 8,
    },
  },
  {
    id: "assault-boots",
    name: "Assault Boots",
    gearType: "shoes",
    rarity: "rare",
    image: "/armor/assault-boots.png",
    stats: {
      defense: 80,
      hp: 160,
      movementSpeed: 12,
      weaponDamage: 8,
    },
  },
  {
    id: "elite-boots",
    name: "Elite Boots",
    gearType: "shoes",
    rarity: "epic",
    image: "/armor/elite-boots.png",
    stats: {
      defense: 100,
      hp: 200,
      movementSpeed: 16,
      weaponDamage: 12,
      elementalDamage: 8,
    },
  },
  {
    id: "legendary-boots",
    name: "Legendary Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/legendary-boots.png",
    stats: {
      defense: 120,
      hp: 240,
      movementSpeed: 20,
      weaponDamage: 16,
      elementalDamage: 12,
      statusDamage: 10,
    },
  },
]

// Helper functions
export const getArmorByGearType = (gearType: Armor["gearType"]): Armor[] => {
  return armorData.filter((armor) => armor.gearType === gearType)
}

export const getArmorById = (id: string): Armor | undefined => {
  return armorData.find((armor) => armor.id === id)
}

export const getArmorByRarity = (rarity: Armor["rarity"]): Armor[] => {
  return armorData.filter((armor) => armor.rarity === rarity)
}
