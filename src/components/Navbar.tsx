import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { getSiteSettings } from "@/lib/data"
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Logo from "./Logo"

const Navbar = async () => {
  const settings = await getSiteSettings()
  const { isAuthenticated, getUser } = await getKindeServerSession()
  const user = await getUser()

  return (
    <nav className='sticky h-16 inset-x-0 top-0 z-30 w-full bg-royal-blue transition-all shadow-lg'>
      <MaxWidthWrapper>
        <div className='flex h-16 items-center justify-between'>
          <Link
            href='/'
            className='flex z-40 items-center'
          >
            <Logo
              size='sm'
              variant='white'
            />
          </Link>

          <div className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-white hover:text-teal-300 transition-colors'
            >
              Home
            </Link>
            <Link
              href='/services'
              className='text-white hover:text-teal-300 transition-colors'
            >
              Services
            </Link>
            <Link
              href='/about'
              className='text-white hover:text-teal-300 transition-colors'
            >
              About
            </Link>
            <Link
              href='/faq'
              className='text-white hover:text-teal-300 transition-colors'
            >
              FAQ
            </Link>
            <Link
              href='/contact'
              className='text-white hover:text-teal-300 transition-colors'
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href='/admin'
                  className={
                    buttonVariants({
                      variant: "secondary",
                      size: "sm",
                    }) + " bg-white text-royal-blue hover:bg-white/90"
                  }
                >
                  Admin
                </Link>
                <LogoutLink
                  className={
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }) +
                    " border-white text-white hover:bg-white hover:text-royal-blue"
                  }
                >
                  Logout
                </LogoutLink>
              </>
            ) : (
              <LoginLink
                className={
                  buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  }) + " bg-white text-royal-blue hover:bg-white/90"
                }
              >
                Login
              </LoginLink>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
