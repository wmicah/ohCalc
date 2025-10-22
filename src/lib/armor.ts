// Once Human armor data
export interface Armor {
	id: number
	name: string
	type: string
	armorValue: number
	durability: number
	weight: number
	rarity: string
	resistances: {
		ballistic: number
		energy: number
		explosive: number
	}
	description?: string
	imageUrl?: string
}

export const armorPieces: Armor[] = [
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
		description: "Standard military helmet providing basic head protection.",
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
		description: "Tactical body armor with good ballistic protection.",
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
		description: "Heavy leg protection with reinforced plating.",
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
		description: "Sturdy boots with basic foot protection.",
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
		description: "Advanced powered exoskeleton providing maximum protection.",
	},
]

export function getArmorById(id: number): Armor | undefined {
	return armorPieces.find((armor) => armor.id === id)
}

export function getArmorByType(type: string): Armor[] {
	return armorPieces.filter((armor) => armor.type === type)
}

export function getArmorByRarity(rarity: string): Armor[] {
	return armorPieces.filter((armor) => armor.rarity === rarity)
}
