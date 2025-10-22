import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://oncehuman-calculator.net"

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/calculator`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
	]
}
