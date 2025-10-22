import { getSiteSettings } from "@/lib/data"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { HelpCircle, ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "FAQ - Blue Wave Laundry",
  description:
    "Frequently asked questions about Blue Wave Laundry services, hours, payment options, and amenities.",
}

export default async function FAQPage() {
  const settings = await getSiteSettings()

  const faqs = [
    {
      question: "What are your hours?",
      answer:
        settings?.hours ||
        "We're open daily from 6am to 10pm, 365 days a year.",
    },
    {
      question: "Do you accept credit cards?",
      answer:
        "Yes! We accept Visa, Mastercard, American Express, Discover, and debit cards. No quarters needed - our machines use contactless payment technology.",
    },
    {
      question: "Do you accept EBT?",
      answer: settings?.ebt
        ? "Yes, we accept EBT payments for eligible items."
        : "We're currently working on EBT payment options. Please contact us for more information.",
    },
    {
      question: "How large are your washing machines?",
      answer:
        "Our Speed Queen Quantum Touch machines can handle loads up to 100 pounds - the largest capacity in the state of Oregon!",
    },
    {
      question: "How long does a typical wash and dry cycle take?",
      answer:
        "With our high-capacity machines and 200G spin cycles, you can typically complete your laundry in about 45 minutes total.",
    },
    {
      question: "What is ozone sanitation?",
      answer:
        "Ozone sanitation is a chemical-free process that eliminates bacteria, mold, and odors while preserving fabric quality. It results in softer, brighter linens and longer fabric life.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, we have plenty of parking spaces with convenient pull-up loading and unloading areas.",
    },
    {
      question: "Do you have Wi-Fi?",
      answer:
        "Yes, we provide free Wi-Fi for all customers while you wait for your laundry.",
    },
    {
      question: "Are your facilities accessible?",
      answer:
        "Yes, our facility is fully ADA accessible with compliant equipment and facilities for all customers.",
    },
    {
      question: "What languages do your machines support?",
      answer:
        "Our machines support over 30 languages to serve our diverse community better.",
    },
    {
      question: "Is the facility safe and secure?",
      answer:
        "Yes, our facility is well-lit and monitored with security cameras for your safety and peace of mind.",
    },
    {
      question: "Do you have change machines?",
      answer:
        "No change machines needed! All our machines accept contactless payment with your credit or debit card.",
    },
    {
      question: "Can I use my own detergent?",
      answer:
        "Yes, you're welcome to bring your own detergent and fabric softener, or you can purchase them from our vending machines.",
    },
    {
      question: "Do you have folding tables?",
      answer:
        "Yes, we provide clean folding tables and seating areas for your comfort while you fold your laundry.",
    },
    {
      question: "What if a machine breaks down?",
      answer:
        "We maintain our equipment to the highest standards. If you encounter any issues, please contact us immediately and we'll resolve it promptly.",
    },
  ]

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
              <HelpCircle className='h-4 w-4 text-teal-500' />
              Get Your Answers
            </div>

            <h1 className='text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-200'>
              <span className='bg-gradient-to-r from-teal-600 to-royal-blue bg-clip-text text-transparent'>
                FAQ
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400'>
              Everything you need to know about Blue Wave Laundry. Can't find
              what you're looking for?
              <span className='font-semibold text-teal-600'>
                {" "}
                We're here to help!
              </span>
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* FAQ Section */}
      <section className='py-24 bg-white'>
        <MaxWidthWrapper>
          <div className='max-w-5xl mx-auto'>
            <div className='space-y-6'>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className='group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100'
                >
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                      <span className='text-white font-bold text-lg'>
                        {index + 1}
                      </span>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors duration-300'>
                        {faq.question}
                      </h3>
                      <p className='text-gray-600 leading-relaxed text-lg'>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className='mt-16 text-center'>
              <div className='bg-gradient-to-br from-teal-50 to-white p-12 rounded-3xl shadow-xl border border-teal-100'>
                <div className='w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8'>
                  <HelpCircle className='h-10 w-10 text-white' />
                </div>
                <h3 className='text-3xl font-bold text-gray-900 mb-6'>
                  Still Have Questions?
                </h3>
                <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                  We're here to help! Contact us directly and we'll get back to
                  you as soon as possible with personalized assistance.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button
                    asChild
                    size='lg'
                    className='bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
                  >
                    <Link
                      href='/contact'
                      className='flex items-center gap-2'
                    >
                      Contact Us
                      <ArrowRight className='h-5 w-5' />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant='outline'
                    size='lg'
                    className='border-2 border-teal-500 text-teal-600 hover:bg-teal-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
                  >
                    <Link href='/services'>View Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Quick Info Section */}
      <section className='py-20 bg-white'>
        <MaxWidthWrapper>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Quick Information
            </h2>
            <p className='text-xl text-gray-600'>
              Essential details at a glance
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>🕕</span>
              </div>
              <h3 className='text-xl font-semibold'>Hours</h3>
              <p className='text-gray-600'>{settings?.hours}</p>
              <p className='text-sm text-gray-500'>365 days a year</p>
            </div>

            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>💳</span>
              </div>
              <h3 className='text-xl font-semibold'>Payment</h3>
              <p className='text-gray-600'>
                Cards accepted{settings?.ebt ? ", EBT" : ""}
              </p>
              <p className='text-sm text-gray-500'>No quarters needed</p>
            </div>

            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>⚡</span>
              </div>
              <h3 className='text-xl font-semibold'>Speed</h3>
              <p className='text-gray-600'>~45 minutes</p>
              <p className='text-sm text-gray-500'>Wash & dry cycle</p>
            </div>

            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>🧽</span>
              </div>
              <h3 className='text-xl font-semibold'>Sanitation</h3>
              <p className='text-gray-600'>Ozone system</p>
              <p className='text-sm text-gray-500'>Chemical-free cleaning</p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
