"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { analyzeImage as analyzeImageMutation } from "@/server/actions";
import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addFood as addFoodMutation } from "@/server/actions";
import { FoodFormSchema } from "@/lib/form";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

interface Food {
  detected: boolean;
  name: string;
  protein: number;
  carbs: number;
  calories: number;
  fat: number;
}

export const CameraTile = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>();
  const [food, setFood] = useState<Food>();
  const router = useRouter();
  const analyzeImage = useMutation({
    mutationFn: analyzeImageMutation,
    onSuccess: (data) => {
      const food = JSON.parse(data.choices[0].message.content) as Food;
      if (food.detected) {
        setFood(food);
      } else {
        throw new Error("No food detected.");
      }
    },
    onError: (error) => {
      console.error("Error analyzing image:", error);
    },
  });

  const addFood = useMutation({
    mutationFn: addFoodMutation,
    onSuccess: () => {
      setFood(undefined);
      router.refresh();
    },
    onError: (error) => {
      setFood(undefined);
      console.error(error);
    },
  });

  function onSubmit() {
    const parsed = FoodFormSchema.parse(food);
    addFood.mutate(parsed);
  }

  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
      <CardContent className="flex flex-col items-center justify-center p-0 h-full">
        {fileUrl ? (
          <div className="relative w-full h-full">
            <img
              src={fileUrl}
              alt="image preview"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-4 bg-gradient-to-t from-black/50 to-transparent rounded-md">
              <Button
                className="flex-1"
                disabled={analyzeImage.isPending}
                onClick={() => analyzeImage.mutate(fileUrl)}
              >
                {analyzeImage.isPending && (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                )}
                Analyze
              </Button>
              <Button
                className="flex-1"
                variant="secondary"
                onClick={() => setFileUrl(undefined)}
              >
                Retake
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-md">
            <UploadButton
              endpoint="imageUploader"
              onUploadBegin={() => setIsUploading(true)}
              onClientUploadComplete={(res) => {
                setFileUrl(res[0].appUrl);
                setIsUploading(false);
                toast({
                  title: "Nutrilense",
                  description: "Image uploaded",
                });
              }}
              config={{ cn: twMerge }}
              onUploadError={(error: Error) => {
                console.error(error);
                setIsUploading(false);
                toast({
                  title: "Nutrilense",
                  description: "Upload failed",
                  variant: "destructive",
                });
              }}
              className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
            />
          </div>
        )}
      </CardContent>

      {food && (
        <Dialog open={!!food.name}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Food scan results</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={food.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="protein" className="text-right">
                  Protein
                </Label>
                <Input
                  id="protein"
                  type="number"
                  defaultValue={food.protein}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carbs" className="text-right">
                  Carbs
                </Label>
                <Input
                  id="carbs"
                  type="number"
                  defaultValue={food.carbs}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fat" className="text-right">
                  Fat
                </Label>
                <Input
                  id="fat"
                  type="number"
                  defaultValue={food.fat}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="calories"
                  type="number"
                  defaultValue={food.calories}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={addFood.isPending}
                onClick={onSubmit}
              >
                {addFood.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setFood(undefined)}
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
