import { activityLevelEnum, genderEnum, goalEnum } from "@/server/db/schema";
import { z } from "zod";

export const GoalEnum = z.enum(goalEnum.enumValues);
export const ActivityLevelEnum = z.enum(activityLevelEnum.enumValues);
export const GenderEnum = z.enum(genderEnum.enumValues);

export const goalLabels = {
  gain_muscle: "Gain muscle",
  loose_fat: "Loose fat",
  maintain: "Maintain",
};

export const genderLabels = {
  male: "Male",
  female: "Female",
  divers: "Divers",
};

export const activityLevelLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const OnboardingFormSchema = z.object({
  weight: z.coerce.number().transform((value) => value.toString()),
  height: z.coerce.number().transform((value) => value.toString()),
  goalCalories: z.coerce.number().transform((value) => value.toString()),
  activityLevel: ActivityLevelEnum,
  goal: GoalEnum,
  gender: GenderEnum,
});
export type OnboardingFormSchemaType = z.infer<typeof OnboardingFormSchema>;

export const ProfileFormSchema = z.object({
  name: z.string().min(1),
  weight: z.coerce.number().transform((value) => value.toString()),
  height: z.coerce.number().transform((value) => value.toString()),
  goalCalories: z.coerce.number().transform((value) => value.toString()),
  activityLevel: ActivityLevelEnum,
  goal: GoalEnum,
  gender: GenderEnum,
});
export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;

export const RecipeFormSchema = z.object({
  name: z.string().min(1),
  ingredients: z.string().min(1),
  instructions: z.string().min(1),
  calories: z.coerce.number().transform((value) => value.toString()),
});
export type RecipeFormSchemaType = z.infer<typeof RecipeFormSchema>;

export const FoodFormSchema = z.object({
  name: z.string(),
  protein: z.coerce.number().transform((value) => value.toString()),
  carbs: z.coerce.number().transform((value) => value.toString()),
  fat: z.coerce.number().transform((value) => value.toString()),
  calories: z.coerce.number().transform((value) => value.toString()),
});
export type FoodFormSchemaType = z.infer<typeof FoodFormSchema>;
