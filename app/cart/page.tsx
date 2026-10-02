'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, tax, shipping, total } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'BETA50') {
      setDiscount(50);
      setPromoMessage('Promo code BETA50 applied: $50 off!');
    } else if (promoCode.toUpperCase() === 'WELCOME10') {
      const discountVal = subtotal * 0.1;
      setDiscount(discountVal);
      setPromoMessage('Promo code WELCOME10 applied: 10% off!');
    } else {
      setPromoMessage('Invalid promo code. Try BETA50 or WELCOME10');
      setDiscount(0);
    }
  };

  const finalTotal = Math.max(0, total - discount);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Cart is Empty</h1>
        <p className="text-slate-500 mt-2 max-w-md mx-auto text-sm leading-relaxed">
          Looks like you haven&apos;t added any phones yet. Explore our selection of unlocked Apple, Samsung, Google, and OnePlus devices.
        </p>
        <div className="mt-8">
          <Link
            href="/phones"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your selected phones and accessories before checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 divide-y divide-slate-100 shadow-xs">
            {items.map((item) => (
              <div key={item.variantId} className="py-6 flex flex-col sm:flex-row gap-6 first:pt-0 last:pb-0">
                {/* Product Image */}
                <div className="relative w-28 h-28 bg-slate-50 rounded-2xl border border-slate-100 p-2 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
                          {item.brand}
                        </span>
                        <Link href={`/phones/${item.slug}`}>
                          <h3 className="text-base font-bold text-slate-900 hover:text-sky-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      <span className="font-extrabold text-base text-slate-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-lg font-semibold text-slate-700">
                        {item.storage}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        {item.colorName}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>Unit: {formatCurrency(item.price)}</span>
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between pt-4 mt-2">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-xs font-semibold text-slate-400 hover:text-red-500 flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-2">
            <Link
              href="/phones"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-sky-600"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            <h3 className="font-bold text-lg text-slate-900">Order Summary</h3>

            {/* Promo code */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Have a coupon or promo?
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. BETA50"
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-xs mt-1 ${discount > 0 ? 'text-emerald-600 font-semibold' : 'text-red-500'}`}>
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Price lines */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax (8%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-600" />
                  Shipping
                </span>
                <span className={shipping === 0 ? 'text-emerald-600 font-bold' : ''}>
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-extrabold text-base text-slate-900">Total</span>
                <span className="font-black text-2xl text-sky-600">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Encrypted 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
