"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, Menu, X, Database, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center gap-3'
          >
            <div className='w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center'>
              <Calculator className='h-6 w-6 text-black' />
            </div>
            <span className='text-xl font-bold text-white'>
              <span className='text-orange-400'>ONCE HUMAN</span> CALC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            <Link
              href='/'
              className='text-gray-300 hover:text-orange-400 transition-colors'
            >
              Home
            </Link>
            <Link
              href='/calculator'
              className='text-gray-300 hover:text-orange-400 transition-colors'
            >
              Calculator
            </Link>
            <Link
              href='/weapons'
              className='text-gray-300 hover:text-orange-400 transition-colors'
            >
              Weapons
            </Link>
            <Link
              href='/armor'
              className='text-gray-300 hover:text-orange-400 transition-colors'
            >
              Armor
            </Link>
            <Button
              asChild
              className='bg-orange-500 hover:bg-orange-400 text-black font-bold'
            >
              <Link href='/calculator'>Start Calculating</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-white hover:text-orange-400 transition-colors'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden bg-gray-900/95 backdrop-blur-md border-t border-orange-500/20'>
            <div className='px-6 py-4 space-y-4'>
              <Link
                href='/'
                className='block text-gray-300 hover:text-orange-400 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href='/calculator'
                className='block text-gray-300 hover:text-orange-400 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Calculator
              </Link>
              <Link
                href='/weapons'
                className='block text-gray-300 hover:text-orange-400 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Weapons
              </Link>
              <Link
                href='/armor'
                className='block text-gray-300 hover:text-orange-400 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                Armor
              </Link>
              <Button
                asChild
                className='w-full bg-orange-500 hover:bg-orange-400 text-black font-bold'
              >
                <Link
                  href='/calculator'
                  onClick={() => setIsOpen(false)}
                >
                  Start Calculating
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
