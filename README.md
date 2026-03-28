# Task Manager Dashboard

A modern, full-stack task management application built with Next.js and FastAPI, featuring a beautiful UI with dark mode support.

## 🚀 Features

- **User Authentication** - Secure JWT-based authentication with login/signup
- **Task Management** - Create, read, update, and delete tasks
- **Status Tracking** - Track tasks with pending, in-progress, and completed states
- **Dark Mode** - Beautiful light and dark themes with smooth transitions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Dynamic task filtering and status updates
- **Modern UI** - Gradient designs, animations, and enhanced shadows

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - Modern state management

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **JWT** - Secure authentication tokens
- **Pydantic** - Data validation

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python start_server.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will run on `http://localhost:3002`

## 🎯 Usage

1. **Sign Up** - Create a new account at `/auth/signup`
2. **Login** - Sign in at `/auth/login`
3. **Dashboard** - View all your tasks with filtering options
4. **Create Task** - Click "New Task" to add a task
5. **Manage Tasks** - Click on any task to view, edit, or delete
6. **Filter** - Use status filters (All, Pending, In Progress, Completed)
7. **Dark Mode** - Toggle theme using the moon/sun icon in navbar

## 📁 Project Structure

```
Phase2_Dashboard/
├── backend/
│   ├── src/
│   │   ├── db/          # Database initialization
│   │   ├── models/      # SQLAlchemy models
│   │   ├── routers/     # API endpoints
│   │   └── main.py      # FastAPI application
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js pages
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── lib/         # Utilities and API client
│   │   └── types/       # TypeScript types
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Tasks
- `GET /api/v2/users/{user_id}/tasks` - Get all tasks for user
- `GET /api/v2/users/{user_id}/tasks/{task_id}` - Get specific task
- `POST /api/v2/users/{user_id}/tasks` - Create new task
- `PUT /api/v2/users/{user_id}/tasks/{task_id}` - Update task
- `DELETE /api/v2/users/{user_id}/tasks/{task_id}` - Delete task

## 🎨 UI Features

- **Gradient Backgrounds** - Beautiful color transitions
- **Animated Cards** - Hover effects and smooth animations
- **Enhanced Shadows** - Depth and dimension with shadow-2xl
- **Responsive Layout** - Sidebar, navbar, and content areas
- **Status Badges** - Color-coded task status indicators
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages

## 👤 Author

**Umema Sultan**

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For any queries, please reach out through GitHub issues.

---

Built with ❤️ using Next.js and FastAPI
