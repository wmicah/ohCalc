export default function JsonLd() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "Once Human Calculator",
		description:
			"Calculate optimal damage output for your weapons and gear in the post-apocalyptic world of Once Human",
		url: "https://oncehuman-calculator.net",
		applicationCategory: "GameApplication",
		operatingSystem: "Web Browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		author: {
			"@type": "Organization",
			name: "Once Human Calculator",
		},
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}
