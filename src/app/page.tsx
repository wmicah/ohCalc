import {
  Calculator,
  Target,
  Zap,
  Shield,
  Sword,
  Crosshair,
  ArrowRight,
  Sparkles,
  Activity,
  TrendingUp,
  Database,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-600 via-orange-700 to-black text-white pt-16'>
      {/* Hero Section */}
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        {/* Abstract shapes and designs */}
        <div className='absolute inset-0'>
          {/* Large geometric shapes */}
          <div className='absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rotate-45 rounded-lg'></div>
          <div className='absolute top-40 right-20 w-24 h-24 bg-orange-400/30 rounded-full'></div>
          <div className='absolute bottom-40 left-20 w-40 h-16 bg-orange-600/25 rounded-full'></div>
          <div className='absolute bottom-20 right-10 w-20 h-20 bg-orange-500/20 rotate-12 rounded-lg'></div>

          {/* Floating circles */}
          <div className='absolute top-1/4 left-1/4 w-8 h-8 bg-orange-400/40 rounded-full animate-pulse'></div>
          <div className='absolute top-1/3 right-1/3 w-12 h-12 bg-orange-500/30 rounded-full animate-pulse delay-1000'></div>
          <div className='absolute bottom-1/3 left-1/3 w-6 h-6 bg-orange-300/50 rounded-full animate-pulse delay-2000'></div>

          {/* Abstract lines and patterns */}
          <div className='absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent'></div>
          <div className='absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent'></div>

          {/* Hexagonal shapes */}
          <div className='absolute top-32 right-1/4 w-16 h-16 bg-orange-500/20 transform rotate-45'></div>
          <div className='absolute bottom-32 left-1/4 w-20 h-20 bg-orange-400/25 transform rotate-12'></div>

          {/* Triangle shapes */}
          <div className='absolute top-1/2 right-10 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-orange-500/30'></div>
          <div className='absolute bottom-1/4 left-10 w-0 h-0 border-l-12 border-r-12 border-t-20 border-l-transparent border-r-transparent border-t-orange-400/25'></div>
        </div>

        <div className='relative z-10 text-center max-w-6xl mx-auto px-6'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm'>
            <Calculator className='h-5 w-5 text-white' />
            <span className='text-white font-medium'>Fun Side Project</span>
          </div>

          {/* Main heading */}
          <h1 className='text-6xl md:text-8xl font-bold mb-6 leading-tight'>
            <span className='text-white'>ONCE HUMAN</span>
            <br />
            <span className='text-orange-200'>DAMAGE CALC</span>
          </h1>

          {/* Subheading */}
          <p className='text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed'>
            A simple damage calculator for Once Human weapons and gear.
            <br />
            <span className='text-orange-200 font-semibold'>Just for fun!</span>
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center'>
            <Button
              asChild
              size='lg'
              className='bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30'
            >
              <Link
                href='/calculator'
                className='flex items-center gap-3'
              >
                <Calculator className='h-6 w-6' />
                Try Calculator
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm'
            >
              <Link
                href='/weapons'
                className='flex items-center gap-3'
              >
                <Database className='h-6 w-6' />
                Browse Weapons
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24 bg-black/30'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
              What's <span className='text-orange-200'>Inside</span>
            </h2>
            <p className='text-xl text-white/80 max-w-3xl mx-auto'>
              Simple tools for calculating damage in Once Human
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='group bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-300/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Zap className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Quick Calculations
              </h3>
              <p className='text-white/80'>
                Simple damage calculations for weapons
              </p>
            </div>

            <div className='group bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-300/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Target className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Weapon Stats
              </h3>
              <p className='text-white/80'>
                Browse different weapons and their stats
              </p>
            </div>

            <div className='group bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-300/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Sword className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Armor Analysis
              </h3>
              <p className='text-white/80'>
                Check armor values and resistances
              </p>
            </div>

            <div className='group bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-300/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Activity className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Fun & Simple
              </h3>
              <p className='text-white/80'>
                Just a fun side project to play around with
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Tools Section */}
      <section className='py-24 bg-black/50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
              Try the <span className='text-orange-200'>Tools</span>
            </h2>
            <p className='text-xl text-white/80 max-w-3xl mx-auto'>
              Simple calculators for Once Human damage
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-300/50 transition-all duration-300 backdrop-blur-sm'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
                  <Calculator className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>
                  Damage Calculator
                </h3>
              </div>
              <p className='text-white/80 mb-6'>
                Calculate weapon damage, DPS, and other stats
              </p>
              <Button
                asChild
                className='w-full bg-white/20 hover:bg-white/30 text-white font-bold border border-white/30'
              >
                <Link href='/calculator'>Try Calculator</Link>
              </Button>
            </div>

            <div className='bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-300/50 transition-all duration-300 backdrop-blur-sm'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
                  <Shield className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>
                  Armor Database
                </h3>
              </div>
              <p className='text-white/80 mb-6'>
                Browse armor pieces and their stats
              </p>
              <Button
                asChild
                className='w-full bg-white/20 hover:bg-white/30 text-white font-bold border border-white/30'
              >
                <Link href='/armor'>View Armor</Link>
              </Button>
            </div>

            <div className='bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-300/50 transition-all duration-300 backdrop-blur-sm'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
                  <TrendingUp className='h-6 w-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>
                  Weapons Database
                </h3>
              </div>
              <p className='text-white/80 mb-6'>
                Check out different weapons and their stats
              </p>
              <Button
                asChild
                className='w-full bg-white/20 hover:bg-white/30 text-white font-bold border border-white/30'
              >
                <Link href='/weapons'>Browse Weapons</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-24 bg-black/30'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-orange-200 mb-2'>
                6
              </div>
              <div className='text-white/80'>Sample Weapons</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-orange-200 mb-2'>
                5
              </div>
              <div className='text-white/80'>Armor Pieces</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-orange-200 mb-2'>
                Fun
              </div>
              <div className='text-white/80'>Side Project</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl md:text-5xl font-bold text-orange-200 mb-2'>
                Free
              </div>
              <div className='text-white/80'>To Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-r from-orange-500 to-orange-600'>
        <div className='max-w-4xl mx-auto text-center px-6'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
            Ready to Try It Out?
          </h2>
          <p className='text-xl text-orange-100 mb-8'>
            Just a fun little calculator for Once Human damage
          </p>
          <Button
            asChild
            size='lg'
            className='bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105'
          >
            <Link
              href='/calculator'
              className='flex items-center gap-3'
            >
              <Calculator className='h-6 w-6' />
              Try the Calculator
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
