import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import JsonLd from "@/components/JsonLd"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blue Wave Laundry - Fast, Clean, High-Capacity Laundry",
  description:
    "Brand new Speed Queen laundromat with high-capacity washers up to 100 lb, contactless payment, and ozone sanitation. Open daily 6am-10pm in Hillsboro, OR.",
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
