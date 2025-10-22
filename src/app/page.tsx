"use client"

import { Calculator, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function HomePage() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
			{/* Unified Flowing Background */}
			<div className="absolute inset-0">
				{/* Animated Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-transparent to-black/20 animate-pulse"></div>

				{/* Flowing Grid Background */}
				<div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
						backgroundSize: "50px 50px",
					}}
				></div>

				{/* Animated Background Patterns */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
					<div
						className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/3 to-transparent animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
				</div>

				{/* Flowing Minimalist Shapes */}
				<div className="absolute inset-0">
					{/* Hero Section Shapes */}
					<div
						className="absolute top-20 left-20 w-32 h-32 border border-white/20 transform transition-all duration-1000 ease-out"
						style={{
							transform: `rotate(${
								45 + mousePosition.x * 0.005
							}deg) translate(${mousePosition.x * 0.01}px, ${
								mousePosition.y * 0.01
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.2 + Math.sin(mousePosition.x * 0.0005) * 0.05
							})`,
						}}
					></div>
					<div
						className="absolute top-40 right-32 w-24 h-24 border border-white/15 transform transition-all duration-800 ease-out"
						style={{
							transform: `rotate(${
								-30 + mousePosition.y * 0.008
							}deg) translate(${-mousePosition.x * 0.005}px, ${
								mousePosition.y * 0.015
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.15 + Math.cos(mousePosition.y * 0.0005) * 0.05
							})`,
						}}
					></div>

					{/* Features Section Shapes */}
					<div
						className="absolute top-[800px] left-40 w-28 h-28 border border-white/18 transform transition-all duration-900 ease-out"
						style={{
							transform: `rotate(${60 + mousePosition.x * 0.01}deg) translate(${
								mousePosition.x * 0.012
							}px, ${-mousePosition.y * 0.008}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.18 + Math.sin(mousePosition.x * 0.001) * 0.05
							})`,
						}}
					></div>
					<div
						className="absolute top-[900px] right-20 w-20 h-20 border border-white/12 transform transition-all duration-700 ease-out"
						style={{
							transform: `rotate(${
								-45 + mousePosition.y * 0.006
							}deg) translate(${-mousePosition.x * 0.008}px, ${
								mousePosition.y * 0.012
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.12 + Math.cos(mousePosition.y * 0.0008) * 0.05
							})`,
						}}
					></div>

					{/* Calculator Section Shapes */}
					<div
						className="absolute top-[1400px] left-20 w-36 h-36 border border-white/16 transform transition-all duration-1000 ease-out"
						style={{
							transform: `rotate(${
								30 + mousePosition.x * 0.008
							}deg) translate(${mousePosition.x * 0.015}px, ${
								mousePosition.y * 0.01
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.16 + Math.sin(mousePosition.x * 0.0012) * 0.05
							})`,
						}}
					></div>
					<div
						className="absolute top-[1500px] right-40 w-24 h-24 border border-white/14 transform transition-all duration-800 ease-out"
						style={{
							transform: `rotate(${
								-60 + mousePosition.y * 0.01
							}deg) translate(${-mousePosition.x * 0.01}px, ${
								-mousePosition.y * 0.015
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.14 + Math.cos(mousePosition.y * 0.001) * 0.05
							})`,
						}}
					></div>

					{/* Flowing Lines */}
					<div
						className="absolute top-1/2 left-0 w-96 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transform transition-all duration-600 ease-out"
						style={{
							transform: `translateX(${mousePosition.x * 0.02}px) rotate(${
								mousePosition.y * 0.005
							}deg)`,
						}}
					></div>
					<div
						className="absolute top-1/3 right-0 w-80 h-px bg-gradient-to-l from-transparent via-white/8 to-transparent transform transition-all duration-700 ease-out"
						style={{
							transform: `translateX(${-mousePosition.x * 0.015}px) rotate(${
								-mousePosition.y * 0.004
							}deg)`,
						}}
					></div>
					<div
						className="absolute top-[1000px] left-0 w-72 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent transform transition-all duration-800 ease-out"
						style={{
							transform: `translateX(${mousePosition.x * 0.018}px) rotate(${
								mousePosition.y * 0.003
							}deg)`,
						}}
					></div>

					{/* Additional Cool Shapes - Spread Out */}
					<div
						className="absolute top-[400px] left-1/4 w-16 h-16 border border-white/25 transform transition-all duration-800 ease-out"
						style={{
							transform: `rotate(${
								30 + mousePosition.x * 0.012
							}deg) translate(${mousePosition.x * 0.018}px, ${
								mousePosition.y * 0.012
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.25 + Math.sin(mousePosition.x * 0.0015) * 0.1
							})`,
						}}
					></div>
					<div
						className="absolute top-[900px] right-1/4 w-20 h-20 border border-white/18 transform transition-all duration-700 ease-out"
						style={{
							transform: `rotate(${
								-45 + mousePosition.y * 0.015
							}deg) translate(${-mousePosition.x * 0.012}px, ${
								mousePosition.y * 0.018
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.18 + Math.cos(mousePosition.y * 0.0012) * 0.1
							})`,
						}}
					></div>

					{/* Triangular Shapes - Spread Out */}
					<div
						className="absolute top-[350px] left-1/6 w-0 h-0 border-l-12 border-r-12 border-b-24 border-l-transparent border-r-transparent transform transition-all duration-900 ease-out"
						style={{
							transform: `rotate(${60 + mousePosition.x * 0.02}deg) translate(${
								mousePosition.x * 0.025
							}px, ${mousePosition.y * 0.02}px)`,
							borderBottomColor: `rgba(255, 255, 255, ${
								0.3 + Math.sin(mousePosition.x * 0.002) * 0.15
							})`,
						}}
					></div>
					<div
						className="absolute top-[1200px] right-1/6 w-0 h-0 border-l-16 border-r-16 border-t-32 border-l-transparent border-r-transparent transform transition-all duration-800 ease-out"
						style={{
							transform: `rotate(${
								-30 + mousePosition.y * 0.018
							}deg) translate(${-mousePosition.x * 0.02}px, ${
								mousePosition.y * 0.025
							}px)`,
							borderTopColor: `rgba(255, 255, 255, ${
								0.25 + Math.cos(mousePosition.y * 0.0015) * 0.15
							})`,
						}}
					></div>

					{/* Hexagonal Shapes - Spread Out */}
					<div
						className="absolute top-[500px] left-2/3 w-24 h-24 border border-white/22 transform transition-all duration-1000 ease-out"
						style={{
							transform: `rotate(${
								45 + mousePosition.x * 0.008
							}deg) translate(${mousePosition.x * 0.015}px, ${
								mousePosition.y * 0.01
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.22 + Math.sin(mousePosition.x * 0.001) * 0.08
							})`,
						}}
					></div>
					<div
						className="absolute top-[1400px] right-1/3 w-28 h-28 border border-white/20 transform transition-all duration-900 ease-out"
						style={{
							transform: `rotate(${
								-60 + mousePosition.y * 0.012
							}deg) translate(${-mousePosition.x * 0.018}px, ${
								-mousePosition.y * 0.012
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.2 + Math.cos(mousePosition.y * 0.001) * 0.08
							})`,
						}}
					></div>

					{/* Minimal Lines Through Text Areas */}
					<div
						className="absolute top-[200px] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent transform transition-all duration-600 ease-out"
						style={{
							transform: `translateY(${mousePosition.y * 0.005}px)`,
							background: `linear-gradient(to right, transparent, rgba(255, 255, 255, ${
								0.08 + Math.sin(mousePosition.x * 0.0008) * 0.03
							}), transparent)`,
						}}
					></div>
					<div
						className="absolute top-[600px] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent transform transition-all duration-700 ease-out"
						style={{
							transform: `translateY(${mousePosition.y * 0.004}px)`,
							background: `linear-gradient(to right, transparent, rgba(255, 255, 255, ${
								0.06 + Math.cos(mousePosition.y * 0.0006) * 0.03
							}), transparent)`,
						}}
					></div>
					<div
						className="absolute top-[1000px] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/7 to-transparent transform transition-all duration-800 ease-out"
						style={{
							transform: `translateY(${mousePosition.y * 0.003}px)`,
							background: `linear-gradient(to right, transparent, rgba(255, 255, 255, ${
								0.07 + Math.sin(mousePosition.x * 0.0007) * 0.03
							}), transparent)`,
						}}
					></div>
					<div
						className="absolute top-[1600px] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transform transition-all duration-900 ease-out"
						style={{
							transform: `translateY(${mousePosition.y * 0.002}px)`,
							background: `linear-gradient(to right, transparent, rgba(255, 255, 255, ${
								0.05 + Math.cos(mousePosition.y * 0.0005) * 0.03
							}), transparent)`,
						}}
					></div>

					{/* Vertical Lines Through Content */}
					<div
						className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/6 to-transparent transform transition-all duration-700 ease-out"
						style={{
							transform: `translateX(${mousePosition.x * 0.008}px)`,
							background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${
								0.06 + Math.sin(mousePosition.y * 0.0008) * 0.03
							}), transparent)`,
						}}
					></div>
					<div
						className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/4 to-transparent transform transition-all duration-800 ease-out"
						style={{
							transform: `translateX(${mousePosition.x * -0.006}px)`,
							background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${
								0.04 + Math.cos(mousePosition.y * 0.0006) * 0.03
							}), transparent)`,
						}}
					></div>

					{/* Floating Geometric Elements - Spread Out */}
					<div
						className="absolute top-[450px] right-1/5 w-8 h-8 border border-white/35 transform transition-all duration-600 ease-out"
						style={{
							transform: `rotate(${45 + mousePosition.x * 0.03}deg) translate(${
								mousePosition.x * 0.05
							}px, ${mousePosition.y * 0.05}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.35 + Math.sin(mousePosition.x * 0.002) * 0.2
							})`,
						}}
					></div>
					<div
						className="absolute top-[1350px] left-1/5 w-10 h-10 border border-white/30 transform transition-all duration-700 ease-out"
						style={{
							transform: `rotate(${
								-45 + mousePosition.y * 0.025
							}deg) translate(${-mousePosition.x * 0.04}px, ${
								mousePosition.y * 0.04
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.3 + Math.cos(mousePosition.y * 0.0015) * 0.2
							})`,
						}}
					></div>

					{/* Graph-like Elements - Spread Out */}
					<div
						className="absolute top-[700px] left-1/3 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
						style={{
							transform: `translate(-50%, -50%) rotate(45deg) translate(${
								mousePosition.x * 0.02
							}px, ${mousePosition.y * 0.02}px)`,
						}}
					>
						<div
							className="w-24 h-24 border border-white/20 transform transition-all duration-1000 ease-out"
							style={{
								borderColor: `rgba(255, 255, 255, ${
									0.2 + Math.sin(mousePosition.x * 0.001) * 0.1
								})`,
							}}
						>
							<div
								className="absolute top-1/2 left-1/2 w-12 h-12 border border-white/30 transform -translate-x-1/2 -translate-y-1/2 rotate-45 transition-all duration-1000 ease-out"
								style={{
									borderColor: `rgba(255, 255, 255, ${
										0.3 + Math.cos(mousePosition.y * 0.001) * 0.1
									})`,
								}}
							></div>
						</div>
					</div>

					{/* Complex Animated Shapes */}
					<div
						className="absolute top-[300px] right-1/5 w-32 h-32 border-2 border-white/15 transform transition-all duration-1200 ease-out animate-spin"
						style={{
							transform: `rotate(${mousePosition.x * 0.01}deg) translate(${
								mousePosition.x * 0.02
							}px, ${mousePosition.y * 0.02}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.15 + Math.sin(mousePosition.x * 0.002) * 0.1
							})`,
							animationDuration: "20s",
						}}
					></div>
					<div
						className="absolute top-[1100px] left-1/5 w-40 h-40 border border-white/12 transform transition-all duration-1000 ease-out"
						style={{
							transform: `rotate(${-mousePosition.y * 0.008}deg) translate(${
								-mousePosition.x * 0.015
							}px, ${mousePosition.y * 0.015}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.12 + Math.cos(mousePosition.y * 0.001) * 0.08
							})`,
						}}
					></div>

					{/* Pulsing Geometric Elements */}
					<div
						className="absolute top-[800px] right-1/6 w-16 h-16 border border-white/25 transform transition-all duration-800 ease-out animate-pulse"
						style={{
							transform: `rotate(${
								45 + mousePosition.x * 0.015
							}deg) translate(${mousePosition.x * 0.025}px, ${
								mousePosition.y * 0.025
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.25 + Math.sin(mousePosition.x * 0.0015) * 0.15
							})`,
							animationDuration: "3s",
						}}
					></div>
					<div
						className="absolute top-[1500px] left-2/3 w-20 h-20 border border-white/18 transform transition-all duration-900 ease-out animate-pulse"
						style={{
							transform: `rotate(${
								-30 + mousePosition.y * 0.012
							}deg) translate(${-mousePosition.x * 0.02}px, ${
								-mousePosition.y * 0.02
							}px)`,
							borderColor: `rgba(255, 255, 255, ${
								0.18 + Math.cos(mousePosition.y * 0.0012) * 0.12
							})`,
							animationDuration: "4s",
						}}
					></div>

					{/* Animated Circuit Patterns */}
					<div
						className="absolute top-[400px] left-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-white/8 to-transparent transform transition-all duration-1000 ease-out animate-pulse"
						style={{
							transform: `rotate(${mousePosition.x * 0.005}deg) translate(${
								mousePosition.x * 0.01
							}px, ${mousePosition.y * 0.01}px)`,
							background: `linear-gradient(to right, transparent, rgba(255, 255, 255, ${
								0.08 + Math.sin(mousePosition.x * 0.001) * 0.04
							}), transparent)`,
							animationDuration: "2s",
						}}
					></div>
					<div
						className="absolute top-[1200px] right-1/2 w-1 h-48 bg-gradient-to-b from-transparent via-white/6 to-transparent transform transition-all duration-1000 ease-out animate-pulse"
						style={{
							transform: `rotate(${mousePosition.y * 0.008}deg) translate(${
								-mousePosition.x * 0.012
							}px, ${mousePosition.y * 0.012}px)`,
							background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${
								0.06 + Math.cos(mousePosition.y * 0.001) * 0.03
							}), transparent)`,
							animationDuration: "2.5s",
						}}
					></div>

					{/* Floating Animated Particles */}
					<div
						className="absolute top-[250px] left-1/3 w-3 h-3 bg-white/40 rounded-full transform transition-all duration-700 ease-out animate-bounce"
						style={{
							transform: `translate(${mousePosition.x * 0.08}px, ${
								mousePosition.y * 0.08
							}px)`,
							backgroundColor: `rgba(255, 255, 255, ${
								0.4 + Math.sin(mousePosition.x * 0.003) * 0.2
							})`,
							animationDuration: "2s",
						}}
					></div>
					<div
						className="absolute top-[950px] right-1/3 w-2 h-2 bg-white/30 rounded-full transform transition-all duration-800 ease-out animate-bounce"
						style={{
							transform: `translate(${-mousePosition.x * 0.06}px, ${
								-mousePosition.y * 0.06
							}px)`,
							backgroundColor: `rgba(255, 255, 255, ${
								0.3 + Math.cos(mousePosition.y * 0.002) * 0.15
							})`,
							animationDuration: "2.5s",
						}}
					></div>
					<div
						className="absolute top-[1450px] left-1/2 w-4 h-4 bg-white/25 rounded-full transform transition-all duration-900 ease-out animate-bounce"
						style={{
							transform: `translate(${mousePosition.x * 0.04}px, ${
								mousePosition.y * 0.04
							}px)`,
							backgroundColor: `rgba(255, 255, 255, ${
								0.25 + Math.sin(mousePosition.x * 0.0015) * 0.1
							})`,
							animationDuration: "3s",
						}}
					></div>

					{/* Minimalist Particles */}
					<div
						className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full transform transition-all duration-500 ease-out"
						style={{
							transform: `translate(${mousePosition.x * 0.05}px, ${
								mousePosition.y * 0.05
							}px)`,
						}}
					></div>
					<div
						className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/15 rounded-full transform transition-all duration-600 ease-out"
						style={{
							transform: `translate(${-mousePosition.x * 0.04}px, ${
								-mousePosition.y * 0.06
							}px)`,
						}}
					></div>
					<div
						className="absolute top-[1200px] left-3/4 w-1 h-1 bg-white/25 rounded-full transform transition-all duration-550 ease-out"
						style={{
							transform: `translate(${mousePosition.x * 0.03}px, ${
								mousePosition.y * 0.04
							}px)`,
						}}
					></div>
					<div
						className="absolute top-[600px] right-1/3 w-2 h-2 bg-white/30 rounded-full transform transition-all duration-700 ease-out"
						style={{
							transform: `translate(${mousePosition.x * 0.06}px, ${
								mousePosition.y * 0.08
							}px)`,
						}}
					></div>
					<div
						className="absolute top-[1000px] left-1/3 w-1 h-1 bg-white/35 rounded-full transform transition-all duration-650 ease-out"
						style={{
							transform: `translate(${-mousePosition.x * 0.05}px, ${
								-mousePosition.y * 0.07
							}px)`,
						}}
					></div>
				</div>
			</div>

			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Hero Section Background Effects */}
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
					<div
						className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-white/3 to-transparent rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						{/* Left Column - Main Content */}
						<div className="space-y-8">
							{/* Main heading - Futuristic Typography */}
							<h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight font-android">
								<span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent drop-shadow-2xl">
									ONCE HUMAN
								</span>
							</h1>

							{/* Subheading - Minimalist */}
							<p className="text-lg md:text-xl text-white/80 leading-relaxed font-light tracking-wide max-w-lg">
								Proving retarded people wrong.
							</p>

							{/* CTA Button - Futuristic */}
							<Link href="/calculator">
								<Button className="group bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 border border-gray-600/50 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/50">
									<Calculator className="w-5 h-5 mr-2" />
									Launch Calculator
									<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
								</Button>
							</Link>
						</div>

						{/* Right Column - Calculator Preview */}
						<div className="relative">
							{/* Calculator Mockup - Futuristic Design */}
							<div className="bg-gradient-to-br from-gray-800/20 to-black/10 backdrop-blur-sm border border-gray-600/40 rounded-2xl p-6 shadow-2xl">
								{/* Status Indicators */}
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-2">
										<div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
										<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
										<div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
									</div>
									<div className="text-xs text-gray-300 font-mono">
										SYSTEM ONLINE
									</div>
								</div>

								{/* Main Display */}
								<div className="bg-gray-900/30 border border-gray-600/30 rounded-lg p-4 mb-4">
									<div className="text-gray-300 text-sm font-mono mb-2">
										DAMAGE OUTPUT
									</div>
									<div className="text-2xl font-bold text-gray-400/80">
										2,847
									</div>
								</div>

								{/* Stats Grid */}
								<div className="grid grid-cols-2 gap-3 mb-4">
									<div className="bg-gray-800/20 border border-gray-600/20 rounded p-3">
										<div className="text-xs text-gray-300 mb-1">WEAPON DMG</div>
										<div className="text-sm font-bold text-gray-300">114%</div>
									</div>
									<div className="bg-gray-800/20 border border-gray-600/20 rounded p-3">
										<div className="text-xs text-gray-300 mb-1">
											Crit Damage
										</div>
										<div className="text-sm font-bold text-gray-300">85%</div>
									</div>
									<div className="bg-gray-800/20 border border-gray-600/20 rounded p-3">
										<div className="text-xs text-gray-300 mb-1">CRIT RATE</div>
										<div className="text-sm font-bold text-gray-300">45%</div>
									</div>
									<div className="bg-gray-800/20 border border-gray-600/20 rounded p-3">
										<div className="text-xs text-gray-300 mb-1">Enemy Type</div>
										<div className="text-sm font-bold text-gray-300">40%</div>
									</div>
								</div>

								{/* Progress Bar */}
								<div className="space-y-2">
									<div className="flex justify-between text-xs text-gray-300">
										<span>EFFICIENCY</span>
										<span>92%</span>
									</div>
									<div className="bg-gray-900/30 rounded-full h-2">
										<div className="bg-gradient-to-r from-gray-500 to-gray-400 h-2 rounded-full w-[92%] transition-all duration-1000"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Game Features Section */}
			<section className="relative py-32 bg-black/40 backdrop-blur-sm">
				{/* Features Section Background Effects */}
				<div className="absolute inset-0 opacity-15">
					<div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-white/4 to-transparent rounded-full blur-2xl animate-pulse"></div>
					<div
						className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-tl from-white/3 to-transparent rounded-full blur-2xl animate-pulse"
						style={{ animationDelay: "2s" }}
					></div>
				</div>

				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-20">
						<h2 className="text-5xl md:text-6xl font-black mb-8 text-white font-android">
							<span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
								FEATURES
							</span>
						</h2>
						<p className="text-xl text-gray-300/80 max-w-3xl mx-auto font-light tracking-wide">
							Advanced damage calculation for the post-apocalyptic world
						</p>
					</div>

					{/* Features Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Feature 1 */}
						<div className="bg-gradient-to-br from-gray-800/20 to-black/10 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 hover:border-gray-500/30 transition-all duration-300">
							<div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mb-6">
								<Calculator className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-4">
								Advanced Calculations
							</h3>
							<p className="text-gray-300/80 leading-relaxed">
								Precise damage calculations with weapon stats, armor
								penetration, and critical hit rates.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="bg-gradient-to-br from-gray-800/20 to-black/10 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 hover:border-gray-500/30 transition-all duration-300">
							<div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mb-6">
								<Calculator className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-4">
								Weapon Optimization
							</h3>
							<p className="text-gray-300/80 leading-relaxed">
								Compare different weapons and find the optimal loadout for your
								playstyle.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="bg-gradient-to-br from-gray-800/20 to-black/10 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 hover:border-gray-500/30 transition-all duration-300">
							<div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center mb-6">
								<Calculator className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-4">
								Real-time Updates
							</h3>
							<p className="text-gray-300/80 leading-relaxed">
								Live calculations that update as you modify weapon and armor
								parameters.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Interactive Showcase Section */}
			<section className="relative py-32 bg-gradient-to-br from-gray-900/20 to-black/20">
				{/* Calculator Section Background Effects */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-white/6 to-transparent rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
					<div
						className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-white/4 to-transparent rounded-full blur-2xl animate-pulse"
						style={{ animationDelay: "1.5s" }}
					></div>
				</div>

				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-20">
						<h2 className="text-5xl md:text-6xl font-black mb-8 text-white font-android">
							<span className="bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent">
								CALCULATOR
							</span>
						</h2>
						<p className="text-xl text-gray-300/80 max-w-3xl mx-auto font-light tracking-wide">
							Experience the power of advanced damage calculation
						</p>
					</div>

					{/* Calculator Preview */}
					<div className="max-w-4xl mx-auto">
						<div className="bg-gradient-to-br from-gray-800/20 to-black/10 backdrop-blur-sm border border-gray-600/40 rounded-2xl p-8 shadow-2xl">
							{/* Status Indicators */}
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center space-x-2">
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
									<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
									<div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
								</div>
								<div className="text-xs text-gray-300 font-mono">
									SYSTEM ONLINE
								</div>
							</div>

							{/* Main Display */}
							<div className="bg-gray-900/30 border border-gray-600/30 rounded-lg p-6 mb-6">
								<div className="text-gray-300 text-sm font-mono mb-2">
									DAMAGE OUTPUT
								</div>
								<div className="text-3xl font-bold text-gray-400/80">
									2,847 DPS
								</div>
							</div>

							{/* Stats Grid */}
							<div className="grid grid-cols-2 gap-4 mb-6">
								<div className="bg-gray-800/20 border border-gray-600/20 rounded p-4">
									<div className="text-xs text-gray-300 mb-1">WEAPON DMG</div>
									<div className="text-sm font-bold text-gray-300">1,250</div>
								</div>
								<div className="bg-gray-800/20 border border-gray-600/20 rounded p-4">
									<div className="text-xs text-gray-300 mb-1">ARMOR PEN</div>
									<div className="text-sm font-bold text-gray-300">85%</div>
								</div>
								<div className="bg-gray-800/20 border border-gray-600/20 rounded p-4">
									<div className="text-xs text-gray-300 mb-1">CRIT RATE</div>
									<div className="text-sm font-bold text-gray-300">45%</div>
								</div>
								<div className="bg-gray-800/20 border border-gray-600/20 rounded p-4">
									<div className="text-xs text-gray-300 mb-1">FIRE RATE</div>
									<div className="text-sm font-bold text-gray-300">2.3/s</div>
								</div>
							</div>

							{/* Progress Bar */}
							<div className="space-y-2">
								<div className="flex justify-between text-xs text-gray-300">
									<span>EFFICIENCY</span>
									<span>92%</span>
								</div>
								<div className="bg-gray-900/30 rounded-full h-2">
									<div className="bg-gradient-to-r from-gray-500 to-gray-400 h-2 rounded-full w-[92%] transition-all duration-1000"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
