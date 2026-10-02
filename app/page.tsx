import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductType } from '@/lib/types';
import {
  Smartphone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  Star,
  CheckCircle2,
} from 'lucide-react';

// Fallback products in case database is not seeded yet
const fallbackProducts: ProductType[] = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 16 Pro Max',
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    description: 'Forged in Grade 5 titanium with the groundbreaking A18 Pro chip, 4K 120 fps Dolby Vision, and revolutionary Camera Control.',
    basePrice: 1199,
    rating: 4.9,
    reviewCount: 148,
    isFeatured: true,
    isNewArrival: true,
    category: 'Smartphones',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: {
      screen: '6.9" Super Retina XDR 120Hz',
      processor: 'A18 Pro (3nm)',
      battery: '4685 mAh MagSafe',
      camera: '48MP Fusion 5x Telephoto',
    },
    variants: [
      { id: 'v1', productId: 'prod-1', colorName: 'Desert Titanium', colorHex: '#C2B299', storage: '256GB', price: 1199, stock: 15, sku: 'IP16PM-256' },
      { id: 'v2', productId: 'prod-1', colorName: 'Natural Titanium', colorHex: '#9A968F', storage: '512GB', price: 1399, stock: 10, sku: 'IP16PM-512' },
      { id: 'v3', productId: 'prod-1', colorName: 'Black Titanium', colorHex: '#2E2F32', storage: '1TB', price: 1599, stock: 8, sku: 'IP16PM-1TB' },
    ],
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    description: 'Titanium frame, integrated S Pen, Snapdragon 8 Gen 3 for Galaxy, and quad telephoto zoom powered by Galaxy AI.',
    basePrice: 1299,
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    isNewArrival: false,
    category: 'Smartphones',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: {
      screen: '6.8" Dynamic AMOLED 2X 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      battery: '5000 mAh 45W',
      camera: '200MP + 50MP 5x Periscope',
    },
    variants: [
      { id: 'v4', productId: 'prod-2', colorName: 'Titanium Gray', colorHex: '#747579', storage: '256GB', price: 1299, stock: 12, sku: 'S24U-256' },
      { id: 'v5', productId: 'prod-2', colorName: 'Titanium Black', colorHex: '#2B2C30', storage: '512GB', price: 1419, stock: 14, sku: 'S24U-512' },
    ],
  },
  {
    id: 'prod-3',
    name: 'Google Pixel 9 Pro XL',
    slug: 'google-pixel-9-pro-xl',
    brand: 'Google',
    description: 'Engineered for Gemini advanced AI with Google Tensor G4, Super Actua 3000 nits display, and industry-leading pro camera system.',
    basePrice: 1099,
    rating: 4.8,
    reviewCount: 86,
    isFeatured: true,
    isNewArrival: true,
    category: 'Smartphones',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: {
      screen: '6.8" Super Actua OLED (1-120Hz)',
      processor: 'Google Tensor G4',
      battery: '5060 mAh 37W',
      camera: '50MP + 48MP Ultrawide + 48MP 5x',
    },
    variants: [
      { id: 'v6', productId: 'prod-3', colorName: 'Obsidian', colorHex: '#212121', storage: '128GB', price: 1099, stock: 20, sku: 'PIX9P-128' },
      { id: 'v7', productId: 'prod-3', colorName: 'Porcelain', colorHex: '#ECEAE4', storage: '256GB', price: 1199, stock: 18, sku: 'PIX9P-256' },
    ],
  },
  {
    id: 'prod-4',
    name: 'Samsung Galaxy Z Fold 6',
    slug: 'samsung-galaxy-z-fold-6',
    brand: 'Samsung',
    description: 'The thinnest, lightest, and most powerful foldable phone with an expansive 7.6-inch main screen and durable Armor Aluminum hinge.',
    basePrice: 1899,
    rating: 4.8,
    reviewCount: 45,
    isFeatured: true,
    isNewArrival: true,
    category: 'Smartphones',
    images: [
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: {
      screen: '7.6" Foldable AMOLED + 6.3" Cover',
      processor: 'Snapdragon 8 Gen 3',
      battery: '4400 mAh Dual Battery',
      camera: '50MP Wide + 10MP 3x + 12MP Ultra-Wide',
    },
    variants: [
      { id: 'v8', productId: 'prod-4', colorName: 'Silver Shadow', colorHex: '#BAC0C6', storage: '256GB', price: 1899, stock: 8, sku: 'ZF6-256' },
    ],
  },
];

async function getFeaturedProducts(): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany({
      take: 6,
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (products.length > 0) {
      return products as unknown as ProductType[];
    }
  } catch (error) {
    console.warn('Database query failed, using fallback catalog data.', error);
  }

  return fallbackProducts;
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 border border-sky-400/20 text-sky-300">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Next-Gen Smartphone Showcase 2026</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Flagship Power. <br />
                <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                  Unlocked & Ready.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover the latest models from Apple, Samsung, Google, and OnePlus. Factory unlocked for any carrier with guaranteed 2-year warranty and same-day dispatch.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link
                  href="/phones"
                  className="px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  Explore Catalog <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/phones?brand=Apple"
                  className="px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center transition-all"
                >
                  iPhone 16 Series
                </Link>
              </div>

              {/* Guarantees checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>100% Factory Unlocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>30-Day Money Back</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Spotlight Phone */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900/60 p-6 border border-slate-700/60 shadow-2xl flex flex-col justify-between overflow-hidden group">
                <div className="flex justify-between items-start z-10">
                  <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
                    Flagship Pick
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">From</span>
                    <span className="text-xl font-black text-white">$1,199</span>
                  </div>
                </div>

                <div className="relative flex-1 my-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                    alt="iPhone 16 Pro Max Spotlight"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="z-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
                  <h3 className="font-bold text-base text-white">Apple iPhone 16 Pro Max</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Grade 5 Titanium • A18 Pro Chip • 5x Optical</p>
                  <Link
                    href="/phones/apple-iphone-16-pro-max"
                    className="mt-3 w-full py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Configure Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Authorized Flagship Retailer
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'Apple', desc: 'iPhone 16, 16 Pro, 15', link: '/phones?brand=Apple' },
            { name: 'Samsung', desc: 'Galaxy S24 Ultra, Z Fold', link: '/phones?brand=Samsung' },
            { name: 'Google', desc: 'Pixel 9 Pro XL, Pixel 9', link: '/phones?brand=Google' },
            { name: 'OnePlus', desc: 'OnePlus 12, 12R', link: '/phones?brand=OnePlus' },
          ].map((brand) => (
            <Link
              key={brand.name}
              href={brand.link}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-500 hover:shadow-lg transition-all group flex flex-col items-center text-center"
            >
              <Smartphone className="w-7 h-7 text-slate-400 group-hover:text-sky-600 group-hover:scale-110 transition-all mb-2" />
              <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-sky-600 transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{brand.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Phones Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              Trending Now
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Flagship Phones
            </h2>
          </div>
          <Link
            href="/phones"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            View All Phones ({featuredProducts.length}+) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner / Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
              Guaranteed Satisfaction
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Upgrade Your Phone With Complete Peace of Mind
            </h2>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              Every phone we sell is 100% brand new, factory sealed, and backed by manufacturer warranty. Enjoy instant digital checkout, order tracking, and email delivery receipts powered by Mailgun.
            </p>
            <div className="pt-2">
              <Link
                href="/phones"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-700 font-bold text-sm rounded-xl shadow-md hover:bg-slate-100 transition-all"
              >
                Browse All Devices <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
