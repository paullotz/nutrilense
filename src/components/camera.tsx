"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { analyzeImage as analyzeImageMutation } from "@/server/actions";
import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface Food {
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
      setFood(food);
      console.log(food);
    },
    onError: (error) => {
      console.error("Error analyzing image:", error);
    },
  });

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
      {food && <pre>{JSON.stringify(food, null, 4)}</pre>}
    </div>
  );
};
