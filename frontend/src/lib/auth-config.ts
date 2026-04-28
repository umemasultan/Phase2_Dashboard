import { betterAuth } from "better-auth";

// Better Auth configuration for JWT token generation
// This integrates with the existing FastAPI backend
export const auth = betterAuth({
  // Use environment variable for secret (shared with backend)
  secret: process.env.BETTER_AUTH_SECRET || "is_Fs19Ena_zOLpRzd2I7xl_7HN9L2loots-CqazLQ0",

  // Database configuration - using existing SQLite database
  database: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "sqlite:///./taskmanager.db",
  },

  // Email/Password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days (as per spec)
    updateAge: 60 * 60 * 24, // Update session every 24 hours
  },

  // Use existing user table from FastAPI backend
  user: {
    modelName: "users",
    fields: {
      email: "email",
      name: "name",
    },
  },
});

export type Session = typeof auth.$Infer.Session;
