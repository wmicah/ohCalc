import Link from "next/link"
import { Calculator, Database, Shield, Target } from "lucide-react"

export default function Footer() {
  return (
    <footer className='bg-gray-900/50 border-t border-gray-800 text-white'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center'>
                <Calculator className='h-6 w-6 text-black' />
              </div>
              <span className='text-xl font-bold'>
                <span className='text-orange-400'>ONCE HUMAN</span> CALC
              </span>
            </div>
            <p className='text-gray-300 leading-relaxed'>
              Advanced damage calculator for Once Human. Optimize your combat
              efficiency with precision calculations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-bold mb-6 text-orange-400'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/'
                  className='text-gray-300 hover:text-orange-400 transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/calculator'
                  className='text-gray-300 hover:text-orange-400 transition-colors'
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href='/weapons'
                  className='text-gray-300 hover:text-orange-400 transition-colors'
                >
                  Weapons
                </Link>
              </li>
              <li>
                <Link
                  href='/armor'
                  className='text-gray-300 hover:text-orange-400 transition-colors'
                >
                  Armor
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className='text-lg font-bold mb-6 text-orange-400'>
              Calculator Tools
            </h3>
            <ul className='space-y-3'>
              <li className='text-gray-300'>Weapon Damage Calculator</li>
              <li className='text-gray-300'>Armor Penetration Analysis</li>
              <li className='text-gray-300'>DPS Optimization</li>
              <li className='text-gray-300'>Real-time Updates</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className='text-lg font-bold mb-6 text-orange-400'>Features</h3>
            <ul className='space-y-3'>
              <li className='text-gray-300'>500+ Weapons Database</li>
              <li className='text-gray-300'>99.9% Accuracy</li>
              <li className='text-gray-300'>Live Game Updates</li>
              <li className='text-gray-300'>24/7 Access</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © 2024 Once Human Damage Calculator. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <a
                href='#'
                className='text-gray-400 hover:text-orange-400 transition-colors text-sm'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-orange-400 transition-colors text-sm'
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
