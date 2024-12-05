"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeFormSchema, RecipeFormSchemaType } from "@/lib/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import {
  addRecipe as addRecipeMutation,
  deleteRecipe as deleteRecipeMutation,
} from "@/server/actions";
import { Recipe } from "@/server/db/schema";
import { Eye, Loader2, Trash2 } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export const RecipeManagement = ({ recipes }: { recipes: Recipe[] }) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<RecipeFormSchemaType>({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: {
      name: "",
      calories: "",
      ingredients: "",
      instructions: "",
    },
  });
  const addRecipe = useMutation({
    mutationFn: addRecipeMutation,
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Nutrilense",
        description: "Recipe has been added",
      });
      form.reset();
    },
  });

  const deleteRecipe = useMutation({
    mutationFn: deleteRecipeMutation,
    onSuccess: () => {
      toast({
        title: "Nutrilense",
        description: "Recipe has been deleted",
      });
      router.refresh();
    },
  });

  const onSubmit = (values: RecipeFormSchemaType) => {
    addRecipe.mutate(values);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Recipe Management (admin only)
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Recipe</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Recipe Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories</FormLabel>
                    <FormControl>
                      <Input placeholder="300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredients</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ingredients (one per line)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Instructions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={addRecipe.isPending}>
                {addRecipe.isPending && (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                )}
                Add Recipe
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recipe List</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <ul className="space-y-4">
              {recipes.map((recipe) => (
                <li
                  key={recipe.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span>{recipe.name}</span>
                  <div>
                    <Link href={`/recipe/${recipe.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        deleteRecipe.mutate(recipe.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
