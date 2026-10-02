'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Star, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const firstVariant = product.variants?.[0];
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstVariant) return;

    addItem({
      productId: product.id,
      variantId: firstVariant.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      colorName: firstVariant.colorName,
      colorHex: firstVariant.colorHex,
      storage: firstVariant.storage,
      price: firstVariant.price,
      quantity: 1,
      image: primaryImage,
      sku: firstVariant.sku,
    });
  };

  // Unique colors for swatches
  const uniqueColors = Array.from(
    new Set(product.variants?.map((v) => JSON.stringify({ name: v.colorName, hex: v.colorHex })))
  ).map((s) => JSON.parse(s));

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNewArrival && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-600 text-white shadow-sm">
            <Zap className="w-3 h-3" /> New
          </span>
        )}
        {product.isFeatured && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Featured
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link href={`/phones/${product.slug}`} className="relative h-64 w-full bg-slate-50 flex items-center justify-center overflow-hidden p-6">
        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-sky-600 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-slate-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/phones/${product.slug}`}>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Specs Highlights */}
          {product.specs?.screen && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
              <span className="truncate">{product.specs.screen}</span>
            </div>
          )}

          {/* Color Swatches */}
          {uniqueColors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Colors:</span>
              <div className="flex items-center gap-1.5">
                {uniqueColors.slice(0, 4).map((c, i) => (
                  <span
                    key={i}
                    title={c.name}
                    className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                {uniqueColors.length > 4 && (
                  <span className="text-[10px] text-slate-400">+{uniqueColors.length - 4}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add button */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Starting at</span>
            <span className="text-lg font-extrabold text-slate-900">
              {formatCurrency(product.basePrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAdd}
              className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded-xl transition-colors"
            >
              + Quick Add
            </button>
            <Link
              href={`/phones/${product.slug}`}
              className="p-2 bg-slate-900 hover:bg-sky-600 text-white rounded-xl transition-colors flex items-center justify-center"
              aria-label={`View details for ${product.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
