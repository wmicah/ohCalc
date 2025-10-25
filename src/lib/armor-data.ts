export interface SetEffect {
  tier: number
  pieces: number
  effect: string
  description: string
}

export interface Armor {
  id: string
  name: string
  gearType: "helmet" | "mask" | "torso" | "gloves" | "bottoms" | "shoes"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  image: string
  set?: string // Armor set name if part of a set
  setEffects?: SetEffect[] // Set effects for this armor set
  isKeyGear?: boolean
  stats: {
    hp: number
    pollutionResist: number
    psiIntensity: number
  }
  implementationStatus: "implemented" | "pending" | "planned"
  source?: string
}

export const armorData: Armor[] = [
  // Regular Armor Sets (Complete 6-piece sets)

  // Stormweaver Set
  {
    id: "stormweaver-hood",
    name: "Stormweaver Hood",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/stormweaver-hood.png",
    set: "Stormweaver Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "stormweaver-mask",
    name: "Stormweaver Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/stormweaver-mask.png",
    set: "Stormweaver Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "stormweaver-tops",
    name: "Stormweaver Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/stormweaver-tops.png",
    set: "Stormweaver Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "stormweaver-pants",
    name: "Stormweaver Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/stormweaver-pants.png",
    set: "Stormweaver Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "stormweaver-gloves",
    name: "Stormweaver Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/stormweaver-gloves.png",
    set: "Stormweaver Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "stormweaver-boots",
    name: "Stormweaver Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/stormweaver-boots.png",
    set: "Stormweaver Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Gravity Tide Set
  {
    id: "gravity-tide-cap",
    name: "Gravity Tide Cap",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/gravity-tide-cap.png",
    set: "Gravity Tide Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "gravity-tide-mask",
    name: "Gravity Tide Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/gravity-tide-mask.png",
    set: "Gravity Tide Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "gravity-tide-tops",
    name: "Gravity Tide Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/gravity-tide-tops.png",
    set: "Gravity Tide Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "gravity-tide-pants",
    name: "Gravity Tide Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/gravity-tide-pants.png",
    set: "Gravity Tide Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "gravity-tide-gloves",
    name: "Gravity Tide Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/gravity-tide-gloves.png",
    set: "Gravity Tide Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "gravity-tide-boots",
    name: "Gravity Tide Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/gravity-tide-boots.png",
    set: "Gravity Tide Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Treacherous Tides Set
  {
    id: "treacherous-tides-helmet",
    name: "Treacherous Tides Helmet",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/treacherous-tides-helmet.png",
    set: "Treacherous Tides Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "treacherous-tides-mask",
    name: "Treacherous Tides Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/treacherous-tides-mask.png",
    set: "Treacherous Tides Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "treacherous-tides-tops",
    name: "Treacherous Tides Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/treacherous-tides-tops.png",
    set: "Treacherous Tides Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "treacherous-tides-pants",
    name: "Treacherous Tides Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/treacherous-tides-pants.png",
    set: "Treacherous Tides Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "treacherous-tides-gloves",
    name: "Treacherous Tides Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/treacherous-tides-gloves.png",
    set: "Treacherous Tides Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "treacherous-tides-boots",
    name: "Treacherous Tides Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/treacherous-tides-boots.png",
    set: "Treacherous Tides Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Blackstone Set
  {
    id: "blackstone-helmet",
    name: "Blackstone Helmet",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/blackstone-helmet.png",
    set: "Blackstone Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "blackstone-mask",
    name: "Blackstone Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/blackstone-mask.png",
    set: "Blackstone Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "blackstone-tops",
    name: "Blackstone Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/blackstone-tops.png",
    set: "Blackstone Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "blackstone-pants",
    name: "Blackstone Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/blackstone-pants.png",
    set: "Blackstone Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "blackstone-gloves",
    name: "Blackstone Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/blackstone-gloves.png",
    set: "Blackstone Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "blackstone-boots",
    name: "Blackstone Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/blackstone-boots.png",
    set: "Blackstone Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Bastille Set
  {
    id: "bastille-hood",
    name: "Bastille Hood",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/bastille-hood.png",
    set: "Bastille Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "bastille-mask",
    name: "Bastille Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/bastille-mask.png",
    set: "Bastille Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "bastille-tops",
    name: "Bastille Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/bastille-tops.png",
    set: "Bastille Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "bastille-pants",
    name: "Bastille Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/bastille-pants.png",
    set: "Bastille Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "bastille-gloves",
    name: "Bastille Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/bastille-gloves.png",
    set: "Bastille Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "bastille-boots",
    name: "Bastille Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/bastille-boots.png",
    set: "Bastille Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Shelterer Set
  {
    id: "shelterer-hood",
    name: "Shelterer Hood",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/shelterer-hood.png",
    set: "Shelterer Set",
    setEffects: [
      {
        tier: 1,
        pieces: 1,
        effect: "status_damage_reduction",
        description: "Status DMG Reduction: 15.0%",
      },
      {
        tier: 2,
        pieces: 2,
        effect: "elemental_damage_bonus",
        description: "Element DMG (Blaze, Frost, Shock, Blast) + 8%",
      },
      {
        tier: 3,
        pieces: 3,
        effect: "deviant_energy_stacks",
        description:
          "Each weapon hit grants 1 stack of Deviant Energy. Every stack of Deviant Energy grants 1% Elemental DMG (Blaze, Frost, Shock, Blast). This effect can stack up to 20 times. Reloading removes half of the total stacks.",
      },
      {
        tier: 4,
        pieces: 4,
        effect: "deviant_energy_max_increase",
        description:
          "Increase max Deviant Energy stack by 10. Grant 2 additional stacks when hitting a weakspot.",
      },
    ],
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "shelterer-mask",
    name: "Shelterer Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/shelterer-mask.png",
    set: "Shelterer Set",
    setEffects: [
      {
        tier: 1,
        pieces: 1,
        effect: "status_damage_reduction",
        description: "Status DMG Reduction: 15.0%",
      },
      {
        tier: 2,
        pieces: 2,
        effect: "elemental_damage_bonus",
        description: "Element DMG (Blaze, Frost, Shock, Blast) + 8%",
      },
      {
        tier: 3,
        pieces: 3,
        effect: "deviant_energy_stacks",
        description:
          "Each weapon hit grants 1 stack of Deviant Energy. Every stack of Deviant Energy grants 1% Elemental DMG (Blaze, Frost, Shock, Blast). This effect can stack up to 20 times. Reloading removes half of the total stacks.",
      },
      {
        tier: 4,
        pieces: 4,
        effect: "deviant_energy_max_increase",
        description:
          "Increase max Deviant Energy stack by 10. Grant 2 additional stacks when hitting a weakspot.",
      },
    ],
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "shelterer-tops",
    name: "Shelterer Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/shelterer-tops.png",
    set: "Shelterer Set",
    setEffects: [
      {
        tier: 1,
        pieces: 1,
        effect: "status_damage_reduction",
        description: "Status DMG Reduction: 15.0%",
      },
      {
        tier: 2,
        pieces: 2,
        effect: "elemental_damage_bonus",
        description: "Element DMG (Blaze, Frost, Shock, Blast) + 8%",
      },
      {
        tier: 3,
        pieces: 3,
        effect: "deviant_energy_stacks",
        description:
          "Each weapon hit grants 1 stack of Deviant Energy. Every stack of Deviant Energy grants 1% Elemental DMG (Blaze, Frost, Shock, Blast). This effect can stack up to 20 times. Reloading removes half of the total stacks.",
      },
      {
        tier: 4,
        pieces: 4,
        effect: "deviant_energy_max_increase",
        description:
          "Increase max Deviant Energy stack by 10. Grant 2 additional stacks when hitting a weakspot.",
      },
    ],
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "shelterer-pants",
    name: "Shelterer Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/shelterer-pants.png",
    set: "Shelterer Set",
    setEffects: [
      {
        tier: 1,
        pieces: 1,
        effect: "status_damage_reduction",
        description: "Status DMG Reduction: 15.0%",
      },
      {
        tier: 2,
        pieces: 2,
        effect: "elemental_damage_bonus",
        description: "Element DMG (Blaze, Frost, Shock, Blast) + 8%",
      },
      {
        tier: 3,
        pieces: 3,
        effect: "deviant_energy_stacks",
        description:
          "Each weapon hit grants 1 stack of Deviant Energy. Every stack of Deviant Energy grants 1% Elemental DMG (Blaze, Frost, Shock, Blast). This effect can stack up to 20 times. Reloading removes half of the total stacks.",
      },
      {
        tier: 4,
        pieces: 4,
        effect: "deviant_energy_max_increase",
        description:
          "Increase max Deviant Energy stack by 10. Grant 2 additional stacks when hitting a weakspot.",
      },
    ],
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "shelterer-gloves",
    name: "Shelterer Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/shelterer-gloves.png",
    set: "Shelterer Set",
    setEffects: [
      {
        tier: 1,
        pieces: 1,
        effect: "status_damage_reduction",
        description: "Status DMG Reduction: 15.0%",
      },
      {
        tier: 2,
        pieces: 2,
        effect: "elemental_damage_bonus",
        description: "Element DMG (Blaze, Frost, Shock, Blast) + 8%",
      },
      {
        tier: 3,
        pieces: 3,
        effect: "deviant_energy_stacks",
        description:
          "Each weapon hit grants 1 stack of Deviant Energy. Every stack of Deviant Energy grants 1% Elemental DMG (Blaze, Frost, Shock, Blast). This effect can stack up to 20 times. Reloading removes half of the total stacks.",
      },
      {
        tier: 4,
        pieces: 4,
        effect: "deviant_energy_max_increase",
        description:
          "Increase max Deviant Energy stack by 10. Grant 2 additional stacks when hitting a weakspot.",
      },
    ],
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "shelterer-boots",
    name: "Shelterer Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/shelterer-boots.png",
    set: "Shelterer Set",
    setEffects: [
      {
        tier: 1,
        pieces: 1,
        effect: "status_damage_reduction",
        description: "Status DMG Reduction: 15.0%",
      },
      {
        tier: 2,
        pieces: 2,
        effect: "elemental_damage_bonus",
        description: "Element DMG (Blaze, Frost, Shock, Blast) + 8%",
      },
      {
        tier: 3,
        pieces: 3,
        effect: "deviant_energy_stacks",
        description:
          "Each weapon hit grants 1 stack of Deviant Energy. Every stack of Deviant Energy grants 1% Elemental DMG (Blaze, Frost, Shock, Blast). This effect can stack up to 20 times. Reloading removes half of the total stacks.",
      },
      {
        tier: 4,
        pieces: 4,
        effect: "deviant_energy_max_increase",
        description:
          "Increase max Deviant Energy stack by 10. Grant 2 additional stacks when hitting a weakspot.",
      },
    ],
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Savior Set
  {
    id: "savior-hood",
    name: "Savior Hood",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/savior-hood.png",
    set: "Savior Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "savior-mask",
    name: "Savior Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/savior-mask.png",
    set: "Savior Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "savior-tops",
    name: "Savior Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/savior-tops.png",
    set: "Savior Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "savior-pants",
    name: "Savior Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/savior-pants.png",
    set: "Savior Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "savior-gloves",
    name: "Savior Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/savior-gloves.png",
    set: "Savior Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "savior-boots",
    name: "Savior Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/savior-boots.png",
    set: "Savior Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Renegade Set
  {
    id: "renegade-hood",
    name: "Renegade Hood",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/renegade-hood.png",
    set: "Renegade Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "renegade-mask",
    name: "Renegade Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/renegade-mask.png",
    set: "Renegade Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "renegade-tops",
    name: "Renegade Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/renegade-tops.png",
    set: "Renegade Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "renegade-pants",
    name: "Renegade Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/renegade-pants.png",
    set: "Renegade Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "renegade-gloves",
    name: "Renegade Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/renegade-gloves.png",
    set: "Renegade Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "renegade-boots",
    name: "Renegade Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/renegade-boots.png",
    set: "Renegade Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Lonewolf Set
  {
    id: "lonewolf-hood",
    name: "Lonewolf Hood",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/lonewolf-hood.png",
    set: "Lonewolf Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "lonewolf-mask",
    name: "Lonewolf Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/lonewolf-mask.png",
    set: "Lonewolf Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "lonewolf-tops",
    name: "Lonewolf Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/lonewolf-tops.png",
    set: "Lonewolf Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "lonewolf-pants",
    name: "Lonewolf Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/lonewolf-pants.png",
    set: "Lonewolf Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "lonewolf-gloves",
    name: "Lonewolf Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/lonewolf-gloves.png",
    set: "Lonewolf Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "lonewolf-boots",
    name: "Lonewolf Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/lonewolf-boots.png",
    set: "Lonewolf Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Cage Set
  {
    id: "cage-helmet",
    name: "Cage Helmet",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/cage-helmet.png",
    set: "Cage Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "cage-mask",
    name: "Cage Mask",
    gearType: "mask",
    rarity: "legendary",
    image: "/armor/cage-mask.png",
    set: "Cage Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "cage-tops",
    name: "Cage Tops",
    gearType: "torso",
    rarity: "legendary",
    image: "/armor/cage-tops.png",
    set: "Cage Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "cage-pants",
    name: "Cage Pants",
    gearType: "bottoms",
    rarity: "legendary",
    image: "/armor/cage-pants.png",
    set: "Cage Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "cage-gloves",
    name: "Cage Gloves",
    gearType: "gloves",
    rarity: "legendary",
    image: "/armor/cage-gloves.png",
    set: "Cage Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "cage-boots",
    name: "Cage Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/cage-boots.png",
    set: "Cage Set",
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },

  // Key Armor (Helmet only pieces)
  {
    id: "gas-mask-hood",
    name: "Gas Mask Hood",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/gas-mask-hood.png",
    isKeyGear: true,
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "yellow-paint-mask",
    name: "Yellow Paint Mask",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/yellow-paint-mask.png",
    isKeyGear: true,
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "gas-tight-helmet",
    name: "Gas-tight Helmet",
    gearType: "helmet",
    rarity: "legendary",
    image: "/armor/gas-tight-helmet.png",
    isKeyGear: true,
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "pending",
  },
  {
    id: "earthly-boots",
    name: "Earthly Boots",
    gearType: "shoes",
    rarity: "legendary",
    image: "/armor/earthly-boots.png",
    isKeyGear: true,
    stats: { hp: 60, pollutionResist: 9, psiIntensity: 16 },
    implementationStatus: "implemented",
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

export const getArmorBySet = (setName: string): Armor[] => {
  return armorData.filter((armor) => armor.set === setName)
}

export const getKeyGears = (): Armor[] => {
  return armorData.filter((armor) => armor.isKeyGear)
}

export const getArmorByImplementationStatus = (
  status: Armor["implementationStatus"]
): Armor[] => {
  return armorData.filter((armor) => armor.implementationStatus === status)
}

export const getAllArmorSets = (): string[] => {
  const sets = new Set(armorData.map((armor) => armor.set).filter(Boolean))
  return Array.from(sets)
}

// Set Effects Helper Functions
export const getSetEffectsForSet = (setName: string): SetEffect[] => {
  const armor = armorData.find(
    (armor) => armor.set === setName && armor.setEffects
  )
  return armor?.setEffects || []
}

export const getActiveSetEffects = (
  selectedArmor: Record<string, string>
): {
  setName: string
  pieces: number
  activeEffects: SetEffect[]
}[] => {
  const setCounts: Record<string, number> = {}

  // Count pieces for each set
  Object.entries(selectedArmor).forEach(([gearType, armorId]) => {
    if (armorId) {
      const armor = getArmorById(armorId)
      if (armor?.set) {
        setCounts[armor.set] = (setCounts[armor.set] || 0) + 1
      }
    }
  })

  // Get active effects for each set
  const activeSets: {
    setName: string
    pieces: number
    activeEffects: SetEffect[]
  }[] = []

  Object.entries(setCounts).forEach(([setName, pieces]) => {
    const setEffects = getSetEffectsForSet(setName)
    const activeEffects = setEffects.filter((effect) => pieces >= effect.pieces)

    if (activeEffects.length > 0) {
      activeSets.push({
        setName,
        pieces,
        activeEffects,
      })
    }
  })

  return activeSets
}

export const calculateSetBonusElementalDamage = (
  selectedArmor: Record<string, string>
): number => {
  const activeSets = getActiveSetEffects(selectedArmor)
  let totalBonus = 0

  activeSets.forEach((set) => {
    set.activeEffects.forEach((effect) => {
      if (effect.effect === "elemental_damage_bonus") {
        totalBonus += 8 // +8% elemental damage bonus
      }
    })
  })

  return totalBonus
}

export const calculateSetBonusStatusDamage = (
  selectedArmor: Record<string, string>
): number => {
  const activeSets = getActiveSetEffects(selectedArmor)
  let totalBonus = 0

  activeSets.forEach((set) => {
    set.activeEffects.forEach((effect) => {
      if (effect.effect === "status_damage_bonus") {
        totalBonus += 8 // Assuming +8% status damage bonus (adjust as needed)
      }
    })
  })

  return totalBonus
}
