"use server";

import { UserOnboarding } from "@/components/user/user-onboarding";
import { auth } from "@/lib/auth";
import { profile } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const page = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("No session found.");
  }

  const userProfile = await db?.query.profile.findFirst({
    where: eq(profile?.userId, session.user.id),
  });

  if (userProfile) {
    revalidatePath("/dashboard");
  }

  return (
    <>
      <UserOnboarding />
    </>
  );
};

export default page;
