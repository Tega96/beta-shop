import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductType } from '@/lib/types';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface PhonesPageProps {
  searchParams: {
    brand?: string;
    search?: string;
    sort?: string;
  };
}

// Fallback catalog
const fallbackCatalog: ProductType[] = [
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
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80'],
    specs: { screen: '6.9" Super Retina XDR 120Hz', processor: 'A18 Pro (3nm)', battery: '4685 mAh', camera: '48MP + 48MP + 12MP' },
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
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80'],
    specs: { screen: '6.8" Dynamic AMOLED 2X 120Hz', processor: 'Snapdragon 8 Gen 3', battery: '5000 mAh 45W', camera: '200MP + 50MP 5x' },
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
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80'],
    specs: { screen: '6.8" Super Actua OLED (1-120Hz)', processor: 'Google Tensor G4', battery: '5060 mAh 37W', camera: '50MP + 48MP + 48MP 5x' },
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
    images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1000&q=80'],
    specs: { screen: '7.6" Foldable AMOLED + 6.3" Cover', processor: 'Snapdragon 8 Gen 3', battery: '4400 mAh Dual Battery', camera: '50MP Wide + 10MP 3x + 12MP Ultra-Wide' },
    variants: [
      { id: 'v8', productId: 'prod-4', colorName: 'Silver Shadow', colorHex: '#BAC0C6', storage: '256GB', price: 1899, stock: 8, sku: 'ZF6-256' },
    ],
  },
  {
    id: 'prod-5',
    name: 'Apple iPhone 16',
    slug: 'apple-iphone-16',
    brand: 'Apple',
    description: 'Equipped with the all-new A18 processor built for Apple Intelligence, versatile 48MP Fusion camera with 2x Telephoto optical quality.',
    basePrice: 799,
    rating: 4.7,
    reviewCount: 92,
    isFeatured: false,
    isNewArrival: true,
    category: 'Smartphones',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'],
    specs: { screen: '6.1" Super Retina XDR OLED', processor: 'Apple A18', battery: '3561 mAh', camera: '48MP Fusion + 12MP Ultra Wide' },
    variants: [
      { id: 'v9', productId: 'prod-5', colorName: 'Ultramarine', colorHex: '#35528b', storage: '128GB', price: 799, stock: 25, sku: 'IP16-128' },
      { id: 'v10', productId: 'prod-5', colorName: 'Pink', colorHex: '#da93a2', storage: '128GB', price: 799, stock: 20, sku: 'IP16-PK-128' },
    ],
  },
  {
    id: 'prod-6',
    name: 'OnePlus 12',
    slug: 'oneplus-12',
    brand: 'OnePlus',
    description: 'Extreme performance paired with Hasselblad 4th Gen Camera System. 100W SUPERVOOC charging gets you from 1% to 100% in just 26 minutes.',
    basePrice: 799,
    rating: 4.7,
    reviewCount: 68,
    isFeatured: false,
    isNewArrival: false,
    category: 'Smartphones',
    images: ['https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=80'],
    specs: { screen: '6.82" 2K ProXDR LTPO 120Hz', processor: 'Snapdragon 8 Gen 3', battery: '5400 mAh 100W Charging', camera: '50MP Sony + 64MP 3x + 48MP Ultra-Wide' },
    variants: [
      { id: 'v11', productId: 'prod-6', colorName: 'Flowy Emerald', colorHex: '#2C4C42', storage: '256GB', price: 799, stock: 15, sku: 'OP12-256' },
      { id: 'v12', productId: 'prod-6', colorName: 'Silky Black', colorHex: '#1E1E1E', storage: '256GB', price: 799, stock: 12, sku: 'OP12-SB-256' },
    ],
  },
];

async function getPhones(brand?: string, search?: string, sort?: string): Promise<ProductType[]> {
  try {
    const where: any = {};
    if (brand && brand !== 'All') {
      where.brand = { equals: brand, mode: 'insensitive' };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { basePrice: 'asc' };
    if (sort === 'price-desc') orderBy = { basePrice: 'desc' };
    if (sort === 'rating') orderBy = { rating: 'desc' };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        variants: true,
      },
    });

    if (products.length > 0) {
      return products as unknown as ProductType[];
    }
  } catch (error) {
    console.warn('Prisma query failed, filtering fallback catalog', error);
  }

  // Filter fallback catalog
  let filtered = [...fallbackCatalog];
  if (brand && brand !== 'All') {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  if (sort === 'price-asc') filtered.sort((a, b) => a.basePrice - b.basePrice);
  if (sort === 'price-desc') filtered.sort((a, b) => b.basePrice - a.basePrice);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  return filtered;
}

export default async function PhonesPage({ searchParams }: PhonesPageProps) {
  const currentBrand = searchParams.brand || 'All';
  const currentSearch = searchParams.search || '';
  const currentSort = searchParams.sort || 'newest';

  const products = await getPhones(currentBrand, currentSearch, currentSort);

  const brands = ['All', 'Apple', 'Samsung', 'Google', 'OnePlus'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Smartphones</span>
          {currentBrand !== 'All' && (
            <>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{currentBrand}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {currentBrand === 'All' ? 'All Flagship Phones' : `${currentBrand} Phones`}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Showing {products.length} unlocked premium smartphones available with free express shipping.
        </p>
      </div>

      {/* Filter & Sorting Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Brand:
          </span>
          {brands.map((b) => {
            const isSelected = (currentBrand === 'All' && b === 'All') || currentBrand.toLowerCase() === b.toLowerCase();
            const brandHref = b === 'All' ? '/phones' : `/phones?brand=${b}${currentSort !== 'newest' ? `&sort=${currentSort}` : ''}`;

            return (
              <Link
                key={b}
                href={brandHref}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {b}
              </Link>
            );
          })}
        </div>

        {/* Sort & Search info */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {currentSearch && (
            <div className="text-xs text-slate-500 bg-sky-50 text-sky-700 px-3 py-1.5 rounded-lg border border-sky-100 flex items-center gap-1.5">
              <span>Query: &quot;{currentSearch}&quot;</span>
              <Link href="/phones" className="font-bold hover:text-sky-900 ml-1">
                ✕
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase">Sort:</span>
            <div className="flex items-center gap-1 text-xs">
              <Link
                href={`/phones?${currentBrand !== 'All' ? `brand=${currentBrand}&` : ''}sort=newest`}
                className={`px-2.5 py-1.5 rounded-lg font-semibold ${
                  currentSort === 'newest' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Newest
              </Link>
              <Link
                href={`/phones?${currentBrand !== 'All' ? `brand=${currentBrand}&` : ''}sort=price-asc`}
                className={`px-2.5 py-1.5 rounded-lg font-semibold ${
                  currentSort === 'price-asc' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Price: Low to High
              </Link>
              <Link
                href={`/phones?${currentBrand !== 'All' ? `brand=${currentBrand}&` : ''}sort=price-desc`}
                className={`px-2.5 py-1.5 rounded-lg font-semibold ${
                  currentSort === 'price-desc' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Price: High to Low
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="py-20 bg-white rounded-3xl border border-slate-200 text-center p-8">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-slate-800">No smartphones found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keyword or clearing the brand filter to find what you&apos;re looking for.
          </p>
          <Link
            href="/phones"
            className="inline-block mt-4 px-5 py-2.5 bg-sky-600 text-white font-semibold text-xs rounded-xl shadow-sm hover:bg-sky-700"
          >
            Clear All Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
