'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Shield, Truck, RotateCcw, Headphones, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all flagship orders over $500</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Official 2-Year Warranty</h4>
              <p className="text-xs text-slate-400 mt-0.5">100% genuine factory warranty</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Money back guarantee with prepaid return</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Expert Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Live technical consultation anytime</p>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                BETA<span className="text-sky-400">SHOP</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
              Your premier destination for the newest unlocked smartphones, flagship accessories, and instant doorstep delivery with verified manufacturer warranties.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Backed by Supabase / Neon DB</span>
              <span>•</span>
              <span>Mailgun Dispatch</span>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Flagship Brands</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/phones?brand=Apple" className="hover:text-white transition-colors">
                  Apple iPhone
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Samsung" className="hover:text-white transition-colors">
                  Samsung Galaxy
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Google" className="hover:text-white transition-colors">
                  Google Pixel
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=OnePlus" className="hover:text-white transition-colors">
                  OnePlus
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Checkout
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Stay Updated</h5>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for launch alerts, trade-in bonus offers, and special discount codes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-xs font-semibold"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Beta Phone Shop Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
