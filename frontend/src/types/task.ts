// Raw task data from API (with string dates)
export interface ApiTask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  created_at: string; // API returns dates as strings
  updated_at: string; // API returns dates as strings
}

// Task type for use in components (with Date objects)
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to convert API task to frontend task
export const convertApiTaskToFrontendTask = (apiTask: ApiTask): Task => {
  return {
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description,
    status: apiTask.status,
    createdAt: new Date(apiTask.created_at),
    updatedAt: new Date(apiTask.updated_at),
  };
};

// Raw user data from API (with string dates)
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// User type for use in components (with Date objects)
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to convert API user to frontend user
export const convertApiUserToFrontendUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    createdAt: new Date(apiUser.created_at),
    updatedAt: new Date(apiUser.updated_at),
  };
};