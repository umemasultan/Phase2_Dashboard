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
          router.push('/auth/login');
          return;
        }

        // Get current user ID from token
        const userId = getCurrentUserIdFromToken();
        if (!userId) {
          console.error('Unable to get user ID from token');
          router.push('/auth/login');
          return;
        }

        // Use spec-compliant API endpoint: /api/{user_id}/tasks
        const statusFilter = filter !== 'all' ? filter : undefined;
        const data = await taskApi.getAllForUser(userId, statusFilter);
        setTasks(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching tasks:', error);
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Hero Section */}
            <div className="mb-4 sm:mb-6">
              <div className="glass-card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">
                      Dashboard
                    </h1>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Manage your tasks efficiently
                    </p>
                  </div>
                  <Link href="/tasks/new">
                    <button className="btn-premium w-full sm:w-auto">
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Task
                      </span>
                    </button>
                  </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="glass-card p-3 sm:p-4">
                    <div className="text-xl sm:text-2xl font-semibold text-primary">{tasks.length}</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs mt-1">Total Tasks</div>
                  </div>
                  <div className="glass-card p-3 sm:p-4">
                    <div className="text-xl sm:text-2xl font-semibold text-yellow-600 dark:text-yellow-500">{tasks.filter(t => t.status === 'pending').length}</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs mt-1">Pending</div>
                  </div>
                  <div className="glass-card p-3 sm:p-4">
                    <div className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-500">{tasks.filter(t => t.status === 'in-progress').length}</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs mt-1">In Progress</div>
                  </div>
                  <div className="glass-card p-3 sm:p-4">
                    <div className="text-xl sm:text-2xl font-semibold text-green-600 dark:text-green-500">{tasks.filter(t => t.status === 'completed').length}</div>
                    <div className="text-muted-foreground text-[10px] sm:text-xs mt-1">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="mb-4 sm:mb-6">
              <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            </div>

            {/* Tasks Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="glass-card p-6 sm:p-8">
                  <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-muted-foreground text-center mt-4 text-xs sm:text-sm">Loading tasks...</p>
                </div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="glass-card p-8 sm:p-12 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">Create your first task to get started!</p>
                <Link href="/tasks/new">
                  <button className="btn-premium">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Task
                    </span>
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}