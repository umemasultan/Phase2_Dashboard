# 📚 API Documentation - Task Manager

**Base URL**: `http://localhost:8000`  
**API Version**: 1.0  
**Authentication**: JWT Bearer Token

---

## 🔐 Authentication

All endpoints except `/api/auth/register` and `/api/auth/login` require authentication.

### Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 📍 Endpoints

### Authentication Endpoints

#### 1. Register User
**POST** `/api/auth/register`

Create a new user account.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errors**:
- `400` - Email already registered
- `422` - Validation error

---

#### 2. Login User
**POST** `/api/auth/login`

Authenticate and get JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Errors**:
- `401` - Incorrect email or password

---

#### 3. Get Current User
**GET** `/api/auth/me`

Get authenticated user's profile.

**Headers**:
```http
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-04-24T00:00:00",
  "updated_at": "2026-04-24T00:00:00"
}
```

**Errors**:
- `401` - Unauthorized (invalid/expired token)

---

### Task Endpoints

#### 4. List All Tasks
**GET** `/api/{user_id}/tasks`

Get all tasks for the authenticated user.

**Path Parameters**:
- `user_id` (integer) - User ID (must match authenticated user)

**Query Parameters**:
- `status_filter` (optional) - Filter by status: `pending`, `in-progress`, `completed`
- `skip` (optional, default: 0) - Pagination offset
- `limit` (optional, default: 100) - Max results

**Example**:
```http
GET /api/1/tasks?status_filter=pending&limit=10
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "in-progress",
    "created_at": "2026-04-24T00:00:00",
    "updated_at": "2026-04-24T00:00:00"
  },
  {
    "id": 2,
    "title": "Review pull requests",
    "description": null,
    "status": "pending",
    "created_at": "2026-04-24T01:00:00",
    "updated_at": "2026-04-24T01:00:00"
  }
]
```

**Errors**:
- `401` - Unauthorized
- `403` - Forbidden (user_id doesn't match authenticated user)

---

#### 5. Create Task
**POST** `/api/{user_id}/tasks`

Create a new task.

**Path Parameters**:
- `user_id` (integer) - User ID

**Request Body**:
```json
{
  "title": "New task title",
  "description": "Optional task description",
  "status": "pending"
}
```

**Validation**:
- `title`: Required, 1-200 characters
- `description`: Optional, max 1000 characters
- `status`: Optional, one of: `pending`, `in-progress`, `completed`

**Response** (200 OK):
```json
{
  "id": 3,
  "title": "New task title",
  "description": "Optional task description",
  "status": "pending",
  "created_at": "2026-04-24T02:00:00",
  "updated_at": "2026-04-24T02:00:00"
}
```

**Errors**:
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden

---

#### 6. Get Task Details
**GET** `/api/{user_id}/tasks/{task_id}`

Get a specific task by ID.

**Path Parameters**:
- `user_id` (integer) - User ID
- `task_id` (integer) - Task ID

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs",
  "status": "in-progress",
  "created_at": "2026-04-24T00:00:00",
  "updated_at": "2026-04-24T00:00:00"
}
```

**Errors**:
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Task not found

---

#### 7. Update Task
**PUT** `/api/{user_id}/tasks/{task_id}`

Update an existing task.

**Path Parameters**:
- `user_id` (integer) - User ID
- `task_id` (integer) - Task ID

**Request Body** (all fields optional):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response** (200 OK):
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "created_at": "2026-04-24T00:00:00",
  "updated_at": "2026-04-24T03:00:00"
}
```

**Errors**:
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Task not found

---

#### 8. Delete Task
**DELETE** `/api/{user_id}/tasks/{task_id}`

Delete a task permanently.

**Path Parameters**:
- `user_id` (integer) - User ID
- `task_id` (integer) - Task ID

**Response** (200 OK):
```json
{
  "message": "Task deleted successfully"
}
```

**Errors**:
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Task not found

---

#### 9. Toggle Task Completion
**PATCH** `/api/{user_id}/tasks/{task_id}/complete`

Toggle task between `pending` and `completed` status.

**Path Parameters**:
- `user_id` (integer) - User ID
- `task_id` (integer) - Task ID

**Response** (200 OK):
```json
{
  "message": "Task completion toggled",
  "task": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "completed",
    "created_at": "2026-04-24T00:00:00",
    "updated_at": "2026-04-24T04:00:00"
  }
}
```

**Errors**:
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Task not found

---

## 🔒 Security

### JWT Token
- **Algorithm**: HS256
- **Expiry**: 7 days
- **Payload**:
  ```json
  {
    "sub": "user@example.com",
    "user_id": 1,
    "exp": 1714521600
  }
  ```

### Password Security
- Hashed using **bcrypt**
- Never returned in API responses
- Minimum length enforced

### User Isolation
- All task endpoints verify `user_id` matches authenticated user
- Users cannot access other users' tasks
- 403 Forbidden returned for unauthorized access

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 422 | Unprocessable Entity |
| 500 | Internal Server Error |

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:8000/api/1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title":"My first task","description":"Test task"}'
```

### List Tasks
```bash
curl -X GET http://localhost:8000/api/1/tasks \
  -H "Authorization: Bearer <your_token>"
```

---

## 📖 Interactive Documentation

Visit **http://localhost:8000/docs** for interactive Swagger UI documentation where you can:
- Test all endpoints
- See request/response schemas
- Try authentication flow
- View detailed error responses

---

**Last Updated**: April 24, 2026
