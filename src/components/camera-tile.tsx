import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CameraTile = () => {
  return (
    <Card className="w-full max-w-sm mx-auto h-[400px]">
      <CardContent className="flex flex-col items-center justify-center h-[250px]">
        <Button
          variant="outline"
          size="icon"
          className="w-24 h-24 rounded-full hover:bg-muted transition-colors"
        >
          <Camera className="h-12 w-12 text-primary" />
          <span className="sr-only">Open camera</span>
        </Button>
        <p className="mt-4 text-center text-muted-foreground">
          Tap to capture your meal
        </p>
      </CardContent>
    </Card>
  );
};
