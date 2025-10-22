/**
 * Once Human Damage Calculation Formulas
 *
 * This file contains all the damage calculation formulas for different weapon types
 * and damage scenarios in Once Human.
 */

export interface WeaponStats {
	attack: number
	weaponDamageBonus: number
	critDamage: number
	weakspotDamage: number
	enemyBonus: number
}

export interface ElementalStats {
	psi: number
	elemental: number
	statusDamage: number
	enemyBonus: number
}

export interface TargetStats {
	armor: number
	elementalResistance?: number
}

/**
 * ELEMENTAL WEAPONS
 * Elemental damage calculation for weapons that deal elemental damage
 */
export class ElementalWeaponCalculator {
	/**
	 * Calculate base elemental damage with step-by-step breakdown
	 * Formula: (psi + elemental + status damage) * (1 + enemy bonus / 100)
	 */
	static calculateElementalDamage(stats: ElementalStats): {
		result: number
		steps: string[]
	} {
		const baseDamage = stats.psi + stats.elemental + stats.statusDamage
		const enemyBonusDecimal = stats.enemyBonus / 100
		const result = Math.round(baseDamage * (1 + enemyBonusDecimal))

		const steps = [
			`=== ELEMENTAL DAMAGE CALCULATION ===`,
			`Step 1: Add all elemental damage sources`,
			`   → psi(${stats.psi}) + elemental(${stats.elemental}) + statusDamage(${stats.statusDamage})`,
			`   → ${stats.psi} + ${stats.elemental} + ${stats.statusDamage}`,
			`   → ${baseDamage} (base elemental damage)`,
			``,
			`Step 2: Apply enemy bonus multiplier`,
			`   → ${baseDamage} × (1 + enemyBonus(${stats.enemyBonus}%))`,
			`   → ${baseDamage} × (1 + ${stats.enemyBonus / 100})`,
			`   → ${baseDamage} × ${1 + stats.enemyBonus / 100} = ${result}`,
			``,
			`=== FINAL RESULT ===`,
			`Total Elemental Damage: ${result}`,
		]

		return { result, steps }
	}

	/**
	 * Calculate elemental damage with armor reduction
	 */
	static calculateElementalDamageWithArmor(
		stats: ElementalStats,
		targetArmor: number
	): number {
		const baseDamage = this.calculateElementalDamage(stats)
		return Math.max(1, baseDamage - targetArmor)
	}
}

/**
 * NORMAL WEAPONS
 * Physical damage calculation for standard weapons
 */
export class NormalWeaponCalculator {
	/**
	 * Calculate base weapon damage with step-by-step breakdown
	 * Formula: attack * (1 + weapon damage bonus / 100) * (1 + enemy bonus / 100)
	 */
	static calculateBaseDamage(stats: WeaponStats): {
		result: number
		steps: string[]
	} {
		const weaponBonusDecimal = stats.weaponDamageBonus / 100
		const enemyBonusDecimal = stats.enemyBonus / 100
		const result = Math.round(
			stats.attack * (1 + weaponBonusDecimal) * (1 + enemyBonusDecimal)
		)

		const steps = [
			`${stats.attack} × (1 + ${stats.weaponDamageBonus}%) × (1 + ${stats.enemyBonus}%)`,
			`${stats.attack} × ${1 + weaponBonusDecimal} × ${1 + enemyBonusDecimal}`,
			`= ${result}`,
		]

		return { result, steps }
	}

	/**
	 * Calculate crit damage with step-by-step breakdown
	 * Formula: base damage * (1 + crit damage / 100)
	 */
	static calculateCritDamage(stats: WeaponStats): {
		result: number
		steps: string[]
	} {
		const baseResult = this.calculateBaseDamage(stats)
		const critDecimal = stats.critDamage / 100
		const result = Math.round(baseResult.result * (1 + critDecimal))

		const steps = [
			`${baseResult.result} × (1 + ${stats.critDamage}%)`,
			`${baseResult.result} × ${1 + critDecimal}`,
			`= ${result}`,
		]

		return { result, steps }
	}

