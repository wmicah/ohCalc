// Damage calculation utilities for Once Human
export interface DamageCalculationInput {
	weaponDamage: number
	fireRate: number
	magazineSize: number
	reloadTime: number
	armorValue: number
	criticalChance?: number
	criticalMultiplier?: number
}

export interface DamageCalculationResult {
	dps: number
	burstDPS: number
	sustainedDPS: number
	effectiveDamage: number
	effectiveDPS: number
	timeToKill: number
	bulletsToKill: number
}

export function calculateDamage(
	input: DamageCalculationInput
): DamageCalculationResult {
	const {
		weaponDamage,
		fireRate,
		magazineSize,
		reloadTime,
		armorValue,
		criticalChance = 0.1, // 10% default crit chance
		criticalMultiplier = 2.0, // 2x damage on crit
	} = input

	// Basic DPS calculation
	const dps = weaponDamage * (fireRate / 60) // Convert RPM to per-second

	// Burst DPS (damage per magazine)
	const burstDPS = weaponDamage * magazineSize

	// Sustained DPS (including reload time)
	const magazineTime = magazineSize / (fireRate / 60)
	const totalCycleTime = magazineTime + reloadTime
	const sustainedDPS = (weaponDamage * magazineSize) / totalCycleTime

	// Effective damage (after armor reduction)
	const effectiveDamage = Math.max(1, weaponDamage - armorValue)

	// Effective DPS (after armor)
	const effectiveDPS = effectiveDamage * (fireRate / 60)

	// Time to kill calculation (assuming 100 HP target)
	const targetHP = 100
	const timeToKill = targetHP / effectiveDPS

	// Bullets to kill
	const bulletsToKill = Math.ceil(targetHP / effectiveDamage)

	return {
		dps: Math.round(dps * 100) / 100,
		burstDPS: Math.round(burstDPS * 100) / 100,
		sustainedDPS: Math.round(sustainedDPS * 100) / 100,
		effectiveDamage: Math.round(effectiveDamage * 100) / 100,
		effectiveDPS: Math.round(effectiveDPS * 100) / 100,
		timeToKill: Math.round(timeToKill * 100) / 100,
		bulletsToKill,
	}
}

export function calculateArmorEffectiveness(
	armorValue: number,
	damage: number
): number {
	// Simple armor calculation - reduces damage by armor value
	return Math.max(1, damage - armorValue)
}

export function calculateResistanceDamage(
	baseDamage: number,
	resistance: number
): number {
	// Resistance reduces damage by percentage
	return baseDamage * (1 - resistance / 100)
}
