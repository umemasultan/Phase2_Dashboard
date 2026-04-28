import { auth } from "@/lib/auth-config";
import { toNextJsHandler } from "better-auth/next-js";

// Better Auth API route handler
// This handles all Better Auth endpoints: /api/auth/*
export const { GET, POST } = toNextJsHandler(auth);
