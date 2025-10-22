import { getSiteSettings } from "@/lib/data"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About Us - Blue Wave Laundry",
  description:
    "Learn about Blue Wave Laundry, Hillsboro's newest laundromat with state-of-the-art Speed Queen equipment and ozone sanitation.",
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <div className='min-h-screen bg-gray-50'>
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
              <Heart className='h-4 w-4 text-teal-500' />
              Our Story
            </div>

            <h1 className='text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-200'>
              <span className='bg-gradient-to-r from-teal-600 to-royal-blue bg-clip-text text-transparent'>
                About Blue Wave
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400'>
              Your neighborhood's newest destination for fast, clean, and
              convenient laundry service. We're more than just a laundromat –
              we're a
              <span className='font-semibold text-teal-600'>
                {" "}
                community hub built on innovation
              </span>
              .
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Main Content */}
      <section className='py-24 bg-white'>
        <MaxWidthWrapper>
          <div className='max-w-5xl mx-auto space-y-16'>
            <div className='bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-xl border border-gray-100'>
              <h2 className='text-4xl font-bold text-gray-900 mb-8 text-center'>
                Our Story
              </h2>
              <div className='prose prose-xl text-gray-600 max-w-none'>
                <p className='text-2xl leading-relaxed mb-8 text-center font-medium text-gray-700'>
                  Blue Wave Laundry is a brand-new, modern laundromat built
                  around fast turnaround, spotless results, and an easy customer
                  experience.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div>
                    <p className='mb-6 leading-relaxed'>
                      Located in Hillsboro, Oregon, we've invested in the latest
                      Speed Queen Quantum Touch equipment to provide you with
                      the most efficient and reliable laundry service in the
                      area. Our high-capacity washers can handle loads up to 100
                      pounds - the largest in the state - with 200G spin cycles
                      that dramatically reduce drying time.
                    </p>
                    <p className='mb-6 leading-relaxed'>
                      What sets us apart is our commitment to cleanliness and
                      convenience. Our ozone sanitation system ensures your
                      clothes are not just clean, but sanitized without harsh
                      chemicals. Combined with contactless payment options and
                      30+ language support on our machines, we've created an
                      experience that works for everyone in our diverse
                      community.
                    </p>
                  </div>
                  <div>
                    <p className='leading-relaxed'>
                      From the moment you walk in, you'll notice the difference
                      - clean, well-lit spaces, free Wi-Fi, plenty of parking,
                      and equipment that's maintained to the highest standards.
                      We believe laundry day should be as stress-free as
                      possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='group bg-gradient-to-br from-white to-teal-50 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-teal-100'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center'>
                    <Heart className='h-6 w-6 text-white' />
                  </div>
                  <h3 className='text-3xl font-bold text-gray-900'>
                    Our Mission
                  </h3>
                </div>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  To provide the fastest, cleanest, and most convenient laundry
                  experience in Hillsboro while supporting our community with
                  modern, accessible facilities.
                </p>
              </div>

              <div className='group bg-gradient-to-br from-white to-blue-50 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
                    <Users className='h-6 w-6 text-white' />
                  </div>
                  <h3 className='text-3xl font-bold text-gray-900'>
                    Our Values
                  </h3>
                </div>
                <ul className='text-gray-600 space-y-3'>
                  <li className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-teal-500 rounded-full'></div>
                    Cleanliness and sanitation above all
                  </li>
                  <li className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-teal-500 rounded-full'></div>
                    Fast, efficient service
                  </li>
                  <li className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-teal-500 rounded-full'></div>
                    Accessibility for all customers
                  </li>
                  <li className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-teal-500 rounded-full'></div>
                    Modern technology and equipment
                  </li>
                  <li className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-teal-500 rounded-full'></div>
                    Community-focused approach
                  </li>
                </ul>
              </div>
            </div>

            <div className='bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-xl border border-gray-100'>
              <div className='text-center mb-12'>
                <h3 className='text-4xl font-bold text-gray-900 mb-4'>
                  What Makes Us <span className='text-teal-600'>Different</span>
                </h3>
                <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                  We've invested in cutting-edge technology and customer-focused
                  design to create an unmatched laundry experience
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
                  <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                    <Award className='h-8 w-8 text-white' />
                  </div>
                  <div>
                    <h4 className='text-xl font-bold text-gray-900 mb-3'>
                      State-of-the-Art Equipment
                    </h4>
                    <p className='text-gray-600 leading-relaxed'>
                      Speed Queen Quantum Touch machines with the latest
                      technology and reliability
                    </p>
                  </div>
                </div>

                <div className='group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
                  <div className='w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                    <Shield className='h-8 w-8 text-white' />
                  </div>
                  <div>
                    <h4 className='text-xl font-bold text-gray-900 mb-3'>
                      Ozone Sanitation
                    </h4>
                    <p className='text-gray-600 leading-relaxed'>
                      Chemical-free sanitization for healthier, fresher results
                      that last longer
                    </p>
                  </div>
                </div>

                <div className='group text-center space-y-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'>
                  <div className='w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300'>
                    <Zap className='h-8 w-8 text-white' />
                  </div>
                  <div>
                    <h4 className='text-xl font-bold text-gray-900 mb-3'>
                      Speed & Efficiency
                    </h4>
                    <p className='text-gray-600 leading-relaxed'>
                      In and out in about 45 minutes with our high-capacity
                      machines
                    </p>
                  </div>
                </div>
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
              Ready to Experience the Difference?
            </div>

            <h2 className='text-4xl md:text-5xl font-bold leading-tight'>
              Visit Us <span className='text-teal-200'>Today</span>
            </h2>

            <p className='text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed'>
              Experience the Blue Wave difference for yourself. Clean, fast, and
              convenient laundry service awaits at our modern facility in
              Hillsboro.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
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
              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-2 border-white text-white hover:bg-white hover:text-teal-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
              >
                <Link href='/services'>View Services</Link>
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
