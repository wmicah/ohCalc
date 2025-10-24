# Quick Setup Instructions

## 1. Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.brqoufdhmawzaeuyrmwn.supabase.co:5432/postgres"

# Supabase (from your project dashboard)
NEXT_PUBLIC_SUPABASE_URL="https://brqoufdhmawzaeuyrmwn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# Kinde Auth (optional for now)
KINDE_ISSUER_URL="https://your-domain.kinde.com"
KINDE_CLIENT_ID="your-client-id"
KINDE_CLIENT_SECRET="your-client-secret"
KINDE_REDIRECT_URL="http://localhost:3000/api/auth/kinde/callback"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"

# Admin Access
ADMIN_ALLOWED_EMAILS="your-email@example.com"

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## 2. Get Your Supabase Keys

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/brqoufdhmawzaeuyrmwn
2. Go to Settings > API
3. Copy the following:
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
   - Database password → use in `DATABASE_URL`

## 3. Set Up Database

Run these commands to set up your database:

```bash
# Install dependencies (if not already done)
pnpm install

# Generate Prisma client
pnpm prisma generate

# Push database schema to Supabase
pnpm prisma db push

# Seed initial data
pnpm prisma db seed
```

## 4. Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `bw-media`
3. Set it to public
4. Configure CORS settings for your domain

## 5. Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3000 to see your website!

## 6. Access Admin Dashboard

Once you have Kinde set up (optional), you can access the admin dashboard at:
http://localhost:3000/admin

## Troubleshooting

- If you get database connection errors, check your `DATABASE_URL`
- If images don't upload, verify your Supabase storage bucket settings
- If admin access doesn't work, check your `ADMIN_ALLOWED_EMAILS` setting

## Next Steps

1. Set up Kinde authentication for admin access
2. Configure Google Maps API for the contact page
3. Set up email sending for the contact form
4. Deploy to your hosting provider


