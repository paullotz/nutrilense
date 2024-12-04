"use server";

import { UserOnboarding } from "@/components/user/user-onboarding";
import { auth } from "@/lib/auth";
import { profile } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

const page = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("No session found.");
  }

  const userProfile = await db.query.profile.findFirst({
    where: eq(profile.userId, session.user.id),
  });

  if (userProfile) {
    redirect("/");
  }

  return (
    <>
      <UserOnboarding />
    </>
  );
};

export default page;