	/**
	 * Calculate weakspot damage with step-by-step breakdown
	 * Formula: base damage * (1 + weakspot damage / 100)
	 */
	static calculateWeakspotDamage(stats: WeaponStats): {
		result: number
		steps: string[]
	} {
		const baseResult = this.calculateBaseDamage(stats)
		const weakspotDecimal = stats.weakspotDamage / 100
		const result = Math.round(baseResult.result * (1 + weakspotDecimal))

		const steps = [
			`${baseResult.result} × (1 + ${stats.weakspotDamage}%)`,
			`${baseResult.result} × ${1 + weakspotDecimal}`,
			`= ${result}`,
		]

		return { result, steps }
	}

	/**
	 * Calculate crit weakspot damage with step-by-step breakdown
	 * Formula: base damage * (1 + crit damage / 100) * (1 + weakspot damage / 100)
	 */
	static calculateCritWeakspotDamage(stats: WeaponStats): {
		result: number
		steps: string[]
	} {
		const baseResult = this.calculateBaseDamage(stats)
		const critDecimal = stats.critDamage / 100
		const weakspotDecimal = stats.weakspotDamage / 100
		const critMultiplier = 1 + critDecimal
		const weakspotMultiplier = 1 + weakspotDecimal
		const result = Math.round(
			baseResult.result * critMultiplier * weakspotMultiplier
		)

		const steps = [
			`${baseResult.result} × (1 + ${stats.critDamage}%) × (1 + ${stats.weakspotDamage}%)`,
			`${baseResult.result} × ${critMultiplier} × ${weakspotMultiplier}`,
			`= ${result}`,
		]

		return { result, steps }
	}

	/**
	 * Calculate damage with armor reduction
	 */
	static calculateDamageWithArmor(damage: number, targetArmor: number): number {
		return Math.max(1, damage - targetArmor)
	}
}

/**
 * COMBINED CALCULATOR
 * Handles both weapon types and provides comprehensive damage calculations
 */
