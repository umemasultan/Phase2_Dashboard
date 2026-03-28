'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { authApi } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use the API client
      const data = await authApi.login({ email, password });
      setToken(data.access_token);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-purple-800/20 dark:to-indigo-800/20 flex flex-col transition-all duration-500">
      <Navbar />
      <div className="flex items-center justify-center flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h2 className="mt-4 text-center text-2xl font-black bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] dark:from-[#393E46] dark:via-purple-400 dark:to-[#393E46] bg-clip-text text-transparent">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-3 border-l-4 border-red-500">
                <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
              </div>
            )}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-lg shadow-sm space-y-3">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p>First time? Try: test@example.com / password123</p>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-[#050E3C] to-purple-600 hover:from-[#050E3C]/90 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-[#050E3C] dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}