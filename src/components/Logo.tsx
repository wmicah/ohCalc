import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "hero"
  variant?: "white" | "colored" | "monochrome"
  className?: string
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
  "2xl": "h-32 w-32",
  "3xl": "h-48 w-48",
  hero: "h-64 w-64",
}

export default function Logo({
  size = "md",
  variant = "colored",
  className,
}: LogoProps) {
  // For now, we'll use a placeholder. In production, you would:
  // 1. Save the logo images to the public folder
  // 2. Use the appropriate logo based on the variant prop
  // 3. Handle different sizes appropriately

  const logoPath =
    variant === "white"
      ? "/logos/blue-wave-logo-white.png"
      : "/logos/blue-wave-logo-colored2.png"

  const logoDimensions = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
    "2xl": 128,
    "3xl": 192,
    hero: 256,
  }

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src={logoPath}
        alt='Blue Wave Laundry Logo'
        width={logoDimensions[size]}
        height={logoDimensions[size]}
        className='object-contain'
        priority
      />
    </div>
  )
}

// Alternative logo component with text
export function LogoWithText({
  size = "md",
  variant = "colored",
  className,
}: LogoProps) {
  const isWhite = variant === "white"

  // For smaller sizes, just show the logo without text to avoid clutter
  if (size === "sm") {
    return (
      <Logo
        size={size}
        variant={variant}
        className={className}
      />
    )
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Logo
        size={size}
        variant={variant}
      />
      <div className='flex flex-col'>
        <span
          className={cn(
            "font-bold",
            isWhite ? "text-white" : "text-gray-900",
            size === "md" ? "text-lg" : size === "lg" ? "text-xl" : "text-2xl"
          )}
        >
          Blue Wave
        </span>
        <span
          className={cn(
            "font-medium",
            isWhite ? "text-gray-300" : "text-gray-600",
            size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg"
          )}
        >
          Laundry
        </span>
      </div>
    </div>
  )
}
