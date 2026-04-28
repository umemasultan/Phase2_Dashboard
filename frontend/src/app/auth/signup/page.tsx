'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { authApi } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await authApi.register({ name, email, password });
      setToken(data.access_token);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col transition-all duration-500">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="flex items-center justify-center flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-6 sm:space-y-8 animate-fadeInUp">
          {/* Premium Glass Card */}
          <div className="glass-card p-6 sm:p-10 shadow-glow-lg">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-black mb-2">
                <span className="gradient-text">Create Account</span>
              </h2>
              <p className="text-white/70 text-xs sm:text-sm">Join us and start managing your tasks</p>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="glass-card bg-red-500/20 border-red-500/30 p-4 rounded-2xl animate-slideInRight">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-200 font-medium">{error}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-premium w-full text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email-address" className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-premium w-full text-sm sm:text-base"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-premium w-full text-sm sm:text-base"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-xs sm:text-sm font-semibold text-white/90 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-premium w-full text-sm sm:text-base"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 mt-1 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="terms" className="ml-3 text-xs sm:text-sm text-white/70">
                  I agree to the{' '}
                  <Link href="#" className="text-white font-semibold hover:text-white/90">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-white font-semibold hover:text-white/90">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-premium w-full relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-white/70">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-white hover:text-white/90 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="glass-card p-3 sm:p-4 rounded-lg sm:rounded-2xl">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🚀</div>
              <p className="text-[10px] sm:text-xs text-white/70 font-medium">Fast Setup</p>
            </div>
            <div className="glass-card p-3 sm:p-4 rounded-lg sm:rounded-2xl">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🔒</div>
              <p className="text-[10px] sm:text-xs text-white/70 font-medium">Secure</p>
            </div>
            <div className="glass-card p-3 sm:p-4 rounded-lg sm:rounded-2xl">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">✨</div>
              <p className="text-[10px] sm:text-xs text-white/70 font-medium">Free Forever</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}