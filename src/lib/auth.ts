import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function isAdmin(): Promise<boolean> {
  try {
    const { getUser } = await getKindeServerSession()
    const user = await getUser()

    if (!user || !user.email) {
      return false
    }

    const allowedEmails =
      process.env.ADMIN_ALLOWED_EMAILS?.split(",").map((email) =>
        email.trim()
      ) || []
    return allowedEmails.includes(user.email)
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

export async function requireAdmin() {
  const admin = await isAdmin()
  if (!admin) {
    throw new Error("Unauthorized access")
  }
}
