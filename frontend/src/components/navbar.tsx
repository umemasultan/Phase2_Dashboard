'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/types/task';
import Button from './Button';
import { removeToken } from '@/lib/auth';
import { authApi } from '@/lib/api';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  // Safely get theme context with fallback
  let theme = 'light';
  let toggleTheme = () => {};

  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (e) {
    // ThemeProvider not available yet, use defaults
  }

  // Fetch user info from API when token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch actual user info from API
          const userData = await authApi.getCurrentUser();
          // Update name to "Umema Sultan" as requested
          setUser({
            ...userData,
            name: 'Umema Sultan'
          });
        } catch (error) {
          console.error('Error fetching user:', error);
          // If authentication fails, clear the token and redirect to login
          removeToken(); // Remove invalid token
          window.location.href = '/auth/login'; // Redirect to login
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

  const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'All Tasks', href: '/tasks' },
  ];

  return (
    <nav className="relative bg-white/70 dark:bg-gray-700/70 backdrop-blur-2xl border-b border-white/20 dark:border-gray-600/50 transition-all duration-500 sticky top-0 z-50 shadow-2xl">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] animate-gradient"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1 min-w-0">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#050E3C] to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#050E3C] via-purple-600 to-[#050E3C] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-black text-lg sm:text-xl">T</span>
                </div>
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] dark:from-[#393E46] dark:via-purple-400 dark:to-[#393E46] bg-clip-text text-transparent truncate">
                TaskManager
              </span>
            </Link>
            <div className="hidden md:flex md:ml-6 lg:ml-10 md:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 overflow-hidden group whitespace-nowrap ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {pathname === link.href && (
                    <span className="absolute inset-0 bg-gradient-to-r from-[#050E3C] to-purple-600 rounded-xl"></span>
                  )}
                  <span className="relative z-10">{link.name}</span>
                  {pathname !== link.href && (
                    <span className="absolute inset-0 bg-gray-100 dark:bg-gray-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="relative p-2 sm:p-2.5 rounded-xl text-gray-500 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#050E3C] hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110 group overflow-hidden"
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 bg-gray-100 dark:bg-gray-600 rounded-xl opacity-0 group-hover:opacity-0 transition-opacity"></span>
              <span className="relative z-10">
                {theme === 'light' ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </span>
            </button>
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#050E3C]/5 to-purple-50 dark:from-[#050E3C]/20 dark:to-purple-900/20 rounded-xl border border-[#050E3C]/20 dark:border-purple-700/50">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050E3C] to-purple-600 rounded-full blur opacity-50"></div>
                    <div className="relative w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-[#050E3C] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs sm:text-sm font-bold">{user.name.charAt(0)}</span>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="relative px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden group whitespace-nowrap"
                >
                  <span className="relative z-10">Logout</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button href="/auth/login" variant="outline" size="sm">
                  Log in
                </Button>
                <Button href="/auth/signup" variant="primary" size="sm">
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}