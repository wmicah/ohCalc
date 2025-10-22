import { getHomepageData } from "@/lib/data"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/components/Logo"

export default async function HomePage() {
  const data = await getHomepageData()
  const { settings, services, amenities, ozonePoints, media } = data

  return (
    <div className='min-h-screen'>
      {/* Hero Section - Bold Gradient Background */}
      <section className='relative bg-gradient-to-br from-royal-blue via-royal-blue to-teal-600 py-24 overflow-hidden'>
        {/* Background Pattern */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <MaxWidthWrapper>
          <div className='relative text-center space-y-8'>
            {/* Logo - White variant on colored background */}
            <div className='flex justify-center animate-fade-in-up'>
              <Logo
                size='hero'
                variant='white'
                className='mb-6'
              />
            </div>

            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium text-white animate-fade-in-up animation-delay-200'>
              <Sparkles className='h-4 w-4 text-teal-200' />
              Brand New Speed Queen Equipment
            </div>

            {/* Main Headline - White text */}
            <h1 className='text-5xl md:text-7xl font-bold tenpxxt-white leading-tight animate-fade-in-up animation-delay-400'>
              {settings?.tagline || "Placeholder Text Here"}
            </h1>

            {/* Subheadline - Light gray/teal */}
            <p className='text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600'>
              Experience the future of laundry with our state-of-the-art Speed
              Queen machines.
              <span className='font-semibold text-teal-200'>
                {" "}
                100 lb capacity
              </span>
              ,<span className='font-semibold text-teal-200'> 200G spin</span>,
              and
              <span className='font-semibold text-teal-200'>
                {" "}
                ozone sanitation
              </span>{" "}
              for the cleanest, freshest results.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-800'>
              <Button
                asChild
                size='lg'
                className='bg-white text-royal-blue hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'
              >
                <Link
                  href='/contact'
                  className='flex items-center gap-2'
                >
                  Get Directions
                  <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
              >
                <Link href='/services'>Explore Services</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-in-up animation-delay-1000'>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-teal-200'>
                  100 lb
                </div>
                <div className='text-sm text-white/80'>Max Load Capacity</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-teal-200'>
                  45 min
                </div>
                <div className='text-sm text-white/80'>Average Cycle Time</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-teal-200'>
                  200G
                </div>
                <div className='text-sm text-white/80'>Spin Speed</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-teal-200'>
                  365
                </div>
                <div className='text-sm text-white/80'>Days Open</div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Key Features */}
      <section className='py-24 bg-gray-50 relative'>
        <MaxWidthWrapper>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-royal-blue mb-6'>
              Why Choose <span className='text-royal-blue'>Blue Wave</span>?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              We've revolutionized the laundry experience with cutting-edge
              technology and unmatched convenience.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='group text-center space-y-6 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Zap className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-royal-blue mb-3'>
                  Lightning Fast
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  100 lb washers with 200G spin deliver the fastest turnaround
                  in the state
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Shield className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-royal-blue mb-3'>
                  Ozone Sanitation
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Chemical-free sanitization that eliminates bacteria, mold, and
                  odors naturally
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <CreditCard className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-royal-blue mb-3'>
                  Contactless Payment
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  No quarters needed. Pay with Visa, MC, AMEX, Discover, Debit
                  {settings?.ebt ? ", or EBT" : ""}
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
              <div className='w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Phone className='h-10 w-10 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-royal-blue mb-3'>
                  Modern Amenities
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Free Wi-Fi, plenty of parking, and 30+ language support for
                  everyone
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className='py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative'>
          <MaxWidthWrapper>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                Our <span className='text-teal-400'>Services</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Cutting-edge laundry solutions designed for modern life
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className='group bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-2 border border-gray-600'
                >
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg'>
                      {index + 1}
                    </div>
                    <h3 className='text-xl font-bold text-white'>
                      {service.title}
                    </h3>
                  </div>
                  <p className='text-gray-300 leading-relaxed'>
                    {service.blurb}
                  </p>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        </section>
      )}

      {/* Ozone Benefits */}
      {ozonePoints.length > 0 && (
        <section className='py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2309c4f2' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <MaxWidthWrapper>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 rounded-full px-4 py-2 text-sm font-medium mb-6 border border-teal-400/30'>
                <Shield className='h-4 w-4' />
                Ozone Technology
              </div>
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                The <span className='text-teal-400'>Ozone Advantage</span>
              </h2>
              <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                Experience the power of chemical-free sanitization that
                transforms your laundry experience
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {ozonePoints.map((point, index) => (
                <div
                  key={point.id}
                  className='group flex items-start space-x-4 p-6 bg-gray-700/70 backdrop-blur-sm rounded-2xl border border-gray-600/50 hover:bg-gray-600 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1'
                >
                  <div className='w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-200 font-medium leading-relaxed'>
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            <div className='text-center mt-12'>
              <div className='inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold'>
                <Sparkles className='h-5 w-5' />
                Chemical-Free • Environmentally Safe • More Effective
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      )}

      {/* Amenities */}
      {amenities.length > 0 && (
        <section className='py-24 bg-white relative'>
          <MaxWidthWrapper>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                Modern <span className='text-teal-600'>Amenities</span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Designed for comfort, convenience, and accessibility
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {amenities.map((amenity, index) => (
                <div
                  key={amenity.id}
                  className='group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-300'>
                      <span className='text-2xl group-hover:text-white transition-colors duration-300'>
                        {index === 0
                          ? "📶"
                          : index === 1
                          ? "🚗"
                          : index === 2
                          ? "♿"
                          : index === 3
                          ? "💡"
                          : index === 4
                          ? "🔒"
                          : "⭐"}
                      </span>
                    </div>
                    <p className='font-semibold text-gray-900 text-lg'>
                      {amenity.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        </section>
      )}

      {/* Photo Gallery */}
      {media.length > 0 && (
        <section className='py-24 bg-gradient-to-br from-gray-50 to-white relative'>
          <MaxWidthWrapper>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
                Our <span className='text-teal-600'>Facility</span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Step inside our modern, clean, and welcoming laundry facility
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {media.slice(0, 6).map((item, index) => (
                <div
                  key={item.id}
                  className='group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'
                >
                  <Image
                    src={item.url}
                    alt={item.alt || "Blue Wave Laundry facility"}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-4 left-4 right-4'>
                      <p className='text-white font-medium'>
                        {item.alt || "Facility View"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        </section>
      )}

      {/* Contact Info */}
      <section className='py-24 bg-gradient-to-br from-teal-600 via-teal-700 to-royal-blue text-white relative overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <MaxWidthWrapper>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              Visit Us Today
            </h2>
            <p className='text-xl text-teal-100 max-w-3xl mx-auto'>
              Experience the Blue Wave difference at our modern facility in
              Hillsboro
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='group text-center space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <MapPin className='w-8 h-8' />
              </div>
              <div>
                <h3 className='text-2xl font-bold mb-4'>Location</h3>
                <p className='text-teal-100 leading-relaxed'>
                  {settings?.address}
                  {settings?.zip && <br />}
                  {settings?.zip}
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Clock className='w-8 h-8' />
              </div>
              <div>
                <h3 className='text-2xl font-bold mb-4'>Hours</h3>
                <p className='text-teal-100 leading-relaxed'>
                  {settings?.hours}
                </p>
                <p className='text-sm text-teal-200 mt-2'>
                  Open 365 days a year
                </p>
              </div>
            </div>

            <div className='group text-center space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                <Mail className='w-8 h-8' />
              </div>
              <div>
                <h3 className='text-2xl font-bold mb-4'>Contact</h3>
                <div className='text-teal-100 leading-relaxed space-y-2'>
                  <a
                    href={`mailto:${
                      settings?.email || "info@bluewavelaundry.net"
                    }`}
                    className='block hover:text-white transition-colors'
                  >
                    {settings?.email || "info@bluewavelaundry.net"}
                  </a>
                  {settings?.phone && (
                    <a
                      href={`tel:${settings.phone}`}
                      className='block hover:text-white transition-colors'
                    >
                      {settings.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='text-center mt-16'>
            <Button
              asChild
              size='lg'
              className='bg-white text-teal-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
            >
              <Link
                href='/contact'
                className='flex items-center gap-2'
              >
                Get Directions
                <ArrowRight className='h-5 w-5' />
              </Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
