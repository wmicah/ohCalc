import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/api/auth/login")
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='flex'>
        <AdminSidebar />
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </div>
  )
}
