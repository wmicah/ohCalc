# Blue Wave Laundry Website

A modern, fast, and accessible multi-page website for Blue Wave Laundry with an admin dashboard for content management.

## 🚀 Features

- **Modern Design**: Clean, professional layout with Royal Blue and Teal brand colors
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Optimized for Lighthouse scores ≥90
- **Admin Dashboard**: Owner-editable content management system
- **SEO Optimized**: Meta tags, sitemap, robots.txt, and JSON-LD schema
- **Accessibility**: WCAG AA compliant with proper focus states and contrast
- **Contact Form**: Functional form with honeypot spam protection
- **Google Maps**: Embedded location map with "Open in Google Maps" CTA

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Kinde
- **Storage**: Supabase Storage
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Hostinger compatible

## 📋 Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- Kinde account (for admin authentication)

## 🚀 Quick Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd blue-wave-laundry
npm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp env.template .env.local
```

Fill in your environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Kinde Authentication
KINDE_ISSUER_URL="https://your-domain.kinde.com"
KINDE_CLIENT_ID="your-kinde-client-id"
KINDE_CLIENT_SECRET="your-kinde-client-secret"
KINDE_REDIRECT_URL="http://localhost:3000/api/auth/kinde/callback"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/admin"

# Admin Access
ADMIN_ALLOWED_EMAILS="owner@example.com,admin@example.com"

# Optional: Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Optional: Base URL for production
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 4. Supabase Storage Setup

1. Create a bucket named `bw-media` in your Supabase dashboard
2. Set the bucket to public for image access
3. Configure policies to allow authenticated uploads

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── (pages)/           # Public pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/             # Admin dashboard components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── actions.ts         # Server actions
│   ├── auth.ts            # Authentication helpers
│   ├── data.ts            # Data fetching functions
│   ├── prisma.ts          # Prisma client
│   ├── storage.ts         # File upload helpers
│   └── supabase.ts        # Supabase client
└── prisma/
    ├── schema.prisma      # Database schema
    └── seed.ts            # Database seed data
```

## 🎨 Brand Guidelines

### Colors

- **Primary**: Royal Blue (#050dd7) - Headings, buttons, nav
- **Accent**: Teal (#09c4f2) - Links, hovers, icons
- **Background**: White (#ffffff) / Light Gray (#f8f9fa)
- **Text**: Dark Gray (#111827) / Medium Gray (#6b7280)

### Logo Usage

- **White logo**: On dark/colored backgrounds (header, footer, dark hero)
- **Colored logo**: On light backgrounds
- **Never**: White logo on white background (use Royal Blue pill wrapper)

## 👨‍💼 Admin Dashboard

Access the admin dashboard at `/admin` (requires authentication).

### Features:

- **Site Settings**: Business info, hours, contact details, EBT toggle
- **Services**: CRUD for service offerings
- **Amenities**: CRUD for facility amenities
- **Ozone Points**: CRUD for ozone benefits
- **Media**: Upload and manage images

### Authentication:

- Only emails listed in `ADMIN_ALLOWED_EMAILS` can access admin
- Uses Kinde for secure authentication
- Automatic logout and redirect protection

## 🗺 SEO & Performance

### SEO Features:

- Dynamic meta tags for all pages
- JSON-LD LocalBusiness schema
- XML sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Open Graph tags for social sharing

### Performance Optimizations:

- Image optimization with Next.js Image component
- Lazy loading for images and maps
- Efficient data fetching with caching
- Minimal JavaScript bundle

## 🚀 Deployment to Hostinger

### 1. Build for Production

```bash
npm run build
```

### 2. Deploy to Hostinger

1. **Upload Files**: Upload the `.next`, `public`, and `package.json` to your Hostinger hosting
2. **Environment Variables**: Set all environment variables in Hostinger's control panel
3. **Database**: Ensure your Supabase database is accessible from production
4. **Domain**: Update `NEXT_PUBLIC_BASE_URL` and Kinde redirect URLs to your production domain

### 3. Hostinger-Specific Configuration

```env
# Update these for production
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
KINDE_REDIRECT_URL="https://your-domain.com/api/auth/kinde/callback"
KINDE_POST_LOGOUT_REDIRECT_URL="https://your-domain.com"
KINDE_SITE_URL="https://your-domain.com"
KINDE_POST_LOGIN_REDIRECT_URL="https://your-domain.com/admin"
```

### 4. Verify Deployment

- Test all pages load correctly
- Verify admin dashboard authentication
- Check contact form functionality
- Validate Google Maps embed
- Run Lighthouse audit

## 📊 Performance Targets

- **Lighthouse Performance**: ≥90
- **Lighthouse SEO**: ≥90
- **Lighthouse Accessibility**: ≥90
- **Lighthouse Best Practices**: ≥90

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio
```

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection**: Verify `DATABASE_URL` is correct
2. **Authentication**: Check Kinde configuration and allowed emails
3. **Images**: Ensure Supabase bucket is public and policies are set
4. **Maps**: Verify Google Maps API key is valid
5. **Build Errors**: Run `npm run db:generate` after schema changes

### Support:

For technical issues, check:

- Browser console for client-side errors
- Server logs for backend errors
- Supabase dashboard for database issues
- Kinde dashboard for authentication issues

## 📝 Content Management

All content is editable through the admin dashboard:

1. **Business Info**: Update name, tagline, hours, address, contact info
2. **Services**: Add/edit laundry services and features
3. **Amenities**: Manage facility amenities (Wi-Fi, parking, etc.)
4. **Ozone Benefits**: Update ozone sanitation benefits
5. **Images**: Upload and manage photos (WebP preferred)

## 🔒 Security Features

- **Honeypot**: Contact form spam protection
- **Authentication**: Secure admin access with Kinde
- **Validation**: Zod schema validation for all forms
- **Rate Limiting**: Built-in Next.js protection
- **Environment Variables**: Sensitive data in environment files

## 📄 License

This project is proprietary software for Blue Wave Laundry.

---

**Built with ❤️ for Blue Wave Laundry**
