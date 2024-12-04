"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FoodItem {
  name: string;
  calories: number;
  time: string;
}

const foodItems: FoodItem[] = [
  { name: "Oatmeal with Berries", calories: 300, time: "08:00 AM" },
  { name: "Greek Yogurt", calories: 150, time: "10:30 AM" },
  { name: "Grilled Chicken Salad", calories: 400, time: "01:00 PM" },
  { name: "Apple", calories: 95, time: "03:30 PM" },
  { name: "Salmon with Quinoa", calories: 550, time: "07:00 PM" },
  { name: "Protein Shake", calories: 200, time: "09:00 PM" },
];
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
export const FoodLog = () => {
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex flex-row gap-4 text-2xl font-bold text-center items-center justify-center">
          <ChevronLeft className="h-4 w-4" />
          <span>{currentDate}</span>
          <ChevronRight className="h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50">
        <ScrollArea className="h-[260px] pr-4">
          <div className="py-3" />
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
              <span className="text-sm font-medium">{item.calories} cal</span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
