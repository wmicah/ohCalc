import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import JsonLd from "@/components/JsonLd"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Once Human Damage Calculator - Optimize Your Combat",
  description:
    "Advanced damage calculator for Once Human. Calculate weapon damage, armor penetration, and DPS optimization for maximum survival efficiency.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className='light'
    >
      <body
        className={cn(
          "min-h-screen font-sans antialiased grainy",
          inter.className
        )}
      >
        <JsonLd />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
