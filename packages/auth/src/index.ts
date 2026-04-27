import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@racebowl/db";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "RaceBowl",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ?? "racebowl-dev-secret-not-for-production",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      favoriteMode: {
        type: "string",
        required: false,
        defaultValue: "Race Mode",
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
