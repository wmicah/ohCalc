"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

// Validation schemas
const siteSettingsSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().optional(),
  hours: z.string().min(1),
  address: z.string().min(1),
  zip: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  ebt: z.boolean(),
})

const serviceSchema = z.object({
  title: z.string().min(1),
  blurb: z.string().min(1),
  order: z.number().int().min(0),
})

const amenitySchema = z.object({
  label: z.string().min(1),
  order: z.number().int().min(0),
})

const ozonePointSchema = z.object({
  text: z.string().min(1),
  order: z.number().int().min(0),
})

const mediaSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  kind: z.string().optional(),
  order: z.number().int().min(0),
})

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Honeypot field
})

// Site Settings Actions
export async function updateSiteSettings(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      tagline: (formData.get("tagline") as string) || null,
      hours: formData.get("hours") as string,
      address: formData.get("address") as string,
      zip: (formData.get("zip") as string) || null,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      ebt: formData.get("ebt") === "on",
    }

    const validated = siteSettingsSchema.parse(data)

    // Mock implementation - in a real app, you'd save to database
    console.log("Site settings updated:", validated)

    revalidateTag("site")
    return { success: true }
  } catch (error) {
    console.error("Error updating site settings:", error)
    return { success: false, error: "Failed to update site settings" }
  }
}

// Service Actions
export async function createService(formData: FormData) {
  try {
    const data = {
      title: formData.get("title") as string,
      blurb: formData.get("blurb") as string,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = serviceSchema.parse(data)

    // Mock implementation - in a real app, you'd save to database
    console.log("Service created:", validated)

    revalidateTag("services")
    return { success: true }
  } catch (error) {
    console.error("Error creating service:", error)
    return { success: false, error: "Failed to create service" }
  }
}

export async function updateService(id: number, formData: FormData) {
  try {
    const data = {
      title: formData.get("title") as string,
      blurb: formData.get("blurb") as string,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = serviceSchema.parse(data)

    // Mock implementation - in a real app, you'd update database
    console.log("Service updated:", { id, ...validated })

    revalidateTag("services")
    return { success: true }
  } catch (error) {
    console.error("Error updating service:", error)
    return { success: false, error: "Failed to update service" }
  }
}

export async function deleteService(id: number) {
  try {
    // Mock implementation - in a real app, you'd delete from database
    console.log("Service deleted:", id)

    revalidateTag("services")
    return { success: true }
  } catch (error) {
    console.error("Error deleting service:", error)
    return { success: false, error: "Failed to delete service" }
  }
}

// Amenity Actions
export async function createAmenity(formData: FormData) {
  try {
    const data = {
      label: formData.get("label") as string,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = amenitySchema.parse(data)

    // Mock implementation - in a real app, you'd save to database
    console.log("Amenity created:", validated)

    revalidateTag("amenities")
    return { success: true }
  } catch (error) {
    console.error("Error creating amenity:", error)
    return { success: false, error: "Failed to create amenity" }
  }
}

export async function updateAmenity(id: number, formData: FormData) {
  try {
    const data = {
      label: formData.get("label") as string,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = amenitySchema.parse(data)

    // Mock implementation - in a real app, you'd update database
    console.log("Amenity updated:", { id, ...validated })

    revalidateTag("amenities")
    return { success: true }
  } catch (error) {
    console.error("Error updating amenity:", error)
    return { success: false, error: "Failed to update amenity" }
  }
}

export async function deleteAmenity(id: number) {
  try {
    // Mock implementation - in a real app, you'd delete from database
    console.log("Amenity deleted:", id)

    revalidateTag("amenities")
    return { success: true }
  } catch (error) {
    console.error("Error deleting amenity:", error)
    return { success: false, error: "Failed to delete amenity" }
  }
}

// Ozone Point Actions
export async function createOzonePoint(formData: FormData) {
  try {
    const data = {
      text: formData.get("text") as string,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = ozonePointSchema.parse(data)

    // Mock implementation - in a real app, you'd save to database
    console.log("Ozone point created:", validated)

    revalidateTag("ozone")
    return { success: true }
  } catch (error) {
    console.error("Error creating ozone point:", error)
    return { success: false, error: "Failed to create ozone point" }
  }
}

export async function updateOzonePoint(id: number, formData: FormData) {
  try {
    const data = {
      text: formData.get("text") as string,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = ozonePointSchema.parse(data)

    // Mock implementation - in a real app, you'd update database
    console.log("Ozone point updated:", { id, ...validated })

    revalidateTag("ozone")
    return { success: true }
  } catch (error) {
    console.error("Error updating ozone point:", error)
    return { success: false, error: "Failed to update ozone point" }
  }
}

export async function deleteOzonePoint(id: number) {
  try {
    // Mock implementation - in a real app, you'd delete from database
    console.log("Ozone point deleted:", id)

    revalidateTag("ozone")
    return { success: true }
  } catch (error) {
    console.error("Error deleting ozone point:", error)
    return { success: false, error: "Failed to delete ozone point" }
  }
}

// Media Actions
export async function createMedia(formData: FormData) {
  try {
    const data = {
      url: formData.get("url") as string,
      alt: (formData.get("alt") as string) || null,
      kind: (formData.get("kind") as string) || null,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = mediaSchema.parse(data)

    // Mock implementation - in a real app, you'd save to database
    console.log("Media created:", validated)

    revalidateTag("media")
    return { success: true }
  } catch (error) {
    console.error("Error creating media:", error)
    return { success: false, error: "Failed to create media" }
  }
}

export async function updateMedia(id: number, formData: FormData) {
  try {
    const data = {
      url: formData.get("url") as string,
      alt: (formData.get("alt") as string) || null,
      kind: (formData.get("kind") as string) || null,
      order: parseInt(formData.get("order") as string) || 0,
    }

    const validated = mediaSchema.parse(data)

    // Mock implementation - in a real app, you'd update database
    console.log("Media updated:", { id, ...validated })

    revalidateTag("media")
    return { success: true }
  } catch (error) {
    console.error("Error updating media:", error)
    return { success: false, error: "Failed to update media" }
  }
}

export async function deleteMedia(id: number) {
  try {
    // Mock implementation - in a real app, you'd delete from database
    console.log("Media deleted:", id)

    revalidateTag("media")
    return { success: true }
  } catch (error) {
    console.error("Error deleting media:", error)
    return { success: false, error: "Failed to delete media" }
  }
}

// Contact Form Action
export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      honeypot: formData.get("honeypot") as string,
    }

    // Check honeypot - if filled, it's likely a bot
    if (data.honeypot) {
      return { success: true } // Silently ignore bots
    }

    const validated = contactFormSchema.parse(data)

    // In a real application, you would:
    // 1. Send email via your email service (SendGrid, Resend, etc.)
    // 2. Store in database if needed
    // 3. Send notification to admin

    // For now, we'll just log it and return success
    console.log("Contact form submission:", {
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    }
  }
}
