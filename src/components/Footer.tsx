import Link from "next/link"

export default function Footer() {
	return (
		<footer className="bg-black border-t border-gray-800/50 text-white">
			<div className="max-w-7xl mx-auto px-6 py-6">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-4">
						<Link
							href="/"
							className="text-gray-300 hover:text-white transition-colors font-android tracking-wide"
						>
							HOME
						</Link>
						<Link
							href="/calculator"
							className="text-gray-300 hover:text-white transition-colors font-android tracking-wide"
						>
							CALCULATOR
						</Link>
						<Link
							href="/weapons"
							className="text-gray-300 hover:text-white transition-colors font-android tracking-wide"
						>
							WEAPONS
						</Link>
						<Link
							href="/armor"
							className="text-gray-300 hover:text-white transition-colors font-android tracking-wide"
						>
							ARMOR
						</Link>
					</div>
					<p className="text-gray-500 text-sm font-android tracking-wide">
						© 2025 ONCE HUMAN CALCULATOR
					</p>
				</div>
			</div>
		</footer>
	)
}
