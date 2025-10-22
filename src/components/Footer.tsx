import { getSiteSettings } from "@/lib/data"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import Logo from "./Logo"

export default async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className='bg-royal-blue text-white'>
      <MaxWidthWrapper>
        <div className='py-12 grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Business Info */}
          <div className='space-y-4'>
            <Logo
              size='sm'
              variant='white'
            />
            <p className='text-white/80'>
              {settings?.tagline || "Fast, clean, and built for big loads."}
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-white/80 hover:text-teal-300 transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/services'
                  className='text-white/80 hover:text-teal-300 transition-colors'
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-white/80 hover:text-teal-300 transition-colors'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  className='text-white/80 hover:text-teal-300 transition-colors'
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-white/80 hover:text-teal-300 transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold'>Contact Info</h4>
            <div className='space-y-2 text-gray-300'>
              <p>{settings?.address}</p>
              {settings?.zip && <p>{settings.zip}</p>}
              <p>
                <a
                  href={`mailto:${settings?.email}`}
                  className='hover:text-primary transition-colors'
                >
                  {settings?.email}
                </a>
              </p>
              {settings?.phone && (
                <p>
                  <a
                    href={`tel:${settings.phone}`}
                    className='hover:text-primary transition-colors'
                  >
                    {settings.phone}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Hours */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold'>Hours</h4>
            <div className='text-gray-300'>
              <p>{settings?.hours}</p>
              <p className='text-sm mt-2'>Open 365 days a year</p>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 py-6 text-center text-gray-400'>
          <p>
            &copy; {new Date().getFullYear()} {settings?.name}. All rights
            reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
