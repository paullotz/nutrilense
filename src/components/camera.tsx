"use client";

import React, { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { addFood as addFoodMutation } from "@/server/actions";
import { FoodFormSchema } from "@/lib/form";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

interface Food {
  detected: boolean;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
}

export const CameraComponent = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>();
  const [food, setFood] = useState<Food>();

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
      // toast
    },
    onError: (error) => {
      // toast error
    },
  });

  // 2. Define a submit handler.
  function onSubmit() {
    const parsed = FoodFormSchema.parse(food);
    addFood.mutate(parsed);
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen">
        {fileUrl && (
          <img
            src={fileUrl}
            alt="image preview"
            className="rounded-md border border-black"
          />
        )}
        {!fileUrl && (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <UploadButton
              endpoint="imageUploader"
              onUploadBegin={() => setIsUploading(true)}
              onClientUploadComplete={(res) => {
                setFileUrl(res[0].appUrl);
                setIsUploading(false);
                toast({
                  title: "Nutrilense",
                  description: "image uploaded",
                });
              }}
              onUploadError={(error: Error) => {
                console.error(error);
                setIsUploading(false);
                alert(`ERROR! ${error.message}`);
              }}
              className="w-full max-w-xs"
            />
          </div>
        )}
        <Button
          disabled={analyzeImage.isPending}
          type="button"
          onClick={() => {
            if (fileUrl) {
              analyzeImage.mutate(fileUrl);
            } else {
              toast({
                title: "Nutrilense",
                description: "failed",
              });
            }
          }}
        >
          {analyzeImage.isPending && (
            <Loader2 className="animate-spin h-4 w-4" />
          )}
          Analyze
        </Button>
      </div>
      {food && (
        <Dialog open={!!food.name}>
          <DialogTrigger>Open</DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Food scan results</DialogTitle>
            </DialogHeader>
            <Label>Name</Label>
            <Input type={"text"} name="name" defaultValue={food.name} />
            <Label>Protein</Label>
            <Input type={"number"} name="protein" defaultValue={food.protein} />
            <Label>Carbs</Label>
            <Input type={"number"} name="carbs" defaultValue={food.carbs} />
            <Label>Fat</Label>
            <Input type={"number"} name="fat" defaultValue={food.fat} />
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                disabled={addFood.isPending}
                onClick={() => onSubmit()}
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
                  onClick={() => {
                    setFood(undefined);
                  }}
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
