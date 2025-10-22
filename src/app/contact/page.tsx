import { getSiteSettings } from "@/lib/data"
import { submitContactForm } from "@/lib/actions"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Contact Us - Blue Wave Laundry",
  description:
    "Visit Blue Wave Laundry at 545 SE Baseline St, Hillsboro, OR. Open daily 6am-10pm. Contact us for more information.",
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const fullAddress = `${settings?.address}${
    settings?.zip ? `, ${settings.zip}` : ""
  }`

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
              <MessageCircle className='h-4 w-4 text-teal-500' />
              Get In Touch
            </div>

            <h1 className='text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-200'>
              <span className='bg-gradient-to-r from-teal-600 to-royal-blue bg-clip-text text-transparent'>
                Contact Us
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400'>
              Visit us today or get in touch for more information. We're here to
              help with all your laundry needs!
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Contact Info & Map */}
      <section className='py-20'>
        <MaxWidthWrapper>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Information */}
            <div className='space-y-8'>
              <div className='bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-xl border border-gray-100'>
                <h2 className='text-3xl font-bold text-gray-900 mb-8'>
                  Get In <span className='text-teal-600'>Touch</span>
                </h2>

                <div className='space-y-8'>
                  <div className='group flex items-start space-x-4 p-4 rounded-2xl hover:bg-teal-50 transition-colors duration-300'>
                    <div className='w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                      <MapPin className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 mb-2'>
                        Address
                      </h3>
                      <p className='text-gray-600 text-lg leading-relaxed mb-3'>
                        {fullAddress}
                      </p>
                      <Button
                        asChild
                        variant='link'
                        className='p-0 h-auto text-teal-600 hover:text-teal-700 font-medium'
                      >
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            fullAddress
                          )}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center hover:underline'
                        >
                          Open in Google Maps
                          <ExternalLink className='w-4 h-4 ml-1' />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className='group flex items-start space-x-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors duration-300'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                      <Clock className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 mb-2'>
                        Hours
                      </h3>
                      <p className='text-gray-600 text-lg leading-relaxed'>
                        {settings?.hours}
                      </p>
                      <p className='text-sm text-gray-500 mt-2 font-medium'>
                        Open 365 days a year
                      </p>
                    </div>
                  </div>

                  <div className='group flex items-start space-x-4 p-4 rounded-2xl hover:bg-emerald-50 transition-colors duration-300'>
                    <div className='w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                      <Mail className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 mb-2'>
                        Email
                      </h3>
                      <a
                        href={`mailto:${settings?.email}`}
                        className='text-teal-600 hover:text-teal-700 text-lg font-medium hover:underline transition-colors'
                      >
                        {settings?.email}
                      </a>
                    </div>
                  </div>

                  {settings?.phone && (
                    <div className='group flex items-start space-x-4 p-4 rounded-2xl hover:bg-purple-50 transition-colors duration-300'>
                      <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                        <Phone className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h3 className='text-xl font-bold text-gray-900 mb-2'>
                          Phone
                        </h3>
                        <a
                          href={`tel:${settings.phone}`}
                          className='text-teal-600 hover:text-teal-700 text-lg font-medium hover:underline transition-colors'
                        >
                          {settings.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div className='bg-white p-8 rounded-lg shadow-sm'>
                <h3 className='text-xl font-semibold text-gray-900 mb-6'>
                  Send us a Message
                </h3>
                <form
                  action={submitContactForm}
                  className='space-y-4'
                >
                  {/* Honeypot field - hidden from users */}
                  <input
                    type='text'
                    name='honeypot'
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete='off'
                  />

                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      name='subject'
                      className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      rows={4}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <Button
                    type='submit'
                    className='w-full bg-royal-blue hover:bg-royal-blue/90 text-white'
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className='bg-white p-8 rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold text-gray-900 mb-6'>
                Find Us
              </h3>
              <div className='aspect-square rounded-lg overflow-hidden'>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                  }&q=${encodeURIComponent(fullAddress)}`}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Blue Wave Laundry Location'
                />
              </div>
              <div className='mt-4 text-center'>
                <Button
                  asChild
                  variant='outline'
                >
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      fullAddress
                    )}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center'
                  >
                    <ExternalLink className='w-4 h-4 mr-2' />
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Additional Info */}
      <section className='py-20 bg-white'>
        <MaxWidthWrapper>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>🚗</span>
              </div>
              <h3 className='text-xl font-semibold'>Easy Parking</h3>
              <p className='text-gray-600'>
                Plenty of parking spaces available with pull-up loading and
                unloading areas
              </p>
            </div>

            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>♿</span>
              </div>
              <h3 className='text-xl font-semibold'>Accessible</h3>
              <p className='text-gray-600'>
                Fully accessible facility with ADA-compliant equipment and
                facilities
              </p>
            </div>

            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>🔒</span>
              </div>
              <h3 className='text-xl font-semibold'>Safe & Secure</h3>
              <p className='text-gray-600'>
                Well-lit, monitored facility for your safety and peace of mind
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
