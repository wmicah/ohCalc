import { getSiteSettings } from "@/lib/data"

export default async function JsonLd() {
  const settings = await getSiteSettings()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings?.name || "Blue Wave Laundry",
    alternateName: "Blue Wave Laundromat",
    description:
      settings?.tagline ||
      "Fast, clean, and built for big loads. Brand new Speed Queen Quantum Touch machines with ozone sanitation.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bluewavelaundry.net",
    telephone: settings?.phone || undefined,
    email: settings?.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || "545 SE Baseline St",
      addressLocality: "Hillsboro",
      addressRegion: "OR",
      postalCode: settings?.zip || undefined,
      addressCountry: "US",
    },
    openingHours: [
      "Mo 06:00-22:00",
      "Tu 06:00-22:00",
      "We 06:00-22:00",
      "Th 06:00-22:00",
      "Fr 06:00-22:00",
      "Sa 06:00-22:00",
      "Su 06:00-22:00",
    ],
    priceRange: "$$",
    paymentAccepted: settings?.ebt
      ? [
          "Cash",
          "Credit Card",
          "Debit Card",
          "EBT",
          "Visa",
          "Mastercard",
          "American Express",
          "Discover",
        ]
      : [
          "Cash",
          "Credit Card",
          "Debit Card",
          "Visa",
          "Mastercard",
          "American Express",
          "Discover",
        ],
    currenciesAccepted: "USD",
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(
      `${settings?.address || "545 SE Baseline St"}, Hillsboro, OR`
    )}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5191, // Approximate coordinates for Hillsboro, OR
      longitude: -122.9894,
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Free Wi-Fi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Parking Available",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Contactless Payment",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Ozone Sanitation",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "High Capacity Washers",
        value: "100 lb capacity",
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Self-Service Laundry",
        description: "High-capacity Speed Queen machines with ozone sanitation",
      },
    ],
    sameAs: [
      // Add social media URLs when available
    ],
    image: [
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://bluewavelaundry.net"
      }/logos/blue-wave-logo-colored2.png`,
    ],
    logo: `${
      process.env.NEXT_PUBLIC_BASE_URL || "https://bluewavelaundry.net"
    }/logos/blue-wave-logo-colored2.png`,
    foundingDate: "2024",
    slogan: settings?.tagline || "Fast, clean, and built for big loads.",
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
