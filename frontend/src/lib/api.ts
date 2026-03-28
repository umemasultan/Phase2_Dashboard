

// API client for interacting with the backend
// All requests will include JWT token from localStorage
import { Task, User, convertApiTaskToFrontendTask, convertApiUserToFrontendUser } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function to get token from localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Generic request function that adds JWT header
const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // If response is 401, remove token - client components will handle redirect
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    // Provide more detailed error message
    const errorText = await response.text().catch(() => '');
    throw new Error(`Unauthorized: ${errorText || 'Authentication required'}`);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  // Convert date fields from API response to proper Date objects based on the endpoint
  if (endpoint.includes('/api/tasks') && !endpoint.includes('/auth')) {
    // Handle task responses - check if it's likely a task response
    if (Array.isArray(data)) {
      // Handle array of tasks - verify first element has task properties
      if (data.length > 0 && typeof data[0] === 'object' && data[0] &&
          'id' in data[0] && 'title' in data[0] && 'status' in data[0]) {
        return data.map(task => convertApiTaskToFrontendTask(task));
      }
    } else if (data && typeof data === 'object' &&
               'id' in data && 'title' in data && 'status' in data) {
      // Handle single task - ensure it has all required task properties
      return convertApiTaskToFrontendTask(data);
    }
  } else if (endpoint.includes('/api/auth') && endpoint.includes('/me')) {
    // Handle user profile response - verify it has user properties
    if (data && typeof data === 'object' && 'id' in data && 'email' in data) {
      return convertApiUserToFrontendUser(data);
    }
  }

  return data;
};

// Auth API functions (these don't require authentication)
const authRequest = async (endpoint: string, options: RequestInit = {}) => {
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Handle 401 in auth endpoints as well (shouldn't happen, but just in case)
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      const errorText = await response.text().catch(() => '');
      throw new Error(`Unauthorized: ${errorText || 'Authentication required'}`);
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Task API functions
export const taskApi = {
  getAll: (statusFilter?: string): Promise<Task[]> => {
    // This endpoint uses the authenticated user from the JWT token automatically
    // The backend extracts the user ID from the JWT and returns only that user's tasks
    const url = statusFilter ? `/api/tasks?status_filter=${statusFilter}` : '/api/tasks';
    return request(url);
  },

  getById: (id: number): Promise<Task> => request(`/api/tasks/${id}`),

  create: (taskData: { title: string; description?: string; status?: string }): Promise<Task> =>
    request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),

  update: (id: number, taskData: { title: string; description?: string; status?: string }): Promise<Task> =>
    request(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }),

  delete: (id: number): Promise<void> =>
    request(`/api/tasks/${id}`, {
      method: 'DELETE',
    }),

  // New API functions that match the spec
  getAllForUser: (userId: number, statusFilter?: string): Promise<Task[]> => {
    const url = statusFilter
      ? `/api/${userId}/tasks?status_filter=${statusFilter}`
      : `/api/${userId}/tasks`;
    return request(url);
  },

  getForUser: (userId: number, taskId: number): Promise<Task> =>
    request(`/api/${userId}/tasks/${taskId}`),

  createForUser: (userId: number, taskData: { title: string; description?: string; status?: string }): Promise<Task> =>
    request(`/api/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),

  updateForUser: (userId: number, taskId: number, taskData: { title: string; description?: string; status?: string }): Promise<Task> =>
    request(`/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }),

  deleteForUser: (userId: number, taskId: number): Promise<void> =>
    request(`/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    }),

  toggleComplete: (userId: number, taskId: number): Promise<Task> =>
    request(`/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
    }),
};

// Auth API functions (public - no token required)
export const authApi = {
  login: (credentials: { email: string; password: string }): Promise<{ access_token: string }> =>
    authRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData: { name: string; email: string; password: string }): Promise<{ access_token: string }> =>
    authRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getCurrentUser: (): Promise<User> => request('/api/auth/me'),
};