import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { recipe } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;

  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/");
  }

  const fetchedRecipe = await db.query.recipe.findFirst({
    where: eq(recipe.id, slug),
  });

  if (!fetchedRecipe) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" passHref>
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Overview
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Recipe: {fetchedRecipe.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
              <p className="whitespace-p-line">{fetchedRecipe.ingredients}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
              <p className="whitespace-pre-line">
                {fetchedRecipe.instructions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
