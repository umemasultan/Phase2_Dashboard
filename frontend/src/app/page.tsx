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
    <div className="min-h-screen gradient-bg transition-all duration-500">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Section */}
            <div className="mb-8 animate-fadeInUp">
              <div className="glass-card p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold gradient-text">
                          Dashboard
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                          Manage your tasks efficiently
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link href="/tasks/new">
                    <button className="btn-premium">
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Task
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="glass-card p-4 rounded-xl hover:shadow-glow transition-all">
                    <div className="text-3xl font-bold text-primary">{tasks.length}</div>
                    <div className="text-muted-foreground text-sm font-medium mt-1">Total Tasks</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl hover:shadow-glow transition-all">
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{tasks.filter(t => t.status === 'pending').length}</div>
                    <div className="text-muted-foreground text-sm font-medium mt-1">Pending</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl hover:shadow-glow transition-all">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-500">{tasks.filter(t => t.status === 'in-progress').length}</div>
                    <div className="text-muted-foreground text-sm font-medium mt-1">In Progress</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl hover:shadow-glow transition-all">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-500">{tasks.filter(t => t.status === 'completed').length}</div>
                    <div className="text-muted-foreground text-sm font-medium mt-1">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="mb-6">
              <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            </div>

            {/* Tasks Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="glass-card p-8 rounded-xl">
                  <svg className="animate-spin h-12 w-12 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-muted-foreground text-center mt-4 font-medium">Loading tasks...</p>
                </div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="glass-card p-12 rounded-xl text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">No tasks found</h3>
                <p className="text-muted-foreground mb-6">Create your first task to get started!</p>
                <Link href="/tasks/new">
                  <button className="btn-premium">
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Task
                    </span>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-fadeInUp"
                    style={{animationDelay: `${0.1 * (index + 1)}s`}}
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}