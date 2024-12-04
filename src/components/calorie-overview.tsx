"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CalorieOverviewProps {
  dailyGoal: number;
  currentCalories: number;
}

export const CalorieOverview = ({
  dailyGoal,
  currentCalories,
}: CalorieOverviewProps) => {
  const percentage = Math.min(
    Math.round((currentCalories / dailyGoal) * 100),
    100,
  );
  const strokeWidth = 10;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  return (
    <Card className="w-full max-w-sm mx-auto h-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Calorie Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (percentage / 100) * circumference
              }
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Daily goal
            </span>
            <span className="text-3xl font-bold">{currentCalories}</span>
            <span className="text-sm font-medium text-muted-foreground">
              / {dailyGoal} kcal
            </span>
          </div>
        </div>
      </CardContent>
      <div className="text-center mt-4 text-lg font-semibold">
        {percentage}% of daily goal
      </div>
    </Card>
  );
};
