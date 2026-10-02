import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { ProductType } from '@/lib/types';
import { VariantSelector } from '@/components/products/VariantSelector';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Monitor,
  Battery,
  Camera,
  Layers,
  Wifi,
} from 'lucide-react';

interface PhoneDetailPageProps {
  params: {
    slug: string;
  };
}

// Fallback lookup if database is offline
const fallbackCatalog: ProductType[] = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 16 Pro Max',
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    description: 'The ultimate iPhone featuring a stunning Grade 5 titanium design, the groundbreaking A18 Pro chip, 4K 120 fps Dolby Vision, and the revolutionary Camera Control button for instant photo and video capture.',
    basePrice: 1199,
    rating: 4.9,
    reviewCount: 148,
    isFeatured: true,
    isNewArrival: true,
    category: 'Smartphones',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: {
      screen: '6.9-inch Super Retina XDR OLED, ProMotion 120Hz',
      processor: 'Apple A18 Pro (3nm) with 6-core GPU',
      ram: '8GB Unified Memory',
      battery: '4685 mAh, 33W Fast Charging, MagSafe 25W',
      camera: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto',
      os: 'iOS 18 with Apple Intelligence',
      network: '5G (Sub-6 & mmWave), Wi-Fi 7, Bluetooth 5.3',
    },
    variants: [
      { id: 'v1', productId: 'prod-1', colorName: 'Desert Titanium', colorHex: '#C2B299', storage: '256GB', price: 1199, stock: 15, sku: 'IP16PM-DT-256' },
      { id: 'v2', productId: 'prod-1', colorName: 'Desert Titanium', colorHex: '#C2B299', storage: '512GB', price: 1399, stock: 10, sku: 'IP16PM-DT-512' },
      { id: 'v3', productId: 'prod-1', colorName: 'Desert Titanium', colorHex: '#C2B299', storage: '1TB', price: 1599, stock: 8, sku: 'IP16PM-DT-1TB' },
      { id: 'v4', productId: 'prod-1', colorName: 'Natural Titanium', colorHex: '#9A968F', storage: '256GB', price: 1199, stock: 20, sku: 'IP16PM-NT-256' },
      { id: 'v5', productId: 'prod-1', colorName: 'Black Titanium', colorHex: '#2E2F32', storage: '256GB', price: 1199, stock: 12, sku: 'IP16PM-BT-256' },
      { id: 'v6', productId: 'prod-1', colorName: 'White Titanium', colorHex: '#EAE9E5', storage: '256GB', price: 1199, stock: 14, sku: 'IP16PM-WT-256' },
    ],
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    description: 'Unleash new levels of creativity, productivity, and possibility with Galaxy AI. Built with a durable titanium exterior, flat 6.8-inch Dynamic AMOLED 2X display, and integrated S Pen.',
    basePrice: 1299,
    rating: 4.8,
    reviewCount: 112,
    isFeatured: true,
    isNewArrival: false,
    category: 'Smartphones',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: {
      screen: '6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits peak',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12GB LPDDR5X',
      battery: '5000 mAh, 45W Wired, 15W Wireless',
      camera: '200MP Main + 50MP 5x Periscope + 10MP 3x + 12MP Ultra-Wide',
      os: 'One UI 6.1 (Android 14) with 7 years of OS updates',
      network: '5G, Wi-Fi 7, Bluetooth 5.3, UWB',
    },
    variants: [
      { id: 'v7', productId: 'prod-2', colorName: 'Titanium Gray', colorHex: '#747579', storage: '256GB', price: 1299, stock: 12, sku: 'S24U-TG-256' },
      { id: 'v8', productId: 'prod-2', colorName: 'Titanium Gray', colorHex: '#747579', storage: '512GB', price: 1419, stock: 8, sku: 'S24U-TG-512' },
      { id: 'v9', productId: 'prod-2', colorName: 'Titanium Black', colorHex: '#2B2C30', storage: '256GB', price: 1299, stock: 15, sku: 'S24U-TB-256' },
      { id: 'v10', productId: 'prod-2', colorName: 'Titanium Violet', colorHex: '#4E4B66', storage: '512GB', price: 1419, stock: 6, sku: 'S24U-TV-512' },
    ],
  },
  {
    id: 'prod-3',
    name: 'Google Pixel 9 Pro XL',
    slug: 'google-pixel-9-pro-xl',
    brand: 'Google',
    description: 'The most powerful Pixel yet. Featuring Google Tensor G4 engineered for Gemini advanced AI, a pro-level triple camera system, and an ultra-bright Super Actua display.',
    basePrice: 1099,
    rating: 4.8,
    reviewCount: 86,
    isFeatured: true,
    isNewArrival: true,
    category: 'Smartphones',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: {
      screen: '6.8-inch Super Actua LTPO OLED (1-120Hz), 3000 nits',
      processor: 'Google Tensor G4 with Titan M2 security coprocessor',
      ram: '16GB RAM for advanced on-device AI',
      battery: '5060 mAh, 37W Fast Charging, Wireless Qi',
      camera: '50MP Octa PD Main + 48MP Quad PD Ultrawide + 48MP 5x Telephoto',
      os: 'Android 14 / Android 15 with 7 years of feature drops',
      network: '5G Sub-6/mmWave, Wi-Fi 7, Satellite SOS',
    },
    variants: [
      { id: 'v11', productId: 'prod-3', colorName: 'Obsidian', colorHex: '#212121', storage: '128GB', price: 1099, stock: 20, sku: 'PIX9P-OB-128' },
      { id: 'v12', productId: 'prod-3', colorName: 'Obsidian', colorHex: '#212121', storage: '256GB', price: 1199, stock: 18, sku: 'PIX9P-OB-256' },
      { id: 'v13', productId: 'prod-3', colorName: 'Porcelain', colorHex: '#ECEAE4', storage: '128GB', price: 1099, stock: 15, sku: 'PIX9P-PC-128' },
      { id: 'v14', productId: 'prod-3', colorName: 'Porcelain', colorHex: '#ECEAE4', storage: '256GB', price: 1199, stock: 12, sku: 'PIX9P-PC-256' },
    ],
  },
  {
    id: 'prod-4',
    name: 'Samsung Galaxy Z Fold 6',
    slug: 'samsung-galaxy-z-fold-6',
    brand: 'Samsung',
    description: 'The thinnest, lightest, and most pocketable Fold yet. Next-gen foldable screen with Armor Aluminum frame and Galaxy AI productivity tools built for multitasking.',
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
      screen: '7.6-inch Foldable Dynamic AMOLED 2X + 6.3-inch Cover Display (120Hz)',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12GB LPDDR5X',
      battery: '4400 mAh Dual Battery with 25W Fast Charge',
      camera: '50MP Wide + 10MP 3x Telephoto + 12MP Ultra-Wide',
      os: 'One UI 6.1.1 on Android 14',
      network: '5G, Wi-Fi 6E/7, Ultra-Wideband',
    },
    variants: [
      { id: 'v15', productId: 'prod-4', colorName: 'Silver Shadow', colorHex: '#BAC0C6', storage: '256GB', price: 1899, stock: 8, sku: 'ZF6-SS-256' },
      { id: 'v16', productId: 'prod-4', colorName: 'Silver Shadow', colorHex: '#BAC0C6', storage: '512GB', price: 2019, stock: 6, sku: 'ZF6-SS-512' },
    ],
  },
];

