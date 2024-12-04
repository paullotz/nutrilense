import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { food } from "@/server/db/schema";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

export const FoodLog = async () => {
  const date = getDate();

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

  if (foodLog && foodLog.length > 0) {
    return (
      <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-2xl font-bold text-center items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
            <span>{date}</span>
            <ChevronRight className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50">
          <ScrollArea className="h-[260px] pr-4">
            <div className="py-3" />
            {foodLog.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b last:border-b-0"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.createdAt.getHours() +
                      ":" +
                      item.createdAt.getMinutes()}
                  </p>
                </div>
                <span className="text-sm font-medium">{item.calories} cal</span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }
};
