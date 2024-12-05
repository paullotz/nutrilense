"use server";

import { auth } from "@/lib/auth";
import { profile } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { UserProfile } from "@/components/user/user-profile";

const page = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const userProfile = await db.query.profile.findFirst({
    where: eq(profile.userId, session.user.id),
  });

  if (!userProfile) {
    redirect("/");
  }

  return (
    <>
      <UserProfile profile={userProfile} session={session} />
    </>
  );
};

export default page;
