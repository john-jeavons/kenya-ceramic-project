# Kenya Ceramic Project

A full-stack e-commerce website for selling ceramic water filters in Kenya, built with Next.js and integrated with IntaSend payment gateway.

## Features

- Product showcase with detailed information
- Customer testimonials and impact statistics
- Complete order management system
- M-Pesa and card payment integration via IntaSend
- Admin dashboard for order tracking
- Responsive design optimized for mobile

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### Required Variables:

- `DATABASE_URL` - Your Neon database connection string
- `INTASEND_SECRET_KEY` - IntaSend API secret key
- `INTASEND_PUBLISHABLE_KEY` - IntaSend publishable key
- `INTASEND_BASE_URL` - IntaSend API base URL (sandbox or production)
- `NEXT_PUBLIC_BASE_URL` - Your application's base URL

### Getting IntaSend API Keys:

1. Sign up at [IntaSend](https://intasend.com)
2. Navigate to API Keys section in your dashboard
3. Copy your Secret Key and Publishable Key
4. Use sandbox URL for testing: `https://sandbox.intasend.com/api/v1`
5. Use production URL for live: `https://payment.intasend.com/api/v1`

## Database Setup

1. Create a Neon database account
2. Create a new database project
3. Copy the connection string to `DATABASE_URL`
4. Run the database migration scripts in the `/scripts` folder

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Admin Dashboard

Access the admin dashboard at `/admin` to manage orders and view statistics.

## Payment Methods

- M-Pesa (Mobile Money)
- Credit/Debit Cards
- Bank transfers (via IntaSend)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Neon Database (PostgreSQL)
- IntaSend Payment Gateway
- Vercel (Deployment)
