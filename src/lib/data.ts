import { prisma } from "./prisma"

// Helper function to create fetch with cache tags
async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  tags: string[]
): Promise<T> {
  // In a real implementation, you would use Next.js fetch with cache tags
  // For now, we'll just call the fetcher directly
  return await fetcher()
}

// Site Settings
export async function getSiteSettings() {
  return fetchWithCache(
    "site-settings",
    async () => {
      try {
        let settings = await prisma.siteSettings.findFirst()

        if (!settings) {
          // Create default settings if none exist
          settings = await prisma.siteSettings.create({
            data: {
              name: "BLUE WAVE LAUNDRY",
              tagline: "Fast, clean, and built for big loads.",
              hours: "Open daily, 6am–10pm",
              address: "545 SE Baseline St, Hillsboro, OR",
              email: "info@bluewavelaundry.net",
              ebt: false,
            },
          })
        }

        return settings
      } catch (error) {
        console.error("Error fetching site settings:", error)
        return null
      }
    },
    ["site"]
  )
}

// Services
export async function getServices() {
  return fetchWithCache(
    "services",
    async () => {
      try {
        return await prisma.service.findMany({
          orderBy: { order: "asc" },
        })
      } catch (error) {
        console.error("Error fetching services:", error)
        return []
      }
    },
    ["services"]
  )
}

// Amenities
export async function getAmenities() {
  return fetchWithCache(
    "amenities",
    async () => {
      try {
        return await prisma.amenity.findMany({
          orderBy: { order: "asc" },
        })
      } catch (error) {
        console.error("Error fetching amenities:", error)
        return []
      }
    },
    ["amenities"]
  )
}

// Ozone Points
export async function getOzonePoints() {
  return fetchWithCache(
    "ozone-points",
    async () => {
      try {
        return await prisma.ozonePoint.findMany({
          orderBy: { order: "asc" },
        })
      } catch (error) {
        console.error("Error fetching ozone points:", error)
        return []
      }
    },
    ["ozone"]
  )
}

// Media
export async function getMedia() {
  return fetchWithCache(
    "media",
    async () => {
      try {
        return await prisma.media.findMany({
          orderBy: { order: "asc" },
        })
      } catch (error) {
        console.error("Error fetching media:", error)
        return []
      }
    },
    ["media"]
  )
}

// Get all data for homepage
export async function getHomepageData() {
  return fetchWithCache(
    "homepage-data",
    async () => {
      try {
        const [settings, services, amenities, ozonePoints, media] =
          await Promise.all([
            getSiteSettings(),
            getServices(),
            getAmenities(),
            getOzonePoints(),
            getMedia(),
          ])

        return {
          settings,
          services,
          amenities,
          ozonePoints,
          media,
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error)
        return {
          settings: null,
          services: [],
          amenities: [],
          ozonePoints: [],
          media: [],
        }
      }
    },
    ["site", "services", "amenities", "ozone", "media"]
  )
}
