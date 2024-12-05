import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CalorieOverview } from "@/components/calorie-overview";
import { redirect } from "next/navigation";
import { RecipeIdeas } from "@/components/recipe-ideas";
import { NutritionOverview } from "@/components/nutrition-overview";
import { CameraTile } from "@/components/camera-tile";
import { UserAvatar } from "@/components/user/user-avatar";
import { FoodLog } from "@/components/food-log";
import { food, recipe } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { LandingPage } from "@/components/landing-page";
import { ReviewTile } from "@/components/review-tile";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    return <LandingPage />;
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

  const recipes = await db.select().from(recipe);

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
          <RecipeIdeas recipes={recipes} />
          <CameraTile />
          <FoodLog food={foodLog} />
          <ReviewTile food={foodLog} profile={userProfile} />
        </div>
        <div className="py-3" />
      </main>
    </>
  );
}
