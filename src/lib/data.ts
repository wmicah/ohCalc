// Mock data for Once Human damage calculator
// These functions return static data instead of using a database

// Site Settings
export async function getSiteSettings() {
  return {
    id: 1,
    name: "ONCE HUMAN DAMAGE CALC",
    tagline: "A simple damage calculator for Once Human weapons and gear",
    hours: "Always available",
    address: "Online Calculator",
    email: "contact@example.com",
    ebt: false,
    updatedAt: new Date(),
  }
}

// Services (weapon categories)
export async function getServices() {
  return [
    {
      id: 1,
      title: "Assault Rifles",
      blurb: "High damage, medium range weapons",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "Sniper Rifles",
      blurb: "Long range, high precision weapons",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "Shotguns",
      blurb: "Close range, high damage weapons",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

// Amenities (weapon features)
export async function getAmenities() {
  return [
    {
      id: 1,
      label: "High Damage",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      label: "Fast Reload",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      label: "Low Recoil",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

// Ozone Points (damage calculation tips)
export async function getOzonePoints() {
  return [
    {
      id: 1,
      text: "Damage is calculated based on weapon stats and target armor",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      text: "Critical hits deal 2x damage",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      text: "Armor reduces incoming damage by a percentage",
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

// Media (weapon images)
export async function getMedia() {
  return [
    {
      id: 1,
      url: "/images/weapon1.jpg",
      alt: "Assault Rifle",
      kind: "weapon",
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      url: "/images/weapon2.jpg",
      alt: "Sniper Rifle",
      kind: "weapon",
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

// Get all data for homepage
export async function getHomepageData() {
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
}
