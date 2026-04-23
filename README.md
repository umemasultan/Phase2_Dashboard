# 📋 Task Manager - Phase II Full-Stack Web Application

> A modern multi-user task management web application built with Next.js 16+, FastAPI, and Neon PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat-square&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)

## 🌟 Overview

Phase II Hackathon project - A full-stack task management application with JWT authentication, user isolation, and persistent storage using Neon Serverless PostgreSQL.

### Key Features

- 🔐 **JWT Authentication** - Secure user signup/signin with token-based auth
- 👤 **User Isolation** - Each user sees only their own tasks
- 📊 **Task CRUD** - Create, Read, Update, Delete tasks with status tracking
- 🎨 **Modern UI** - Responsive design with dark/light mode
- ⚡ **Fast API** - RESTful endpoints with FastAPI
- 🗄️ **Neon PostgreSQL** - Serverless PostgreSQL database
- 📱 **Mobile-First** - Fully responsive across all devices

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16+ (App Router) |
| **Backend** | Python FastAPI |
| **ORM** | SQLModel |
| **Database** | Neon Serverless PostgreSQL |
| **Authentication** | JWT with shared secret |
| **Spec-Driven** | Claude Code + Spec-Kit Plus |

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Next.js 16 (React 19) + TypeScript + Tailwind CSS  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST + JWT
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         FastAPI + SQLModel + JWT Auth                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ SQLModel ORM
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Neon Serverless PostgreSQL                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Core Features

#### 🔐 Authentication & Authorization
- Secure user registration and login
- JWT token-based session management
- Protected routes and API endpoints
- Password hashing with industry standards

#### 📋 Task Management
- **CRUD Operations** - Full create, read, update, delete functionality
- **Status Workflow** - Pending → In Progress → Completed
- **Smart Filtering** - Filter by status with real-time updates
- **User Isolation** - Each user sees only their own tasks

#### 🎨 User Interface
- **Modern Design System** - Consistent gradient themes and spacing
- **Micro-interactions** - Hover effects, transitions, and animations
- **Glass-morphism** - Backdrop blur and transparency effects
- **Enhanced Shadows** - Depth perception with shadow-2xl
- **Responsive Grid** - Adaptive layouts for all devices

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | React Framework | 14.x |
| TypeScript | Type Safety | 5.x |
| Tailwind CSS | Styling | 3.x |
| React Hooks | State Management | 18.x |

### Backend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| FastAPI | Web Framework | 0.104+ |
| SQLAlchemy | ORM | 2.x |
| Pydantic | Data Validation | 2.x |
| JWT | Authentication | - |
| SQLite | Database | 3.x |

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **pip** - Python package management
- **VS Code** - Recommended IDE

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.x or higher
- **Python** 3.8 or higher
- **npm** or **yarn**
- **Git**
- **Neon PostgreSQL account** (free tier available)

### 1. Database Setup (Neon PostgreSQL)

#### Create Neon Account
1. Go to [https://neon.tech](https://neon.tech)
2. Sign up with GitHub/Google (free tier)
3. Create a new project: `taskmanager-hackathon`
4. Select closest region (e.g., AWS US East)

#### Get Connection String
1. In your Neon dashboard, go to **Connection Details**
2. Copy the **Connection string** (looks like):
   ```
   postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
3. Save this for the next step

### 2. Backend Setup

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

# Configure environment variables
cp .env.example .env
# Edit .env and add your Neon connection string:
# DATABASE_URL=postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require

# Run the server
python start_server.py
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Docker Setup (Alternative - Easiest)

```bash
# Create .env file
cp .env.example .env

# Edit .env with your Neon connection string
# DATABASE_URL=postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require

# Start all services with Docker Compose
docker-compose up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:8000
# - API Docs: http://localhost:8000/docs
```

## 🎯 Usage Guide

### Getting Started

1. **Create an Account**
   - Navigate to `/auth/signup`
   - Enter your name, email, and password
   - You'll be automatically logged in

2. **Login**
   - Go to `/auth/login`
   - Use demo credentials: `test@example.com` / `password123`
   - Or use your registered account

3. **Dashboard Overview**
   - View all your tasks at a glance
   - See task statistics (Total, Pending, In Progress, Completed)
   - Filter tasks by status
   - Quick access to create new tasks

4. **Task Management**
   - **Create**: Click "New Task" button → Fill form → Submit
   - **View**: Click on any task card to see details
   - **Edit**: Open task → Click "Edit" → Modify → Save
   - **Delete**: Open task → Click "Delete" → Confirm
   - **Update Status**: Edit task and change status dropdown

5. **Theme Switching**
   - Click the moon/sun icon in the navbar
   - Theme preference is saved automatically
   - Supports system preference detection

### Best Practices

- ✅ Use descriptive task titles
- ✅ Add detailed descriptions for complex tasks
- ✅ Update task status regularly
- ✅ Use filters to focus on specific task groups
- ✅ Keep your task list organized

## 📁 Project Structure

```
Phase2_Dashboard/
├── 📂 backend/
│   ├── src/
│   │   ├── db/              # Database configuration & initialization
│   │   ├── models/          # SQLAlchemy data models
│   │   │   ├── user.py      # User model
│   │   │   └── task.py      # Task model
│   │   ├── routers/         # API route handlers
│   │   │   ├── auth.py      # Authentication endpoints
│   │   │   └── task_v2.py   # Task CRUD endpoints
│   │   └── main.py          # FastAPI application entry
│   ├── requirements.txt     # Python dependencies
│   └── start_server.py      # Server startup script
│
├── 📂 frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── auth/        # Login & Signup pages
│   │   │   ├── tasks/       # Task management pages
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── page.tsx     # Dashboard home
│   │   ├── components/      # Reusable React components
│   │   │   ├── navbar.tsx   # Navigation bar
│   │   │   ├── sidebar.tsx  # Sidebar navigation
│   │   │   ├── TaskCard.tsx # Task display card
│   │   │   └── TaskForm.tsx # Task creation/edit form
│   │   ├── contexts/        # React Context providers
│   │   │   └── ThemeContext.tsx
│   │   ├── lib/             # Utility functions
│   │   │   ├── api.ts       # API client
│   │   │   └── auth.ts      # Auth helpers
│   │   └── types/           # TypeScript definitions
│   │       └── task.ts
│   ├── package.json         # Node dependencies
│   └── tailwind.config.js   # Tailwind configuration
│
├── 📂 specs/                # Project specifications
├── 📂 history/              # Development history
└── README.md                # Project documentation
```

## 🔌 API Documentation

### Base URL
```
http://localhost:8000
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string"
}

