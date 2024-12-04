import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CalorieOverview } from "@/components/calorie-overview";
import { redirect } from "next/navigation";
import { RecipeIdeas } from "@/components/recipe-ideas";
import { NutritionOverview } from "@/components/nutrition-overview";
import { CameraTile } from "@/components/camera-tile";
import { UserAvatar } from "@/components/user/user-avatar";
import { FoodLog } from "@/components/food-log";
import { food } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

function areDatesEqual(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const foodLog = await db
    .select()
    .from(food)
    .where(eq(food.userId, session.user.id));

  const userProfile = await db.query.profile.findFirst({
    where: (table) => eq(table.userId, session.user.id),
  });

  if (!userProfile) {
    redirect("/onboarding");
  }

  return (
    <>
      <main className="container mx-auto p-4">
        <nav className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-left">Nutrilense</h1>
          <UserAvatar session={session} />
        </nav>
        <div className="py-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CalorieOverview food={foodLog} profile={userProfile} />
          <NutritionOverview food={foodLog} />
          <RecipeIdeas />
          <CameraTile />
          <FoodLog />
        </div>
        <div className="py-3" />
      </main>
    </>
  );
}
