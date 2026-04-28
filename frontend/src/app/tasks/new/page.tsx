'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { taskApi } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import Button from '@/components/Button';
import { getToken, getCurrentUserIdFromToken } from '@/lib/auth';

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
      // Get current user ID from token
      const userId = getCurrentUserIdFromToken();
      if (!userId) {
        setError('Unable to get user ID. Please login again.');
        router.push('/auth/login');
        return;
      }

      // Use spec-compliant API endpoint: POST /api/{user_id}/tasks
      await taskApi.createForUser(userId, {
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
    <div className="min-h-screen gradient-bg transition-all duration-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <Navbar />
      <div className="flex relative z-10">
        <Sidebar />
        <main className="flex-1 container-padding section-spacing">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-foreground hover:text-primary mb-4 sm:mb-6 transition-colors font-semibold glass-card px-3 sm:px-4 py-2 rounded-lg hover:shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>

            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text mb-2">Create New Task</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Add a new task to your workflow</p>
            </div>

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
          </div>
        </main>
      </div>
    </div>
  );
}