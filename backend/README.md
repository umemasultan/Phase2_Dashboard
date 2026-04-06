---
title: Task Manager Backend API
emoji: 🔧
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
license: mit
app_port: 8000
---

# Task Manager Backend API

FastAPI backend for Task Manager Dashboard.

## Features

- JWT Authentication
- RESTful API endpoints
- SQLite database
- CORS enabled

## Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user
- `GET /api/v2/users/{user_id}/tasks` - Get all tasks
- `POST /api/v2/users/{user_id}/tasks` - Create task
- `PUT /api/v2/users/{user_id}/tasks/{task_id}` - Update task
- `DELETE /api/v2/users/{user_id}/tasks/{task_id}` - Delete task

## Demo Credentials

- Email: `test@example.com`
- Password: `password123`