Response: 201 Created
{
  "access_token": "string",
  "token_type": "bearer"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: 200 OK
{
  "access_token": "string",
  "token_type": "bearer"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/v2/users/{user_id}/tasks?status={status}
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "pending|in-progress|completed",
    "userId": "integer",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
]
```

#### Create Task
```http
POST /api/v2/users/{user_id}/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "status": "pending"
}

Response: 201 Created
```

#### Update Task
```http
PUT /api/v2/users/{user_id}/tasks/{task_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "status": "in-progress"
}

Response: 200 OK
```

#### Delete Task
```http
DELETE /api/v2/users/{user_id}/tasks/{task_id}
Authorization: Bearer {token}

Response: 204 No Content
```

## 🎨 Design Features

### Visual Design System

- **Color Palette**
  - Primary: Deep Navy (`#050E3C`) to Purple gradient
  - Accent: Purple (`#764ba2`) variations
  - Neutral: Gray scale with adaptive opacity
  - Status Colors: Yellow (Pending), Blue (In Progress), Green (Completed)

- **Typography**
  - Headings: Space Grotesk (Bold, Black weights)
  - Body: Poppins (Regular to Bold)
  - Monospace: Inter (for code/data)

- **Effects & Animations**
  - Gradient animations on hover
  - Smooth transitions (300-700ms)
  - Glass-morphism with backdrop blur
  - Enhanced shadows (shadow-2xl)
  - Floating animations on cards
  - Shimmer effects on interactions

### Responsive Breakpoints

```css
Mobile:  < 640px   (sm)
Tablet:  640-768px (md)
Laptop:  768-1024px (lg)
Desktop: > 1024px  (xl)
```

## 🔒 Security Features

- **Authentication**
  - JWT token-based authentication
  - Secure password hashing
  - HTTP-only cookie support
  - Token expiration handling

- **Authorization**
  - Protected API routes
  - User-specific data isolation
  - Role-based access control ready

- **Data Protection**
  - SQL injection prevention via ORM
  - XSS protection
  - CORS configuration
  - Input validation with Pydantic

## 🚀 Performance Optimizations

- **Frontend**
  - Next.js App Router for optimal loading
  - React Server Components
  - Automatic code splitting
  - Image optimization
  - CSS purging with Tailwind

- **Backend**
  - Async/await operations
  - Database query optimization
  - Connection pooling
  - Response caching ready

## 📊 Future Enhancements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Collaborative task sharing
- [ ] File attachments
- [ ] Activity timeline
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Export tasks (PDF, CSV)

## 👤 Author

**Umema Sultan**

Full-stack developer passionate about creating intuitive and performant web applications.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by contemporary task management solutions
- Designed with user experience as the top priority

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, questions, or feedback:
- Open an issue on GitHub
- Contact through GitHub profile

## 🌐 Demo

Live demo coming soon!

---

<div align="center">

**Built with ❤️ using Next.js and FastAPI**

⭐ Star this repository if you find it helpful!

</div>
