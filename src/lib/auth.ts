import { db } from "../server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI:
        (process.env.BETTER_AUTH_URL as string) + "/api/auth/callback/google",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
      plan: {
        type: "string",
      },
    },
  },
});

type Session = typeof auth.$Infer.Session;
