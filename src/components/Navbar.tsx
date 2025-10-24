"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='fixed top-0 left-0 right-0 z-999 bg-black/80 backdrop-blur-md border-b border-gray-600/20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          {/* Title */}
          <Link
            href='/'
            className='flex items-center gap-3'
          >
            <span className='text-xl font-bold text-white font-android tracking-wide'>
              <span className='bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent'>
                ONCE HUMAN
              </span>
              <span className='text-gray-400 ml-2'>CALCULATOR</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            <Link
              href='/'
              className='text-gray-300 hover:text-white transition-colors font-light tracking-wide'
            >
              Home
            </Link>
            <Link
              href='/calculator'
              className='text-gray-300 hover:text-white transition-colors font-light tracking-wide'
            >
              Calculator
            </Link>
            <Link
              href='/weapons'
              className='text-gray-300 hover:text-white transition-colors font-light tracking-wide'
            >
              Weapons
            </Link>
            <Link
              href='/armor'
              className='text-gray-300 hover:text-white transition-colors font-light tracking-wide'
            >
              Armor
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-white hover:text-gray-300 transition-colors'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-600/20'>
            <div className='px-6 py-4 space-y-4'>
              <Link
                href='/'
                className='block text-gray-300 hover:text-white transition-colors font-light tracking-wide'
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href='/calculator'
                className='block text-gray-300 hover:text-white transition-colors font-light tracking-wide'
                onClick={() => setIsOpen(false)}
              >
                Calculator
              </Link>
              <Link
                href='/weapons'
                className='block text-gray-300 hover:text-white transition-colors font-light tracking-wide'
                onClick={() => setIsOpen(false)}
              >
                Weapons
              </Link>
              <Link
                href='/armor'
                className='block text-gray-300 hover:text-white transition-colors font-light tracking-wide'
                onClick={() => setIsOpen(false)}
              >
                Armor
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
