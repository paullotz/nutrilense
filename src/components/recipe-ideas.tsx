import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Salad, Coffee, Pizza, Fish, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Recipe } from "@/server/db/schema";
import { cn } from "@/lib/utils";
import Link from "next/link";

const iconColorPairs = [
  { icon: Salad, color: "text-green-500" },
  { icon: Coffee, color: "text-purple-500" },
  { icon: Pizza, color: "text-red-500" },
  { icon: Fish, color: "text-blue-500" },
];

export const RecipeIdeas = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Recipe Ideas
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto px-4 pb-4">
        <ul className="space-y-3">
          {recipes.map((recipe, index) => {
            const { icon: Icon, color } =
              iconColorPairs[Math.floor(Math.random() * iconColorPairs.length)];

            return (
              <li key={recipe.id || index}>
                <Link href={`/recipe/${recipe.id}`}>
                  <Button
                    className={cn(
                      "w-full justify-between hover:bg-muted transition-colors text-left h-auto py-3",
                    )}
                    variant={"secondary"}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`rounded-full p-2 ${color.replace(
                          "text",
                          "bg",
                        )} bg-opacity-20`}
                      >
                        <Icon className={`h-5 w-5 ${color}`} />
                      </div>
                      <div>
                        <div className="font-medium">{recipe.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {recipe.calories ?? "Unknown"} kcal
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
