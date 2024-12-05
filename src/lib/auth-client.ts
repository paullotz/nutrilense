import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});
