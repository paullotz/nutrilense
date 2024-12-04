import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Salad, Coffee, Pizza, Fish, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const recipeIdeas = [
  { name: "Greek Salad", icon: Salad, color: "text-green-500" },
  { name: "Smoothie Bowl", icon: Coffee, color: "text-purple-500" },
  { name: "Veggie Pizza", icon: Pizza, color: "text-red-500" },
  { name: "Grilled Salmon", icon: Fish, color: "text-blue-500" },
];

export const RecipeIdeas = () => {
  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Recipe Ideas
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto px-4 pb-4">
        <ul className="space-y-3">
          {recipeIdeas.map((recipe, index) => (
            <li key={index}>
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-muted transition-colors text-left h-auto py-3"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`rounded-full p-2 ${recipe.color.replace("text", "bg")} bg-opacity-20`}
                  >
                    <recipe.icon className={`h-5 w-5 ${recipe.color}`} />
                  </div>
                  <div>
                    <div className="font-medium">{recipe.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.random()} kcal
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
