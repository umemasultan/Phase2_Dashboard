'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { authApi } from '@/lib/api';
import { User } from '@/types/task';
import { getToken } from '@/lib/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center py-20">
            <div className="glass-card card-padding">
              <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-muted-foreground text-center mt-4 text-sm">Loading profile...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 container-padding section-spacing">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Profile</h1>
              <p className="text-muted-foreground text-sm">Manage your account settings</p>
            </div>

            {/* Profile Card */}
            <div className="glass-card card-padding mb-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary via-primary/99 to-primary/90 flex items-center justify-center rounded-xl border border-primary/30 shadow-lg">
                  <span className="text-primary-foreground font-black text-3xl sm:text-4xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                    Admin
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider">User ID</p>
                  <p className="text-sm text-foreground font-medium">{user.id}</p>
                </div>
                <div className="glass-card p-4">
                  <p className="text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider">Account Status</p>
                  <p className="text-sm text-green-600 dark:text-green-500 font-medium">Active</p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="glass-card card-padding mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="input-premium bg-secondary/50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="input-premium bg-secondary/50 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-card card-padding">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="glass-card p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary mb-1">0</div>
                  <div className="text-xs text-muted-foreground">Total Tasks</div>
                </div>
                <div className="glass-card p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-500 mb-1">0</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="glass-card p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-500 mb-1">0</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
                <div className="glass-card p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500 mb-1">0</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
