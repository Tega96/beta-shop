import Link from 'next/link';
import { Smartphone, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
        <Smartphone className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 mt-2 max-w-md">
        The smartphone or page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 shadow-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Storefront
      </Link>
    </div>
  );
}
