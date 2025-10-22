"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Settings, Wrench, Star, Zap, Image, Home, LogOut } from "lucide-react"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "Amenities", href: "/admin/amenities", icon: Star },
  { name: "Ozone Points", href: "/admin/ozone", icon: Zap },
  { name: "Media", href: "/admin/media", icon: Image },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className='w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen'>
      <div className='p-6'>
        <h1 className='text-xl font-bold text-gray-900'>Admin Dashboard</h1>
        <p className='text-sm text-gray-500 mt-1'>Blue Wave Laundry</p>
      </div>

      <nav className='px-4 pb-4'>
        <ul className='space-y-1'>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className='mr-3 h-5 w-5' />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className='absolute bottom-0 w-64 p-4 border-t border-gray-200'>
        <LogoutLink className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors'>
          <LogOut className='mr-3 h-5 w-5' />
          Logout
        </LogoutLink>
      </div>
    </div>
  )
}
