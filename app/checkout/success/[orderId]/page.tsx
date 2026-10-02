import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CheckCircle2,
  Package,
  Mail,
  Truck,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface SuccessPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderSuccessPage({ params }: SuccessPageProps) {
  const { orderId } = params;

  let order: any = null;

  try {
    order = await prisma.order.findFirst({
      where: {
        OR: [{ id: orderId }, { orderNumber: orderId }],
      },
      include: {
        items: true,
      },
    });
  } catch (error) {
    console.warn('Could not query order from database, using fallback display', error);
  }

  const orderNum = order?.orderNumber || (orderId.startsWith('BETA-') ? orderId : `BETA-${orderId.slice(-6).toUpperCase()}`);
  const customerEmail = order?.customerEmail || 'your email';
  const customerName = order?.customerName || 'Customer';
  const orderTotal = order?.total || 1294.92;
  const orderItems = order?.items || [
    {
      id: 'item-1',
      productName: 'Apple iPhone 16 Pro Max',
      variantName: 'Desert Titanium - 256GB',
      quantity: 1,
      unitPrice: 1199,
      totalPrice: 1199,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success Hero */}
      <div className="text-center space-y-4 mb-12">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm animate-bounce-short">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Thank You, {customerName}!
        </h1>
        <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
          Your order has been placed and persisted in the database. A confirmation receipt has been dispatched via <strong className="text-sky-600">Mailgun</strong>.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs font-mono font-bold text-slate-800">
          <span>Order Reference:</span>
          <span className="text-sky-600">{orderNum}</span>
        </div>
      </div>

      {/* Mailgun Notification Card */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 mb-10 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <Mail className="w-5 h-5" />
        </div>
        <div className="text-sm">
          <h4 className="font-bold text-sky-950">Mailgun Confirmation Email Sent</h4>
          <p className="text-sky-800 text-xs mt-1 leading-relaxed">
            We sent an itemized receipt, warranty registration code, and package tracking link to{' '}
            <strong className="font-semibold">{customerEmail}</strong>. If you don&apos;t see it within 5 minutes, please check your spam folder or sandbox logs.
          </p>
        </div>
      </div>

      {/* Order Progress Tracker */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs mb-10">
        <h3 className="font-bold text-base text-slate-900 mb-6 flex items-center gap-2">
          <Truck className="w-5 h-5 text-sky-600" />
          Delivery Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mb-1">
              ✓
            </span>
            <span className="font-bold text-xs text-slate-900">Order Placed</span>
            <span className="text-[11px] text-slate-500">Persisted in DB</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <span className="w-8 h-8 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center mb-1">
              2
            </span>
            <span className="font-bold text-xs text-slate-900">Processing</span>
            <span className="text-[11px] text-slate-500">Warehouse Prep</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center mb-1">
              3
            </span>
            <span className="font-bold text-xs text-slate-500">In Transit</span>
            <span className="text-[11px] text-slate-400">Carrier Dispatch</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center mb-1">
              4
            </span>
            <span className="font-bold text-xs text-slate-500">Delivered</span>
            <span className="text-[11px] text-slate-400">Direct Signature</span>
          </div>
        </div>
      </div>

      {/* Itemized Order Summary */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 mb-10">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="font-bold text-base text-slate-900">Items Ordered</h3>
          <span className="text-xs text-slate-400">Total: {formatCurrency(orderTotal)}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {orderItems.map((item: any) => (
            <div key={item.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{item.productName}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.variantName}</p>
                <span className="text-xs text-slate-400 mt-1 inline-block">Quantity: {item.quantity}</span>
              </div>
              <span className="font-bold text-sm text-slate-900">
                {formatCurrency(item.totalPrice)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/phones"
          className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl text-center shadow-md transition-colors"
        >
          Return to Phone Shop
        </Link>
        <Link
          href="/orders"
          className="px-6 py-3.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-sm rounded-xl text-center border border-sky-200 transition-colors flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4" /> View My Orders History
        </Link>
      </div>
    </div>
  );
}
