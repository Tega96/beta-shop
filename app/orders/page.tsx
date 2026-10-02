import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  Search,
  ArrowRight,
  ShieldCheck,
  User,
} from 'lucide-react';

interface OrdersPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const session = await getServerSession(authOptions);
  const searchOrder = searchParams.q?.trim();

  let orders: any[] = [];

  try {
    const where: any = {};

    if (searchOrder) {
      where.orderNumber = { contains: searchOrder, mode: 'insensitive' };
    } else if (session?.user?.email) {
      where.OR = [
        { customerEmail: session.user.email },
        { userId: (session.user as any)?.id },
      ];
    }

    if (Object.keys(where).length > 0) {
      orders = await prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      });
    }
  } catch (error) {
    console.warn('Could not query orders from database:', error);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order Tracking & History</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your recent phone purchases, shipments, and Mailgun confirmation receipts.
        </p>
      </div>

      {/* Order Lookup Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs mb-8">
        <form method="GET" action="/orders" className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="q"
              defaultValue={searchOrder || ''}
              placeholder="Search by order number (e.g. BETA-294812)..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
          >
            Track Order
          </button>
        </form>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">No Orders Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {searchOrder
              ? `We could not find an order matching "${searchOrder}". Please verify the number.`
              : !session
              ? 'Sign in with Google to view your saved order history, or search by order number above.'
              : "You haven't placed any orders with this account yet."}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            {!session && (
              <Link
                href="/auth/signin"
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Sign In with Google
              </Link>
            )}
            <Link
              href="/phones"
              className="px-5 py-2.5 bg-sky-600 text-white text-xs font-semibold rounded-xl hover:bg-sky-700 transition-colors"
            >
              Browse Smartphones
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-slate-900">
                      #{order.orderNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {order.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Placed on {formatDate(order.createdAt)} • Recipient: {order.customerName} ({order.customerEmail})
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Total Amount</span>
                  <span className="font-black text-xl text-sky-600">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">{item.productName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.variantName}</p>
                      <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-sm text-slate-900">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer info */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>Free Express Carrier Delivery</span>
                </div>
                {order.mailgunMessageId && (
                  <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Mailgun receipt dispatched</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