async function getProductBySlug(slug: string): Promise<ProductType | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
      },
    });

    if (product) {
      return product as unknown as ProductType;
    }
  } catch (error) {
    console.warn('Prisma query failed for slug:', slug, error);
  }

  const fallback = fallbackCatalog.find((p) => p.slug === slug);
  return fallback || null;
}

export default async function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/phones" className="hover:text-sky-600 transition-colors">
          Phones
        </Link>
        <span>/</span>
        <Link href={`/phones?brand=${product.brand}`} className="hover:text-sky-600 transition-colors">
          {product.brand}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{product.name}</span>
      </div>

      {/* Main Grid: Gallery on left, Configurator on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square max-h-[540px] w-full bg-white rounded-3xl border border-slate-200/80 p-8 flex items-center justify-center overflow-hidden shadow-xs">
            <div className="relative w-full h-full">
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Additional thumbnails if available */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-2xl bg-white border border-slate-200 p-2 overflow-hidden flex-shrink-0"
                >
                  <Image src={img} alt={`${product.name} photo ${i + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Variant Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-extrabold text-sky-600 uppercase tracking-widest text-[11px]">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="font-bold text-sm">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Interactive Variant Configurator */}
          <VariantSelector product={product} />
        </div>
      </div>

      {/* Specifications Section */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 mb-16 shadow-xs">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Technical Details
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Complete Specifications
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Detailed hardware specs for the factory unlocked {product.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.specs?.screen && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Display</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{product.specs.screen}</p>
              </div>
            </div>
          )}

          {product.specs?.processor && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Processor</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{product.specs.processor}</p>
              </div>
            </div>
          )}

          {product.specs?.camera && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Camera System</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{product.specs.camera}</p>
              </div>
            </div>
          )}

          {product.specs?.battery && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Battery className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Battery & Charging</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{product.specs.battery}</p>
              </div>
            </div>
          )}

          {product.specs?.os && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operating System</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{product.specs.os}</p>
              </div>
            </div>
          )}

          {product.specs?.network && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Connectivity</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{product.specs.network}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What's In The Box */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">What&apos;s In The Factory Box?</h3>
          <p className="text-sm text-slate-400 max-w-xl">
            {product.name} (Factory Unlocked), USB-C to USB-C Fast Charging Cable, SIM Ejector Tool, and Official Warranty Documentation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
            Brand New • Sealed
          </span>
          <span className="px-4 py-2 rounded-xl bg-sky-500/20 text-xs font-semibold text-sky-300 border border-sky-500/30">
            2-Year Official Warranty
          </span>
        </div>
      </section>
    </div>
  );
}
