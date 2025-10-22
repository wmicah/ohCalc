import { getServices, getSiteSettings } from "@/lib/data"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { Zap, Shield, CreditCard, Globe, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Services - Blue Wave Laundry",
  description:
    "High-capacity Speed Queen machines, ozone sanitation, contactless payment, and more services at Blue Wave Laundry.",
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ])

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-teal-50 via-white to-royal-blue/5 py-24 overflow-hidden'>
        <div
          className='absolute inset-0 opacity-40'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2309c4f2' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <MaxWidthWrapper>
          <div className='relative text-center space-y-8'>
            <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-full px-4 py-2 text-sm font-medium text-teal-700 animate-fade-in-up'>
              <Sparkles className='h-4 w-4 text-teal-500' />
              Premium Laundry Services
            </div>

            <h1 className='text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-200'>
              <span className='bg-gradient-to-r from-teal-600 to-royal-blue bg-clip-text text-transparent'>
                Our Services
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400'>
              Experience the future of laundry with our cutting-edge technology
              and
              <span className='font-semibold text-teal-600'>
                {" "}
                unmatched convenience
              </span>
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Services Grid */}
      <section className='py-24 bg-white relative'>
        <MaxWidthWrapper>
          {services.length > 0 ? (
            <>
              <div className='text-center mb-16'>
                <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                  What We <span className='text-teal-600'>Offer</span>
                </h2>
                <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                  Every service is designed with your convenience and
                  satisfaction in mind
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className='group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'
                  >
                    <div className='flex items-center gap-4 mb-6'>
                      <div className='w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300'>
                        {index + 1}
                      </div>
                      <h3 className='text-2xl font-bold text-gray-900'>
                        {service.title}
                      </h3>
                    </div>
                    <p className='text-gray-600 leading-relaxed text-lg'>
                      {service.blurb}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='text-center py-16'>
              <div className='w-24 h-24 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-8'>
                <Clock className='h-12 w-12 text-teal-600' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Services Coming Soon
              </h2>
              <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                We're working hard to bring you the most comprehensive laundry
                services in the area.
              </p>
              <Button
                asChild
                size='lg'
                className='bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
              >
                <Link href='/contact'>Contact Us for More Info</Link>
              </Button>
            </div>
          )}
        </MaxWidthWrapper>
      </section>

      {/* Key Features */}
      <section className='py-24 bg-gradient-to-br from-gray-50 to-white relative'>
        <MaxWidthWrapper>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Why Choose <span className='text-teal-600'>Blue Wave</span>?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              We've invested in the latest technology and equipment to deliver
              an unmatched laundry experience
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Zap className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  Speed Queen Equipment
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Professional-grade machines for superior results and
                  reliability
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Shield className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  Ozone Sanitation
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Chemical-free sanitization for cleaner, fresher laundry every
                  time
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <CreditCard className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  Contactless Payment
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  No quarters needed - pay with your card
                  {settings?.ebt ? " or EBT" : ""}
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Globe className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  30+ Languages
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Machine instructions available in multiple languages for
                  everyone
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-gradient-to-br from-teal-600 via-teal-700 to-royal-blue text-white relative overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <MaxWidthWrapper>
          <div className='relative text-center space-y-8'>
            <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium mb-6'>
              <Sparkles className='h-4 w-4' />
              Ready to Get Started?
            </div>

            <h2 className='text-4xl md:text-5xl font-bold leading-tight'>
              Experience the <span className='text-teal-200'>Blue Wave</span>{" "}
              Difference
            </h2>

            <p className='text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed'>
              Join thousands of satisfied customers who have discovered the
              future of laundry. Visit us today and see why we're the premier
              choice for fast, clean, and convenient service.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
              <Button
                asChild
                size='lg'
                className='bg-white text-teal-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
              >
                <Link href='/contact'>Get Directions</Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-2 border-white text-white hover:bg-white hover:text-teal-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
              >
                <Link href='/about'>Learn More</Link>
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
