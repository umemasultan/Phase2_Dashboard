'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Task } from '@/types/task';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { taskApi } from '@/lib/api';
import TaskCard from '@/components/TaskCard';
import FilterBar from '@/components/FilterBar';
import Button from '@/components/Button';
import { getCurrentUserIdFromToken } from '@/lib/auth';

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login if no token
          router.push('/auth/login');
          return;
        }

        // Get current user ID from token
        const userId = getCurrentUserIdFromToken();
        if (!userId) {
          // If we can't get user ID from token, fetch it from the API
          // For now, we'll use the existing endpoint but in a real implementation
          // we would call an endpoint to get the current user's information
          const statusFilter = filter !== 'all' ? filter : undefined;
          const data = await taskApi.getAll(statusFilter);
          setTasks(data);
        } else {
          // Use the new spec-compliant API endpoint
          const statusFilter = filter !== 'all' ? filter : undefined;
          const data = await taskApi.getAllForUser(userId, statusFilter);
          setTasks(data);
        }
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching tasks:', error);
        // If it's an authentication error, redirect to login
        if (error.message && (error.message.includes('Unauthorized') || error.message.includes('401'))) {
          router.push('/auth/login');
        }
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filter]);

  // Tasks are already filtered by the backend API
  const filteredTasks = tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-purple-800/20 dark:to-indigo-800/20 transition-all duration-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#050E3C]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#050E3C]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />
      <div className="flex relative z-10">
        <Sidebar />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Section with enhanced design */}
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#050E3C]/20 via-purple-600/20 to-[#050E3C]/20 dark:from-[#050E3C]/10 dark:via-purple-500/10 dark:to-[#050E3C]/10 rounded-2xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/90 dark:bg-gray-700/90 backdrop-blur-2xl rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/30 dark:border-gray-600/30 hover:shadow-[0_20px_80px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#050E3C]/10 via-purple-500/10 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#050E3C]/10 via-purple-500/10 to-transparent rounded-2xl"></div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-[#050E3C] via-purple-600 to-[#050E3C] rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#050E3C] via-purple-600 to-[#050E3C] dark:from-[#393E46] dark:via-purple-400 dark:to-[#393E46] bg-clip-text text-transparent animate-gradient truncate">
                        Dashboard
                      </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg flex items-center gap-2 truncate">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                      <span className="truncate">Manage your tasks with style and efficiency</span>
                    </p>
                  </div>
                  <Button href="/tasks/new" variant="primary" size="md" className="flex-shrink-0">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Task
                  </Button>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'Total', value: filteredTasks.length, icon: '📊', color: 'from-[#050E3C] to-purple-500' },
                    { label: 'Pending', value: filteredTasks.filter(t => t.status === 'pending').length, icon: '⏳', color: 'from-yellow-500 to-orange-500' },
                    { label: 'Progress', value: filteredTasks.filter(t => t.status === 'in-progress').length, icon: '⚡', color: 'from-[#050E3C] to-purple-500' },
                    { label: 'Done', value: filteredTasks.filter(t => t.status === 'completed').length, icon: '✅', color: 'from-green-500 to-emerald-500' },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="relative group/stat min-w-0"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur opacity-20 group-hover/stat:opacity-40 transition-opacity`}></div>
                      <div className="relative bg-white/60 dark:bg-gray-700/60 backdrop-blur-xl rounded-xl p-3 border border-white/40 dark:border-gray-600/40 hover:scale-105 transition-transform duration-300 overflow-hidden">
                        <div className="text-xl mb-1">{stat.icon}</div>
                        <div className={`text-xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent truncate`}>
                          {stat.value}
                        </div>
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider truncate">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <FilterBar currentFilter={filter} onFilterChange={setFilter} />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-24">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050E3C] to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative inline-block animate-spin rounded-full h-14 w-14 border-4 border-transparent bg-gradient-to-r from-[#050E3C] to-purple-600 bg-clip-border">
                    <div className="absolute inset-1 bg-white dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-5 text-base font-medium">Loading your tasks...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="animate-fadeInUp"
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            )}

            {filteredTasks.length === 0 && !loading && (
              <div className="text-center py-24">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050E3C]/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
                  <div className="relative inline-block p-6 sm:p-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-600/50">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#050E3C] to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                      <svg className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto text-gray-400 dark:text-gray-600 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg font-semibold mb-5">No tasks found</p>
                    <Link href="/tasks/new" className="inline-flex items-center text-sm sm:text-base font-semibold text-transparent bg-gradient-to-r from-[#050E3C] to-purple-600 bg-clip-text hover:from-[#050E3C]/90 hover:to-purple-700 transition-all">
                      Create your first task
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}