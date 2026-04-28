'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/types/task';
import Button from './Button';
import { removeToken } from '@/lib/auth';
import { authApi } from '@/lib/api';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const pathname = usePathname();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Get theme context
  const { theme, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch user info from API when token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser({
            ...userData,
            name: 'Umema Sultan'
          });
        } catch (error) {
          console.error('Error fetching user:', error);
          removeToken();
          window.location.href = '/auth/login';
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
    {
      name: 'Dashboard',
      href: '/',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      badge: null
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      badge: null
    },
  ];

  const notifications = [
    { id: 1, title: 'New task assigned', message: 'You have been assigned to "Q2 Report"', time: '5m ago', unread: true },
    { id: 2, title: 'Task completed', message: 'John completed "Design Review"', time: '1h ago', unread: true },
    { id: 3, title: 'Deadline approaching', message: '"Marketing Campaign" due in 2 days', time: '3h ago', unread: false },
  ];

  return (
    <nav className={`border-b transition-all duration-700 backdrop-blur-[60px] sticky top-0 z-50 ${
      isScrolled
        ? 'border-border/30 bg-background/98 shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
        : 'border-border/10 bg-gradient-to-r from-background/99 via-background to-background/99 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
    }`}>
      <div className="px-6 lg:px-12">
        <div className={`max-w-[1920px] mx-auto grid grid-cols-[auto_1fr_auto] gap-6 items-center transition-all duration-700 ${
          isScrolled ? 'h-18' : 'h-20'
        }`}>
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition-all duration-700 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 via-primary/40 to-primary/50 blur-2xl rounded-2xl animate-pulse opacity-75"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/20 blur-lg rounded-xl"></div>
              <div className={`relative bg-gradient-to-br from-primary via-primary/99 to-primary/90 flex items-center justify-center shadow-[0_16px_48px_rgba(0,0,0,0.3)] rounded-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 border border-primary/30 ${
                isScrolled ? 'w-11 h-11' : 'w-12 h-12'
              }`}>
                <svg className={`text-primary-foreground drop-shadow-2xl transition-all duration-700 ${
                  isScrolled ? 'w-6 h-6' : 'w-7 h-7'
                }`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`font-black text-transparent bg-gradient-to-r from-foreground via-foreground/95 to-foreground/90 bg-clip-text tracking-tight leading-none drop-shadow-lg transition-all duration-700 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>TaskFlow</span>
              <span className="text-[7px] text-muted-foreground font-bold uppercase tracking-[0.2em] opacity-70">Enterprise Edition</span>
            </div>
          </Link>

          {/* Center: Navigation + Search */}
          <div className="flex items-center justify-center gap-8">
            {/* Navigation Links */}
            {user && (
              <div className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative"
                  >
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-500 ${
                      pathname === link.href
                        ? 'bg-primary/15 text-primary shadow-[0_0_16px_rgba(var(--primary),0.15)]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}>
                      <svg className={`transition-all duration-500 ${
                        pathname === link.href ? 'w-4 h-4' : 'w-3.5 h-3.5 group-hover:w-4 group-hover:h-4'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                      </svg>
                      <span className="text-xs font-bold tracking-wide">
                        {link.name}
                      </span>
                    </div>
                    {pathname === link.href && (
                      <div className="absolute -bottom-[37px] left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-[0_0_12px_rgba(var(--primary),0.8)]"></div>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* Search Bar */}
            {user && (
              <div className="hidden xl:flex flex-1 max-w-md">
                <div className={`relative w-full transition-all duration-500 ${searchFocused ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`relative w-full px-4 py-2 bg-secondary/50 border rounded-lg text-sm font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:bg-secondary/80 transition-all duration-500 ${
                      searchFocused ? 'border-primary/50 shadow-[0_0_24px_rgba(var(--primary),0.2)]' : 'border-border/20'
                    }`}
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Right: User Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 hover:bg-secondary/95 rounded-lg transition-all duration-500 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-border/10 hover:border-primary/40 hover:scale-110 group"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500 drop-shadow-xl relative z-10 group-hover:rotate-180 transition-transform duration-700" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 drop-shadow-xl relative z-10 group-hover:-rotate-12 transition-transform duration-700" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Notifications */}
            {user && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2.5 hover:bg-secondary/95 rounded-lg transition-all duration-500 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-border/10 hover:border-primary/40 hover:scale-110 group"
                  aria-label="Notifications"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="w-4.5 h-4.5 text-foreground drop-shadow-xl relative z-10 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background animate-pulse"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-background/98 backdrop-blur-xl border border-border/20 rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-3 border-b border-border/10 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-foreground">Notifications</h3>
                      <button className="text-[10px] text-primary font-semibold hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-3 border-b border-border/5 hover:bg-secondary/30 transition-colors cursor-pointer ${notif.unread ? 'bg-primary/5' : ''}`}>
                          <div className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${notif.unread ? 'bg-primary' : 'bg-transparent'}`}></div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-foreground">{notif.title}</p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">{notif.message}</p>
                              <p className="text-[9px] text-muted-foreground/70 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center border-t border-border/10">
                      <button className="text-[10px] text-primary font-semibold hover:underline">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {user ? (
              <>
                {/* User Profile with Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="hidden sm:flex items-center gap-2 pl-3 pr-2 py-1.5 ml-2 border-l border-border/20 hover:bg-secondary/50 rounded-lg transition-all duration-500 group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className={`text-foreground font-bold leading-tight tracking-tight transition-all duration-500 ${
                          isScrolled ? 'text-xs' : 'text-sm'
                        }`}>{user.name}</span>
                        <span className="text-[8px] text-muted-foreground font-semibold uppercase tracking-wider opacity-70">Admin</span>
                      </div>
                      <div className="relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-primary/30 to-primary/40 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className={`relative bg-gradient-to-br from-primary via-primary/99 to-primary/90 flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.25)] rounded-md border border-primary/30 transition-all duration-500 ${
                          isScrolled ? 'w-9 h-9' : 'w-10 h-10'
                        }`}>
                          <span className={`text-primary-foreground font-black drop-shadow-2xl transition-all duration-500 ${
                            isScrolled ? 'text-base' : 'text-lg'
                          }`}>
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <svg className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-background/98 backdrop-blur-xl border border-border/20 rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="p-3 border-b border-border/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/99 to-primary/90 flex items-center justify-center rounded-md border border-primary/30 shadow-lg">
                            <span className="text-primary-foreground font-black text-lg">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground">{user.name}</p>
                            <p className="text-[10px] text-muted-foreground">{user.email || 'admin@taskflow.com'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-1.5">
                        <Link href="/profile" className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-secondary/60 rounded-md transition-colors group">
                          <svg className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-xs font-medium text-foreground">My Profile</span>
                        </Link>
                        <Link href="/settings" className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-secondary/60 rounded-md transition-colors group">
                          <svg className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs font-medium text-foreground">Settings</span>
                        </Link>
                        <Link href="/help" className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-secondary/60 rounded-md transition-colors group">
                          <svg className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs font-medium text-foreground">Help & Support</span>
                        </Link>
                      </div>
                      <div className="p-1.5 border-t border-border/10">
                        <Link href="/auth/login" onClick={handleLogout}>
                          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-red-500/10 text-red-500 rounded-md transition-colors group">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-xs font-semibold">Logout</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="px-5 py-2 text-foreground text-xs font-bold hover:bg-secondary/95 hover:scale-105 transition-all duration-500 rounded-lg tracking-wide border border-border/20 hover:border-border/40">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="relative px-5 py-2 bg-gradient-to-r from-primary via-primary/99 to-primary/95 text-primary-foreground text-xs font-bold hover:opacity-90 hover:scale-105 transition-all duration-500 shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(var(--primary),0.4)] rounded-lg tracking-wide border border-primary/30 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">Get Started</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}