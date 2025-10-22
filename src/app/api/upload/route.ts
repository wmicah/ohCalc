import { NextRequest, NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import { uploadToSupabase, generateFileName } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      )
    }

    // Validate file size (4MB max)
    const maxSize = 4 * 1024 * 1024 // 4MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 4MB" },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileName = generateFileName(file.name, "bw-media")

    // Upload to Supabase
    const result = await uploadToSupabase(file, fileName)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      fileName,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

