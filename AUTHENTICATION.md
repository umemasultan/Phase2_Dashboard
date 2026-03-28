# Authentication Guide

## Available Test Credentials

The application database comes with a pre-populated user for testing purposes:

- **Email**: `test@example.com`
- **Password**: `password123`

You can use these credentials to log in directly, or register a new account with your own credentials.

## Registering a New User

1. Navigate to the **Sign Up** page
2. Fill in your details:
   - Full Name
   - Email Address
   - Password
   - Confirm Password
3. Click "Sign up" to create your account
4. You will be automatically logged in after successful registration

## Troubleshooting

If you're getting "Unauthorized: Incorrect email or password" errors:

1. **Verify your credentials**:
   - For first-time usage, try the test credentials above
   - Double-check for typos in email or password
   - Ensure Caps Lock is not enabled

2. **Clear any existing login state**:
   - Clear your browser's local storage if you're having persistent login issues
   - Try logging in with a private/incognito window

3. **Register a new account**:
   - If test credentials don't work, register a new account
   - Use the new account credentials to log in

## API Endpoints

- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`
- User Profile: `GET /api/auth/me` (requires authentication)

## Backend Configuration

- The backend runs on `http://127.0.0.1:8001`
- Make sure the backend server is running before attempting to log in

## Frontend Configuration

- The frontend typically runs on `http://localhost:3000`
- Environment variable `NEXT_PUBLIC_API_URL` should point to the backend