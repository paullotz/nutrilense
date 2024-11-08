"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Loader, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { analyzeImage } from "@/server/actions";

interface Food {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
}

export const CameraComponent = () => {
  const [source, setSource] = useState<string>("");
  const [base64String, setBase64String] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<Food | null>(null);

  const handleCapture = (target: HTMLInputElement) => {
    if (target.files && target.files.length !== 0) {
      const file = target.files[0];
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
      setError("");

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setBase64String(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCameraError = () => {
    setError("Camera access is not supported or permission was denied.");
  };

  const analyzeimage = useMutation({
    mutationFn: async (base64Image: string) => {
      // Call the server action directly from here
      const response = await analyzeImage(base64Image);
      return response;
    },
    onSuccess: (data) => {
      //const food = JSON.parse(data.choices[0].message.content) as Food;
      setResult(data.choices[0].message.content); // Set the result from OpenAI
    },
    onError: (error) => {
      console.error("Error analyzing image:", error);
    },
  });

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        ref={fileInputRef}
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
        onError={handleCameraError}
        className="hidden"
      />
      <Button
        onClick={handleCameraClick}
        size="icon"
        aria-label="Take a picture"
      >
        <Camera className="h-6 w-6" />
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {source && (
        <>
          <div className="mt-4 max-w-sm w-full">
            <img
              src={source}
              alt="Captured"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </>
      )}
      {base64String && (
        <>
          <div className="mt-4 max-w-sm w-full">
            <p className="text-sm font-medium mb-2">Base64 Encoded String:</p>
            <textarea
              readOnly
              value={base64String}
              className="w-full h-24 p-2 text-xs border rounded-md"
            />
          </div>

          <Button
            disabled={analyzeimage.isPending}
            onClick={() => {
              analyzeimage.mutate(base64String);
            }}
          >
            {analyzeimage.isPending && (
              <Loader2 className="animate-spin h-4 w-4" />
            )}
            Analyze
          </Button>
        </>
      )}
      {result && <p>{JSON.stringify(result)}</p>}
    </div>
  );
};
