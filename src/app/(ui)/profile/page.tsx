"use server";

import { auth } from "@/lib/auth";
import { profile, recipe } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { UserProfile } from "@/components/user/user-profile";
import { RecipeManagement } from "@/components/recipe-management";

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

  const recipes = await db.select().from(recipe);

  return (
    <>
      <UserProfile profile={userProfile} session={session} />
      {session.user.role === "admin" && (
        <>
          <hr className="m-4" />
          <RecipeManagement recipes={recipes} />
        </>
      )}
    </>
  );
};

export default page;
