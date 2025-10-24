"use client"

import Image from "next/image"
import Link from "next/link"
import { Weapon } from "../lib/weapons-data"
import { cn } from "../lib/utils"

interface WeaponCardProps {
	weapon: Weapon
}

const rarityColors = {
	common: "border-gray-500 bg-gray-800/20",
	uncommon: "border-green-500 bg-green-800/20",
	rare: "border-blue-500 bg-blue-800/20",
	epic: "border-purple-500 bg-purple-800/20",
	legendary: "border-yellow-500 bg-yellow-800/20"
}

const rarityGlow = {
	common: "shadow-gray-500/20",
	uncommon: "shadow-green-500/20",
	rare: "shadow-blue-500/20",
	epic: "shadow-purple-500/20",
	legendary: "shadow-yellow-500/20"
}

export function WeaponCard({ weapon }: WeaponCardProps) {
	return (
		<Link href={`/weapons/${weapon.id}`}>
			<div className={cn(
				"group relative bg-gradient-to-br from-gray-800/20 to-black/10 backdrop-blur-sm border rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer",
				rarityColors[weapon.rarity],
				`hover:${rarityGlow[weapon.rarity]}`,
				"hover:shadow-2xl"
			)}>
				{/* Rarity Indicator */}
				<div className="absolute top-4 right-4">
					<div className={cn(
						"w-3 h-3 rounded-full",
						weapon.rarity === "common" && "bg-gray-400",
						weapon.rarity === "uncommon" && "bg-green-400",
						weapon.rarity === "rare" && "bg-blue-400",
						weapon.rarity === "epic" && "bg-purple-400",
						weapon.rarity === "legendary" && "bg-yellow-400"
					)}></div>
				</div>

				{/* Weapon Image */}
				<div className="relative w-full h-48 mb-6 bg-gray-900/50 rounded-lg overflow-hidden">
					<Image
						src={weapon.image}
						alt={weapon.name}
						fill
						className="object-contain group-hover:scale-110 transition-transform duration-300"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				{/* Weapon Info */}
				<div className="space-y-4">
					{/* Name and Type */}
					<div>
						<h3 className="text-xl font-bold text-white mb-2 font-android tracking-wide">
							{weapon.name}
						</h3>
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-400 capitalize">
								{weapon.type.replace("_", " ")}
							</span>
							<span className="text-gray-600">•</span>
							<span className={cn(
								"text-sm font-medium capitalize",
								weapon.rarity === "common" && "text-gray-400",
								weapon.rarity === "uncommon" && "text-green-400",
								weapon.rarity === "rare" && "text-blue-400",
								weapon.rarity === "epic" && "text-purple-400",
								weapon.rarity === "legendary" && "text-yellow-400"
							)}>
								{weapon.rarity}
							</span>
						</div>
					</div>

					{/* Description */}
					<p className="text-gray-300 text-sm leading-relaxed">
						{weapon.description}
					</p>

					{/* Key Stats */}
					<div className="grid grid-cols-2 gap-3">
						<div className="bg-gray-800/30 rounded-lg p-3">
							<div className="text-xs text-gray-400 mb-1">Attack</div>
							<div className="text-lg font-bold text-white">
								{weapon.baseStats.attack}
							</div>
						</div>
						<div className="bg-gray-800/30 rounded-lg p-3">
							<div className="text-xs text-gray-400 mb-1">Fire Rate</div>
							<div className="text-lg font-bold text-white">
								{weapon.baseStats.fireRate}/min
							</div>
						</div>
						<div className="bg-gray-800/30 rounded-lg p-3">
							<div className="text-xs text-gray-400 mb-1">Magazine</div>
							<div className="text-lg font-bold text-white">
								{weapon.baseStats.magazineSize}
							</div>
						</div>
						<div className="bg-gray-800/30 rounded-lg p-3">
							<div className="text-xs text-gray-400 mb-1">Range</div>
							<div className="text-lg font-bold text-white">
								{weapon.baseStats.range}m
							</div>
						</div>
					</div>

					{/* Damage Type Badge */}
					<div className="flex justify-center">
						<span className={cn(
							"px-3 py-1 rounded-full text-xs font-medium",
							weapon.damageType === "normal" 
								? "bg-gray-700 text-gray-300" 
								: "bg-blue-700 text-blue-300"
						)}>
							{weapon.damageType === "normal" ? "Physical Damage" : "Elemental Damage"}
						</span>
					</div>

					{/* Unlock Level */}
					{weapon.unlockLevel && (
						<div className="text-center">
							<span className="text-xs text-gray-500">
								Unlock Level: {weapon.unlockLevel}
							</span>
						</div>
					)}
				</div>

				{/* Hover Effect */}
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
			</div>
		</Link>
	)
}
