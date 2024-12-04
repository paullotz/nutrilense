import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CalorieOverview } from "@/components/calorie-overview";
import { redirect } from "next/navigation";
import { RecipeIdeas } from "@/components/recipe-ideas";
import { NutritionOverview } from "@/components/nutrition-overview";
import { CameraTile } from "@/components/camera-tile";
import { UserAvatar } from "@/components/user/user-avatar";
import { FoodLog } from "@/components/food-log";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/signin");
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
          <CalorieOverview dailyGoal={2000} currentCalories={1500} />
          <NutritionOverview />
          <RecipeIdeas />
          <CameraTile />
          <FoodLog />
        </div>
        <div className="py-3" />
      </main>
    </>
  );
}
