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

export default function TasksPage() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Tasks</h1>
                <Button href="/tasks/new" variant="primary" size="md">
                  New Task
                </Button>
              </div>
              <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}

            {filteredTasks.length === 0 && !loading && (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No tasks found. <Link href="/tasks/new" className="text-blue-600 dark:text-blue-400 hover:underline">Create one?</Link></p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}