'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Smartphone, ShieldCheck, ArrowRight, User } from 'lucide-react';

function SignInContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [demoName, setDemoName] = useState('Alex Johnson');
  const [demoEmail, setDemoEmail] = useState('alex.johnson@example.com');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  const handleDemoSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn('demo-login', {
      redirect: true,
      callbackUrl,
      email: demoEmail,
      name: demoName,
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to track orders, manage your cart, and enjoy seamless checkout.
          </p>
        </div>

        <div className="space-y-4">
          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase">Or quick test demo</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Quick Demo Login Form */}
          <form onSubmit={handleDemoSignIn} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Demo Name</label>
              <input
                type="text"
                value={demoName}
                onChange={(e) => setDemoName(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Demo Email</label>
              <input
                type="email"
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <User className="w-4 h-4" />
              {isLoading ? 'Signing in...' : 'Sign In as Demo User'}
            </button>
          </form>
        </div>

        <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-800">
          <div className="flex items-center gap-1.5 font-semibold text-sky-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            Google Cloud Console OAuth
          </div>
          Add your <code className="bg-sky-200/60 px-1 py-0.5 rounded font-mono text-[11px]">GOOGLE_CLIENT_ID</code> and <code className="bg-sky-200/60 px-1 py-0.5 rounded font-mono text-[11px]">GOOGLE_CLIENT_SECRET</code> to your <code className="bg-sky-200/60 px-1 py-0.5 rounded font-mono text-[11px]">.env</code> file to enable live Google authentication.
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-sky-600">
            Continue shopping as guest <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-slate-500">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
