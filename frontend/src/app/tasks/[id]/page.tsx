'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Task } from '@/types/task';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { taskApi } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import Button from '@/components/Button';
import { getCurrentUserIdFromToken } from '@/lib/auth';

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const taskId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id || '0', 10);

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch task from API
  useEffect(() => {
    const fetchTask = async () => {
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

        // Use spec-compliant API endpoint: GET /api/{user_id}/tasks/{id}
        const data = await taskApi.getForUser(userId, taskId);
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || '');
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching task:', error);
        if (error instanceof Error && error.message.includes('404')) {
          setTask(null);
        } else if (error instanceof Error && (error.message.includes('Unauthorized') || error.message.includes('401'))) {
          router.push('/auth/login');
        } else {
          setError(error instanceof Error ? error.message : 'An error occurred while fetching the task');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, router]);

  const handleSave = async () => {
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

      // Use spec-compliant API endpoint: PUT /api/{user_id}/tasks/{id}
      const updatedTask = await taskApi.updateForUser(userId, taskId, {
        title: title.trim(),
        description: description.trim() || '',
        status
      });
      setTask(updatedTask);
      setIsEditing(false);
      setError('');
    } catch (err: any) {
      if (err.message && (err.message.includes('Unauthorized') || err.message.includes('401'))) {
        router.push('/auth/login');
      } else {
        setError(err.message || 'An error occurred while saving the task');
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
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

      // Use spec-compliant API endpoint: DELETE /api/{user_id}/tasks/{id}
      await taskApi.deleteForUser(userId, taskId);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      if (err.message && (err.message.includes('Unauthorized') || err.message.includes('401'))) {
        router.push('/auth/login');
      } else {
        setError(err.message || 'An error occurred while deleting the task');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg transition-all duration-500">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="glass-card p-8 rounded-3xl">
              <svg className="animate-spin h-12 w-12 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-white/70 text-center mt-4 font-medium">Loading task...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen gradient-bg transition-all duration-500">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="glass-card p-12 rounded-3xl text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black gradient-text mb-3">Task not found</h3>
              <p className="text-white/70 mb-6">The task you're looking for doesn't exist</p>
              <Link href="/">
                <button className="btn-premium">
                  <span className="relative z-10">Back to Dashboard</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

            {error && (
              <div className="mb-4 sm:mb-6 rounded-lg glass-card bg-red-500/20 border-red-500/30 p-3 sm:p-4 animate-slideInRight">
                <div className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm text-red-200 font-medium">{error}</span>
                </div>
              </div>
            )}

            {isEditing ? (
              <TaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                status={status}
                setStatus={setStatus}
                error={error}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                submitText="Save Changes"
                isEditing={true}
                onCancel={() => {
                  setIsEditing(false);
                  setTitle(task.title);
                  setDescription(task.description || '');
                  setStatus(task.status);
                  setError('');
                }}
              />
            ) : (
              <div className="glass-card card-padding transition-all duration-500">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-black gradient-text mb-2">{task.title}</h2>
                  <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"></div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{task.description || 'No description provided'}</p>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xs sm:text-sm font-semibold text-muted-foreground">Status:</span>
                    <span
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold ${
                        task.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : task.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}
                    >
                      {task.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="glass-card p-3 sm:p-4 rounded-lg">
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider">Created At</p>
                    <p className="text-xs sm:text-sm text-foreground font-medium">{task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}</p>
                  </div>
                  <div className="glass-card p-3 sm:p-4 rounded-lg">
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold mb-1 uppercase tracking-wider">Last Updated</p>
                    <p className="text-xs sm:text-sm text-foreground font-medium">{task.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'N/A'}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-items pt-4 sm:pt-6 border-t border-border">
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="secondary"
                    size="md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Task
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        const userId = getCurrentUserIdFromToken();
                        if (!userId) {
                          setError('Unable to get user ID. Please login again.');
                          router.push('/auth/login');
                          return;
                        }

                        // Use spec-compliant API endpoint: PATCH /api/{user_id}/tasks/{id}/complete
                        await taskApi.toggleComplete(userId, taskId);
                        const updatedTask = await taskApi.getForUser(userId, taskId);
                        setTask(updatedTask);
                        setStatus(updatedTask.status);
                      } catch (err: any) {
                        if (err.message && (err.message.includes('Unauthorized') || err.message.includes('401'))) {
                          router.push('/auth/login');
                        } else {
                          setError(err.message || 'An error occurred while updating the task');
                        }
                      }
                    }}
                    variant={status === 'completed' ? 'secondary' : 'primary'}
                    size="md"
                  >
                    {status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="danger"
                    size="md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Task
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}