export class DamageCalculator {
	/**
	 * Calculate all damage scenarios for normal weapons with step-by-step breakdown
	 */
	static calculateNormalWeaponDamage(
		weaponStats: WeaponStats,
		targetArmor: number
	) {
		const baseResult = NormalWeaponCalculator.calculateBaseDamage(weaponStats)
		const critResult = NormalWeaponCalculator.calculateCritDamage(weaponStats)
		const weakspotResult =
			NormalWeaponCalculator.calculateWeakspotDamage(weaponStats)
		const critWeakspotResult =
			NormalWeaponCalculator.calculateCritWeakspotDamage(weaponStats)

		// Use the complete calculation chain from critWeakspot for all results
		const completeSteps = [
			`=== BASE DAMAGE CALCULATION ===`,
			`Step 1: Start with your base attack power`,
			`   → attack(${weaponStats.attack})`,
			`Step 2: Apply weapon damage bonus`,
			`   → ${weaponStats.attack} × (1 + ${weaponStats.weaponDamageBonus}%)`,
			`   → ${weaponStats.attack} × (1 + ${
				weaponStats.weaponDamageBonus / 100
			})`,
			`   → ${weaponStats.attack} × ${
				1 + weaponStats.weaponDamageBonus / 100
			} = ${weaponStats.attack * (1 + weaponStats.weaponDamageBonus / 100)}`,
			`Step 3: Apply enemy bonus`,
			`   → ${
				weaponStats.attack * (1 + weaponStats.weaponDamageBonus / 100)
			} × (1 + ${weaponStats.enemyBonus}%)`,
			`   → ${
				weaponStats.attack * (1 + weaponStats.weaponDamageBonus / 100)
			} × (1 + ${weaponStats.enemyBonus / 100})`,
			`   → ${
				weaponStats.attack * (1 + weaponStats.weaponDamageBonus / 100)
			} × ${1 + weaponStats.enemyBonus / 100} = ${baseResult.result}`,
			``,
			`=== CRIT CALCULATION ===`,
			`Step 1: Take your base damage`,
			`   → baseDamage(${baseResult.result})`,
			`Step 2: Apply crit damage multiplier`,
			`   → ${baseResult.result} × (1 + ${weaponStats.critDamage}%)`,
			`   → ${baseResult.result} × (1 + ${weaponStats.critDamage / 100})`,
			`   → ${baseResult.result} × ${1 + weaponStats.critDamage / 100} = ${
				critResult.result
			}`,
			``,
			`=== WEAKSPOT CALCULATION ===`,
			`Step 1: Take your base damage`,
			`   → baseDamage(${baseResult.result})`,
			`Step 2: Apply weakspot damage multiplier`,
			`   → ${baseResult.result} × (1 + ${weaponStats.weakspotDamage}%)`,
			`   → ${baseResult.result} × (1 + ${weaponStats.weakspotDamage / 100})`,
			`   → ${baseResult.result} × ${1 + weaponStats.weakspotDamage / 100} = ${
				weakspotResult.result
			}`,
			``,
			`=== CRIT WEAKSPOT CALCULATION ===`,
			`Step 1: Take your base damage`,
			`   → baseDamage(${baseResult.result})`,
			`Step 2: Apply BOTH crit AND weakspot multipliers`,
			`   → ${baseResult.result} × (1 + ${weaponStats.critDamage}%) × (1 + ${weaponStats.weakspotDamage}%)`,
			`   → ${baseResult.result} × (1 + ${
				weaponStats.critDamage / 100
			}) × (1 + ${weaponStats.weakspotDamage / 100})`,
			`   → ${baseResult.result} × ${1 + weaponStats.critDamage / 100} × ${
				1 + weaponStats.weakspotDamage / 100
			}`,
			`   → ${baseResult.result} × ${
				(1 + weaponStats.critDamage / 100) *
				(1 + weaponStats.weakspotDamage / 100)
			} = ${critWeakspotResult.result}`,
		]

		return {
			base: {
				damage: baseResult.result,
				steps: completeSteps,
			},
			crit: {
				damage: critResult.result,
				steps: completeSteps,
			},
			weakspot: {
				damage: weakspotResult.result,
				steps: completeSteps,
			},
			critWeakspot: {
				damage: critWeakspotResult.result,
				steps: completeSteps,
			},
		}
	}

	/**
	 * Calculate elemental weapon damage with step-by-step breakdown
	 */
	static calculateElementalWeaponDamage(
		elementalStats: ElementalStats,
		targetArmor: number
	) {
		const baseResult =
			ElementalWeaponCalculator.calculateElementalDamage(elementalStats)

		return {
			base: {
				damage: baseResult.result,
				steps: baseResult.steps,
			},
		}
	}
}

/**
 * DPS CALCULATIONS
 * Calculate damage per second for sustained combat
 */
export class DPSCalculator {
	/**
	 * Calculate DPS based on damage and fire rate
	 */
	static calculateDPS(damage: number, fireRate: number): number {
		return damage * (fireRate / 60) // Convert RPM to RPS
	}

	/**
	 * Calculate burst DPS (damage per magazine)
	 */
	static calculateBurstDPS(
		damage: number,
		fireRate: number,
		magazineSize: number
	): number {
		return damage * (fireRate / 60) * magazineSize
	}

	/**
	 * Calculate sustained DPS (including reload time)
	 */
	static calculateSustainedDPS(
		damage: number,
		fireRate: number,
		magazineSize: number,
		reloadTime: number
	): number {
		const burstDPS = this.calculateBurstDPS(damage, fireRate, magazineSize)
		const cycleTime = magazineSize / (fireRate / 60) + reloadTime
		return burstDPS / cycleTime
	}
}
