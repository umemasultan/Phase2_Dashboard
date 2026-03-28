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
  const taskId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

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

        // Get current user ID and use the new API endpoint
        const userId = getCurrentUserIdFromToken();
        let data;
        if (userId) {
          // Use the new spec-compliant API endpoint
          data = await taskApi.getForUser(userId, taskId);
        } else {
          // Fallback to the old endpoint if we can't get user ID
          data = await taskApi.getById(taskId);
        }
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || '');
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching task:', error);
        if (error instanceof Error && error.message.includes('404')) {
          setTask(null);
        } else if (error instanceof Error && (error.message.includes('Unauthorized') || error.message.includes('401'))) {
          // Redirect to login if unauthorized
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
      // Get current user ID and use the new API endpoint
      const userId = getCurrentUserIdFromToken();
      let updatedTask;
      if (userId) {
        // Use the new spec-compliant API endpoint
        updatedTask = await taskApi.updateForUser(userId, taskId, {
          title: title.trim(),
          description: description.trim() || '',
          status
        });
      } else {
        // Fallback to the old endpoint if we can't get user ID
        updatedTask = await taskApi.update(taskId, {
          title: title.trim(),
          description: description.trim() || '',
          status
        });
      }
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
      // Get current user ID and use the new API endpoint
      const userId = getCurrentUserIdFromToken();
      if (userId) {
        // Use the new spec-compliant API endpoint
        await taskApi.deleteForUser(userId, taskId);
      } else {
        // Fallback to the old endpoint if we can't get user ID
        await taskApi.delete(taskId);
      }

      // Navigate back to dashboard
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-purple-800/20 dark:to-indigo-800/20 transition-all duration-500">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Loading task...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-purple-800/20 dark:to-indigo-800/20 transition-all duration-500">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 dark:text-red-400">Task not found</p>
              <Link href="/" className="text-[#15173D] dark:text-purple-400 hover:underline mt-4 inline-block">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

            {error && (
              <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
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
              <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-xl p-5 transition-colors border border-gray-200 dark:border-gray-600">
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
                </div>

                <div className="mb-5">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">{task.description}</p>
                </div>

                <div className="mb-5">
                  <div className="flex flex-wrap items-center">
                    <span className="mr-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                    </span>
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        task.status === 'pending'
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                          : task.status === 'in-progress'
                            ? 'bg-gradient-to-r from-[#050E3C] to-purple-600 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      }`}
                    >
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Created At</p>
                    <p className="text-sm text-gray-900 dark:text-white">{task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Last Updated</p>
                    <p className="text-sm text-gray-900 dark:text-white">{task.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'N/A'}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={async () => {
                      try {
                        const userId = getCurrentUserIdFromToken();
                        if (userId) {
                          await taskApi.toggleComplete(userId, taskId);
                          const updatedTask = await taskApi.getForUser(userId, taskId);
                          setTask(updatedTask);
                          setStatus(updatedTask.status);
                        } else {
                          const newStatus = status === 'completed' ? 'pending' : 'completed';
                          setStatus(newStatus);
                          const updatedTask = await taskApi.update(taskId, {
                            title: title.trim(),
                            description: description.trim() || '',
                            status: newStatus
                          });
                          setTask(updatedTask);
                        }
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