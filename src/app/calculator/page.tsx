"use client"

import { useState, useEffect } from "react"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DamageCalculator } from "@/lib/damage-formulas"

export default function CalculatorPage() {
	// Weapon type selection
	const [weaponType, setWeaponType] = useState<"normal" | "elemental">("normal")

	// Normal weapon stats
	const [attack, setAttack] = useState("")
	const [weaponDamageBonus, setWeaponDamageBonus] = useState("")
	const [critDamage, setCritDamage] = useState("")
	const [weakspotDamage, setWeakspotDamage] = useState("")

	// Elemental weapon stats
	const [psi, setPsi] = useState("")
	const [elemental, setElemental] = useState("")
	const [statusDamage, setStatusDamage] = useState("")

	// Common stats
	const [enemyBonus, setEnemyBonus] = useState("")

	const [results, setResults] = useState<{
		weaponType: "normal" | "elemental"
		damageResults: {
			base: { damage: number; steps: string[] }
			crit?: { damage: number; steps: string[] }
			weakspot?: { damage: number; steps: string[] }
			critWeakspot?: { damage: number; steps: string[] }
		}
	} | null>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	const calculateDamage = () => {
		let damageResults: {
			base: { damage: number; steps: string[] }
			crit?: { damage: number; steps: string[] }
			weakspot?: { damage: number; steps: string[] }
			critWeakspot?: { damage: number; steps: string[] }
		} = { base: { damage: 0, steps: [] } }

		if (weaponType === "normal") {
			const attackVal = parseFloat(attack) || 0
			const weaponBonus = parseFloat(weaponDamageBonus) || 0
			const critVal = parseFloat(critDamage) || 0
			const weakspotVal = parseFloat(weakspotDamage) || 0
			const enemyBonusVal = parseFloat(enemyBonus) || 0

			if (attackVal === 0) return

			const normalDamage = DamageCalculator.calculateNormalWeaponDamage(
				{
					attack: attackVal,
					weaponDamageBonus: weaponBonus,
					critDamage: critVal,
					weakspotDamage: weakspotVal,
					enemyBonus: enemyBonusVal,
				},
				0 // No armor calculation
			)

			damageResults = {
				base: {
					damage: normalDamage.base.damage,
					steps: normalDamage.base.steps,
				},
				crit: {
					damage: normalDamage.crit.damage,
					steps: normalDamage.crit.steps,
				},
				weakspot: {
					damage: normalDamage.weakspot.damage,
					steps: normalDamage.weakspot.steps,
				},
				critWeakspot: {
					damage: normalDamage.critWeakspot.damage,
					steps: normalDamage.critWeakspot.steps,
				},
			}
		} else {
			const psiVal = parseFloat(psi) || 0
			const elementalVal = parseFloat(elemental) || 0
			const statusVal = parseFloat(statusDamage) || 0
			const enemyBonusVal = parseFloat(enemyBonus) || 0

			if (psiVal === 0 && elementalVal === 0 && statusVal === 0) return

			const elementalDamage = DamageCalculator.calculateElementalWeaponDamage(
				{
					psi: psiVal,
					elemental: elementalVal,
					statusDamage: statusVal,
					enemyBonus: enemyBonusVal,
				},
				0 // No armor calculation
			)

			damageResults = {
				base: {
					damage: elementalDamage.base.damage,
					steps: elementalDamage.base.steps,
				},
			}
		}

		setResults({
			weaponType,
			damageResults,
		})
	}

	return (
		<div className="min-h-screen bg-black text-white pt-16 relative overflow-hidden">
			{/* Subtle Background Elements */}
			<div
				className="absolute top-20 left-1/4 w-2 h-32 bg-white/10 rounded-full"
				style={{
					transform: `translateY(${mousePosition.y * 0.02}px) rotate(${
						mousePosition.x * 0.01
					}deg)`,
					transition: "transform 0.3s ease-out",
				}}
			/>
			<div
				className="absolute top-40 right-1/3 w-1 h-24 bg-white/5 rounded-full"
				style={{
					transform: `translateX(${mousePosition.x * 0.01}px) translateY(${
						mousePosition.y * 0.015
					}px)`,
					transition: "transform 0.4s ease-out",
				}}
			/>
			<div
				className="absolute top-80 left-1/6 w-3 h-3 bg-white/20 rounded-full"
				style={{
					transform: `translate(${mousePosition.x * 0.008}px, ${
						mousePosition.y * 0.012
					}px)`,
					transition: "transform 0.5s ease-out",
				}}
			/>
			<div
				className="absolute top-96 right-1/4 w-1 h-16 bg-white/8 rounded-full"
				style={{
					transform: `translateY(${mousePosition.y * 0.018}px) rotate(${
						mousePosition.x * 0.005
					}deg)`,
					transition: "transform 0.6s ease-out",
				}}
			/>

			<div className="max-w-full mx-auto px-8 py-12 relative z-10">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 font-android">
						<span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
							Simple
						</span>{" "}
						<span className="bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent">
							CALCULATOR
						</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Simple use calculator, if you know what you are doing.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Input Form */}
					<div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-1">
						<h2 className="text-2xl font-bold mb-6 text-gray-300 font-android tracking-wide">
							WEAPON STATS
						</h2>

						{/* Weapon Type Selection */}
						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-300 mb-3">
								Weapon Type
							</label>
							<div className="flex gap-3">
								<button
									onClick={() => setWeaponType("normal")}
									className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm whitespace-nowrap ${
										weaponType === "normal"
											? "bg-gray-700 border-gray-500 text-white"
											: "bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500"
									}`}
								>
									Normal
								</button>
								<button
									onClick={() => setWeaponType("elemental")}
									className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm whitespace-nowrap ${
										weaponType === "elemental"
											? "bg-gray-700 border-gray-500 text-white"
											: "bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500"
									}`}
								>
									Elemental
								</button>
							</div>
						</div>

						<div className="space-y-6">
							{/* Normal Weapon Stats */}
							{weaponType === "normal" && (
								<>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Attack Power
										</label>
										<input
											type="number"
											value={attack}
											onChange={(e) => setAttack(e.target.value)}
											className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
											placeholder="Enter attack power"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Weapon Damage Bonus (%)
										</label>
										<input
											type="number"
											value={weaponDamageBonus}
											onChange={(e) => setWeaponDamageBonus(e.target.value)}
											className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
											placeholder="Enter weapon damage bonus"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Crit Damage (%)
										</label>
										<input
											type="number"
											value={critDamage}
											onChange={(e) => setCritDamage(e.target.value)}
											className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
											placeholder="Enter crit damage"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Weakspot Damage (%)
										</label>
										<input
											type="number"
											value={weakspotDamage}
											onChange={(e) => setWeakspotDamage(e.target.value)}
											className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
											placeholder="Enter weakspot damage"
										/>
									</div>
								</>
							)}

							{/* Elemental Weapon Stats */}
							{weaponType === "elemental" && (
								<>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											PSI Damage
										</label>
										<input
											type="number"
											value={psi}
											onChange={(e) => setPsi(e.target.value)}
											className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
											placeholder="Enter PSI damage"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Elemental Damage
										</label>
										<input
											type="number"
											value={elemental}
											onChange={(e) => setElemental(e.target.value)}
											className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
											placeholder="Enter elemental damage"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Status Damage
										</label>
										<input
											type="number"
											value={statusDamage}
											onChange={(e) => setStatusDamage(e.target.value)}
											className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
											placeholder="Enter status damage"
										/>
									</div>
								</>
							)}

							{/* Common Stats - Enemy Bonus */}
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Enemy Bonus (%)
								</label>
								<input
									type="number"
									value={enemyBonus}
									onChange={(e) => setEnemyBonus(e.target.value)}
									className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-gray-400 focus:outline-none transition-colors"
									placeholder="Enter enemy bonus"
								/>
							</div>

							<Button
								onClick={calculateDamage}
								className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-600/50 text-white font-medium transition-all duration-300 hover:scale-105"
							>
								<Calculator className="h-5 w-5 mr-2" />
								CALCULATE DAMAGE
							</Button>
						</div>
					</div>

					{/* Results */}
					<div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-1">
						<h2 className="text-2xl font-bold mb-8 text-gray-300 font-android tracking-wide">
							RESULTS
						</h2>

						{results ? (
							<div className="space-y-4">
								{/* Damage Results */}
								{results.weaponType === "normal" && results.damageResults && (
									<>
										<div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
											<div className="text-sm font-medium text-gray-400 mb-2">
												Base Damage
											</div>
											<div className="text-3xl font-bold text-white">
												{results.damageResults.base.damage}
											</div>
										</div>

										<div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
											<div className="text-sm font-medium text-gray-400 mb-2">
												Crit
											</div>
											<div className="text-3xl font-bold text-white">
												{results.damageResults.crit?.damage}
											</div>
										</div>

										<div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
											<div className="text-sm font-medium text-gray-400 mb-2">
												Weakspot Hit
											</div>
											<div className="text-3xl font-bold text-white">
												{results.damageResults.weakspot?.damage}
											</div>
										</div>

										<div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
											<div className="text-sm font-medium text-gray-400 mb-2">
												Crit Weakspot
											</div>
											<div className="text-3xl font-bold text-white">
												{results.damageResults.critWeakspot?.damage}
											</div>
										</div>
									</>
								)}

								{/* Elemental Damage Results */}
								{results.weaponType === "elemental" &&
									results.damageResults && (
										<div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
											<div className="text-sm font-medium text-gray-400 mb-2">
												Elemental Damage
											</div>
											<div className="text-3xl font-bold text-white">
												{results.damageResults.base.damage}
											</div>
										</div>
									)}
							</div>
						) : (
							<div className="text-center py-12">
								<Calculator className="h-16 w-16 text-gray-600 mx-auto mb-4" />
								<p className="text-gray-400">
									Enter weapon stats to see damage results
								</p>
							</div>
						)}
					</div>

					{/* Calculations */}
					<div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 lg:col-span-2">
						<h2 className="text-2xl font-bold mb-8 text-gray-300 font-android tracking-wide">
							CALCULATIONS
						</h2>

						{results ? (
							<div className="space-y-4">
								{/* Two-Column Calculation Steps */}
								{results.damageResults && (
									<div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
										<div className="text-sm font-medium text-gray-400 mb-3">
											{results.weaponType === "normal"
												? "Damage Calculation Steps"
												: "Elemental Damage Steps"}
										</div>
										<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
											{/* Left Column - Base Damage */}
											<div className="space-y-1">
												<div className="text-xs text-gray-300 font-mono font-semibold mb-2">
													BASE DAMAGE
												</div>
												{results.damageResults.base.steps
													.slice(0, 19) // Everything until end of enemy bonus calculation
													.map((step: string, index: number) => (
														<div
															key={index}
															className="text-xs text-gray-400 font-mono leading-relaxed"
														>
															{step}
														</div>
													))}
											</div>

											{/* Right Column - Crit & Weakspot */}
											<div className="space-y-1">
												<div className="text-xs text-gray-300 font-mono font-semibold mb-2">
													CRIT & WEAKSPOT
												</div>
												{results.damageResults.base.steps
													.slice(20) // Everything after enemy bonus calculation
													.map((step: string, index: number) => (
														<div
															key={index}
															className="text-xs text-gray-400 font-mono leading-relaxed"
														>
															{step}
														</div>
													))}
											</div>
										</div>
									</div>
								)}
							</div>
						) : (
							<div className="text-center py-12">
								<Calculator className="h-16 w-16 text-gray-600 mx-auto mb-4" />
								<p className="text-gray-400">
									Enter weapon stats to see step-by-step math
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
