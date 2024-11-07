"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export const CameraComponent = () => {
  const [source, setSource] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (target: HTMLInputElement) => {
    if (target.files && target.files.length !== 0) {
      const file = target.files[0];
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
      setError("");
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
        <div className="mt-4 max-w-sm w-full">
          <img
            src={source}
            alt="Captured"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};
