# Beta Phone Shop - Modern E-Commerce Platform

A production-ready e-commerce web application for a flagship smartphone retailer built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **Google Cloud OAuth**, and **Mailgun** email confirmations.

---

## 🚀 Key Features

- **Storefront & Catalog**:
  - Live filtering by brand (Apple, Samsung, Google Pixel, OnePlus), price, and search queries.
  - Interactive product variant selector for storage options (128GB, 256GB, 512GB, 1TB) and titanium/color swatches with live pricing updates.
  - Detailed hardware specifications table (Display, Processor, Cameras, Battery, OS, Connectivity).
- **Cart & Checkout**:
  - Slide-over cart drawer with free shipping meter and persistent localStorage state.
  - Full shopping cart page with promo code support (`BETA50`, `WELCOME10`).
  - Multi-step checkout with address validation and realistic payment simulator.
- **Database Persistence (Supabase / Neon)**:
  - Backed by PostgreSQL via Prisma ORM. Compatible out-of-the-box with both **Supabase** and **Neon**.
  - Persists `Product`, `ProductVariant`, `Order`, `OrderItem`, and `User` account records.
- **Google Cloud Console OAuth**:
  - Sign in with Google using NextAuth.js.
  - Pre-fills checkout shipping details and links order history to customer profile.
  - Built-in demo credentials provider for instantaneous local testing without OAuth keys.
- **Mailgun Transactional Emails**:
  - Automatically dispatches responsive HTML order confirmation emails containing order number, itemized pricing, delivery address, and tracking links.
  - Includes local fallback logger for offline development and sandbox testing.

---

## 🛠️ Getting Started

### 1. Installation
Dependencies are already installed. If running afresh:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure your credentials:

#### A. Database (Neon or Supabase)
- **Neon**:
  1. Create a project at [neon.tech](https://neon.tech).
  2. Copy the connection string:
     ```env
     DATABASE_URL="postgresql://username:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"
     ```
- **Supabase**:
  1. Create a project at [supabase.com](https://supabase.com).
  2. Navigate to **Project Settings -> Database** and copy the URI (Transaction pooler or Session connection string):
     ```env
     DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true"
     ```

Push your schema and seed the smartphone catalog:
```bash
npm run prisma:push
npm run prisma:seed
```

#### B. Google Cloud Console OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services -> Credentials**.
3. Click **Create Credentials -> OAuth Client ID**.
4. Select **Web application**.
5. Set:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
6. Copy your Client ID and Client Secret into `.env`:
   ```env
   GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

#### C. Mailgun Configuration
1. Sign up at [mailgun.com](https://www.mailgun.com/).
2. Under **Sending -> Domains**, find your domain (use your Sandbox domain or custom verified domain).
3. Under **Settings -> API Keys**, generate/copy your API key.
4. Set in `.env`:
   ```env
   MAILGUN_API_KEY="key-xxxxxxxxxxxxxxxx"
   MAILGUN_DOMAIN="sandboxxxxxxxxxxxxx.mailgun.org"
   MAILGUN_HOST="api.mailgun.net" # or api.eu.mailgun.net for EU accounts
   EMAIL_FROM="Beta Phone Shop <orders@yourdomain.com>"
   ```

---

## 💻 Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
beta-shop/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth Google OAuth handler
│   │   └── orders/create/route.ts       # Order persistence & Mailgun dispatch
│   ├── auth/signin/page.tsx             # Sign in with Google & demo login
│   ├── cart/page.tsx                    # Full cart page with promo codes
│   ├── checkout/
│   │   ├── page.tsx                     # Express checkout flow
│   │   └── success/[orderId]/page.tsx   # Order confirmation & status
│   ├── orders/page.tsx                  # Order tracking & customer dashboard
│   ├── phones/
│   │   ├── page.tsx                     # Phone catalog with filters & search
│   │   └── [slug]/page.tsx              # Phone details, specs & variant selector
│   ├── globals.css
│   ├── layout.tsx                       # Root layout with Cart & Auth providers
│   └── page.tsx                         # Home page with hero & featured phones
├── components/
│   ├── auth/AuthProvider.tsx            # SessionProvider wrapper
│   ├── cart/CartDrawer.tsx              # Slide-over interactive cart
│   ├── layout/
│   │   ├── Footer.tsx                   # Footer with warranty badges
│   │   └── Navbar.tsx                   # Header with search & cart badge
│   └── products/
│       ├── ProductCard.tsx              # Product preview card with swatches
│       └── VariantSelector.tsx          # Storage & color selector with live pricing
├── context/
│   └── CartContext.tsx                  # Shopping cart state (localStorage sync)
├── lib/
│   ├── auth.ts                          # NextAuth configuration
│   ├── mailgun.ts                       # Mailgun client & HTML email template
│   ├── prisma.ts                        # Singleton Prisma client
│   ├── types.ts                         # TypeScript interfaces
│   └── utils.ts                         # Formatting and utility functions
├── prisma/
│   ├── schema.prisma                    # PostgreSQL schema (Supabase/Neon)
│   └── seed.ts                          # Catalog seeder with realistic phone models
└── package.json
```
