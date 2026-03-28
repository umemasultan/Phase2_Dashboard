'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { taskApi } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import Button from '@/components/Button';
import { getToken } from '@/lib/auth';

export default function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!getToken()) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      // Use the standard create endpoint which automatically assigns the task to the authenticated user
      await taskApi.create({
        title: title.trim(),
        description: description.trim() || '',
        status
      });

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transition-all duration-500">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-[#050E3C] dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 mb-5 transition-colors font-semibold"
            >
              ← Back to Dashboard
            </Link>

            <TaskForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              status={status}
              setStatus={setStatus}
              error={error}
              onSubmit={handleSubmit}
              submitText="Create Task"
            />
            <div className="mt-4">
              <Button href="/" variant="outline" size="md">
                Cancel
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}