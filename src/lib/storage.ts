import { createServerClient } from "./supabase"

export async function uploadToSupabase(file: File, path: string) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase.storage
      .from("bw-media")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      throw new Error(`Upload failed: ${error.message}`)
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("bw-media").getPublicUrl(data.path)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error("Storage upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    }
  }
}

export async function deleteFromSupabase(path: string) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase.storage.from("bw-media").remove([path])

    if (error) {
      throw new Error(`Delete failed: ${error.message}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Storage delete error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    }
  }
}

export function generateFileName(
  originalName: string,
  prefix?: string
): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split(".").pop()
  const name = prefix
    ? `${prefix}_${timestamp}_${random}`
    : `${timestamp}_${random}`
  return `${name}.${extension}`
}

