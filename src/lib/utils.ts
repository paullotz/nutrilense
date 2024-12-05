import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  GenderEnum,
  ProfileFormSchema,
  ProfileFormSchemaType,
  ActivityLevelEnum,
  GoalEnum,
} from "./form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateCalories = (input: ProfileFormSchemaType): number => {
  // Parse and validate the input
  const validatedInput = ProfileFormSchema.parse(input);

  const weight = parseFloat(validatedInput.weight);
  const height = parseFloat(validatedInput.height);
  const { activityLevel, goal, gender } = validatedInput;

  // Base calorie calculation using Mifflin-St Jeor Equation
  let baseCalories =
    gender === GenderEnum.Values.male
      ? 10 * weight + 6.25 * height - 5 * 25 + 5 // Male formula
      : 10 * weight + 6.25 * height - 5 * 25 - 161; // Female formula

  // Adjust for activity level
  switch (activityLevel) {
    case ActivityLevelEnum.Values.low:
      baseCalories *= 1.2;
      break;
    case ActivityLevelEnum.Values.medium:
      baseCalories *= 1.55;
      break;
    case ActivityLevelEnum.Values.high:
      baseCalories *= 1.9;
      break;
  }

  // Adjust for goals
  switch (goal) {
    case GoalEnum.Values.gain_muscle:
      baseCalories += 500; // Surplus for muscle gain
      break;
    case GoalEnum.Values.loose_fat:
      baseCalories -= 500; // Deficit for fat loss
      break;
    case GoalEnum.Values.maintain:
      // No adjustment needed
      break;
  }

  return Math.round(baseCalories);
};
