import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beef, CroissantIcon as Bread, Droplet } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface NutrientProps {
  name: string;
  amount: number;
  max: number;
  unit: string;
  icon: React.ElementType;
  color: string;
}

const Nutrient: React.FC<NutrientProps> = ({
  name,
  amount,
  max,
  unit,
  icon: Icon,
  color,
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className={`rounded-full p-1.5 ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="font-medium">{name}</span>
      </div>
      <span className="text-sm text-muted-foreground">
        {amount}/{max} {unit}
      </span>
    </div>
    <Progress value={(amount / max) * 100} className="h-2" />
  </div>
);

export const NutritionOverview = () => {
  return (
    <Card className="w-full max-w-sm mx-auto h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Nutrition Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center space-y-6">
        <Nutrient
          name="Proteins"
          amount={120}
          max={150}
          unit="g"
          icon={Beef}
          color="bg-red-500"
        />
        <Nutrient
          name="Carbs"
          amount={100}
          max={250}
          unit="g"
          icon={Bread}
          color="bg-yellow-500"
        />
        <Nutrient
          name="Fats"
          amount={90}
          max={120}
          unit="g"
          icon={Droplet}
          color="bg-blue-500"
        />
      </CardContent>
    </Card>
  );
};
