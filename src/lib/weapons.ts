// Once Human weapon data
export interface Weapon {
	id: number
	name: string
	type: string
	damage: number
	fireRate: number
	magazineSize: number
	reloadTime: number
	range: string
	rarity: string
	description?: string
	imageUrl?: string
}

export const weapons: Weapon[] = [
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
		description:
			"Reliable and versatile assault rifle with good damage and fire rate.",
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
		description: "High-damage sniper rifle perfect for long-range engagements.",
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
		description: "Fast-firing SMG ideal for close-quarters combat.",
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
		description: "Devastating close-range weapon with high damage per shot.",
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
		description: "Heavy machine gun with sustained fire capability.",
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
		description: "Reliable sidearm with decent damage and fast reload.",
	},
]

export function getWeaponById(id: number): Weapon | undefined {
	return weapons.find((weapon) => weapon.id === id)
}

export function getWeaponsByType(type: string): Weapon[] {
	return weapons.filter((weapon) => weapon.type === type)
}

export function getWeaponsByRarity(rarity: string): Weapon[] {
	return weapons.filter((weapon) => weapon.rarity === rarity)
}
