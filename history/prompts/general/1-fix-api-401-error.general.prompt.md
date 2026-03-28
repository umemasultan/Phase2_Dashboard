---
id: 1
title: Fix API 401 Error
stage: general
date: 2026-03-02
surface: agent
model: if/qwen3-coder-plus
feature: none
branch: master
user: AST
command: ''
labels: [api, authentication, bug-fix]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - E:\Hackathon_2\Phase_2\frontend\src\lib\api.ts
  - E:\Hackathon_2\Phase_2\frontend\src\app\tasks/new/page.tsx
tests:
---

## Prompt

User reported: "api.ts:26 POST http://localhost:8000/api/tasks/ 401 (Unauthorized)"

## Response snapshot

Fixed the 401 Unauthorized error in task API calls by:
1. Improving error handling in the API request function to provide more detailed error messages
2. Adding proper authentication checks in the new task page to ensure users are logged in
3. Redirecting unauthenticated users to the login page
4. Using the correct API endpoint that automatically assigns tasks to authenticated users

The issue was that users were trying to create tasks without being authenticated, causing the protected API endpoint to return a 401 error.

## Outcome

- ✅ Impact: Resolved 401 Unauthorized error for task creation API calls
- 🧪 Tests: Manual verification of task creation flow
- 📁 Files: Updated api.ts and tasks/new/page.tsx with authentication checks
- 🔁 Next prompts: None needed
- 🧠 Reflection: Proper authentication is essential for protected API endpoints

## Evaluation notes (flywheel)

- Failure modes observed: None after fix
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A