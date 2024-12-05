"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { reviewDay as reviewDayMutation } from "@/server/actions";
import { Food, Profile } from "@/server/db/schema";
import { Loader2 } from "lucide-react";

export const ReviewTile = ({
  food,
  profile,
}: {
  food: Food[];
  profile: Profile;
}) => {
  const [response, setResponse] = useState<string>();
  const reviewDay = useMutation({
    mutationFn: reviewDayMutation,
    onSuccess: (data) => {
      setResponse(data.choices[0].message.content);
    },
    onError: (error) => {
      console.error("Error analyzing image:", error);
    },
  });

  const handleReview = () => {
    setResponse(undefined);
    reviewDay.mutate({ food, profile });
  };

  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
      <CardContent className="flex flex-col items-center justify-center p-4 h-full">
        {!response ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-md">
            <Button
              onClick={handleReview}
              disabled={reviewDay.isPending}
              className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
            >
              {reviewDay.isPending && (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              )}
              Review day
            </Button>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col">
            <ScrollArea className="flex-grow mb-4 p-2 border rounded-md">
              <p className="text-sm">{response}</p>
            </ScrollArea>
            <Button
              onClick={handleReview}
              disabled={reviewDay.isPending}
              className="w-full ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
            >
              {reviewDay.isPending && (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              )}
              Re-review day
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
