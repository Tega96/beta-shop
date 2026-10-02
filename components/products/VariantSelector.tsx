'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductType, ProductVariantType } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Check, ShieldCheck, Truck, Zap } from 'lucide-react';

interface VariantSelectorProps {
  product: ProductType;
}

export function VariantSelector({ product }: VariantSelectorProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const variants = product.variants || [];
  
  // Extract unique colors and unique storages
  const colors = Array.from(
    new Map(variants.map((v) => [v.colorName, { name: v.colorName, hex: v.colorHex }])).values()
  );

  const storages = Array.from(new Set(variants.map((v) => v.storage)));

  const [selectedColor, setSelectedColor] = useState<string>(
    colors[0]?.name || variants[0]?.colorName || ''
  );
  const [selectedStorage, setSelectedStorage] = useState<string>(
    storages[0] || variants[0]?.storage || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Find exact matching variant
  const selectedVariant: ProductVariantType | undefined =
    variants.find(
      (v) => v.colorName === selectedColor && v.storage === selectedStorage
    ) || variants.find((v) => v.colorName === selectedColor) || variants[0];

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const isOutOfStock = selectedVariant ? selectedVariant.stock <= 0 : false;

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      colorName: selectedVariant.colorName,
      colorHex: selectedVariant.colorHex,
      storage: selectedVariant.storage,
      price: selectedVariant.price,
      quantity,
      image: product.images?.[0] || '',
      sku: selectedVariant.sku,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedVariant || isOutOfStock) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      colorName: selectedVariant.colorName,
      colorHex: selectedVariant.colorHex,
      storage: selectedVariant.storage,
      price: selectedVariant.price,
      quantity,
      image: product.images?.[0] || '',
      sku: selectedVariant.sku,
    });

    router.push('/checkout');
  };

  return (
    <div className="space-y-6">
      {/* Price Header */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 uppercase font-semibold">Total Price</span>
          <div className="text-3xl font-black text-slate-900">
            {formatCurrency(currentPrice * quantity)}
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {isOutOfStock ? 'Out of Stock' : 'In Stock & Ready to Ship'}
          </span>
          <span className="block text-[11px] text-slate-400 mt-1">
            Free Express 2-Day Delivery
          </span>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2.5">
          Select Color: <span className="font-normal text-slate-600">{selectedColor}</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => {
            const isSelected = selectedColor === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-600/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shadow-xs flex-shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-sky-600 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Capacity Selection */}
      <div>
        <label className="block text-sm font-bold text-slate-900 mb-2.5">
          Select Storage Capacity: <span className="font-normal text-slate-600">{selectedStorage}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {storages.map((s) => {
            const isSelected = selectedStorage === s;
            const matchingVar = variants.find(
              (v) => v.colorName === selectedColor && v.storage === s
            );
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedStorage(s)}
                className={`p-3 rounded-xl text-center border transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-600/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <span className="font-bold text-sm">{s}</span>
                {matchingVar && (
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    {formatCurrency(matchingVar.price)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-slate-200 rounded-xl bg-white px-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-30"
            >
              -
            </button>
            <span className="w-10 text-center font-bold text-sm text-slate-800">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800"
            >
              +
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {/* Buy Now button */}
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <Zap className="w-4 h-4 text-amber-400" />
          Buy Now (Fast Checkout)
        </button>
      </div>

      {/* Trust Badges */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>Dispatched from local warehouse</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>2-Year Manufacturer Warranty</span>
        </div>
      </div>
    </div>
  );
}
