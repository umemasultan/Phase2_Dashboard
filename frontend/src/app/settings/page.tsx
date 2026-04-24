'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { getCurrentUserFromToken, removeToken } from '@/lib/auth';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const userInfo = getCurrentUserFromToken();
    if (!userInfo) {
      router.push('/auth/login');
      return;
    }

    setUser(userInfo);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 ml-64">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
              <p className="text-gray-300">Manage your account settings and preferences</p>
            </div>

            {/* Account Information Card */}
            <div className="glass-card p-6 mb-6 animate-fadeInUp">
              <h2 className="text-2xl font-semibold text-white mb-4">Account Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <div className="glass-input p-3 rounded-lg">
                    <p className="text-white">{user?.email || 'Not available'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">User ID</label>
                  <div className="glass-input p-3 rounded-lg">
                    <p className="text-white">{user?.userId || 'Not available'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Expiration</label>
                  <div className="glass-input p-3 rounded-lg">
                    <p className="text-white">
                      {user?.exp ? new Date(user.exp * 1000).toLocaleString() : 'Not available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="glass-card p-6 mb-6 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <h2 className="text-2xl font-semibold text-white mb-4">Preferences</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Theme</h3>
                    <p className="text-gray-400 text-sm">Current theme: Professional Dark</p>
                  </div>
                  <div className="glass-input px-4 py-2 rounded-lg">
                    <span className="text-white">Dark Mode</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Language</h3>
                    <p className="text-gray-400 text-sm">Display language</p>
                  </div>
                  <div className="glass-input px-4 py-2 rounded-lg">
                    <span className="text-white">English</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone Card */}
            <div className="glass-card p-6 border border-red-500/30 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-semibold text-red-400 mb-4">Danger Zone</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Logout</h3>
                    <p className="text-gray-400 text-sm">Sign out of your account</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300 border border-red-500/30"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
