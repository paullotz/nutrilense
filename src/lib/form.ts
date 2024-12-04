import { activityLevelEnum, genderEnum, goalEnum } from "@/server/db/schema";
import { z } from "zod";

const GoalEnum = z.enum(goalEnum.enumValues);
const ActivityLevelEnum = z.enum(activityLevelEnum.enumValues);
const GenderEnum = z.enum(genderEnum.enumValues);

export const OnboardingFormSchema = z.object({
  weight: z.coerce.number().transform((value) => value.toString()),
  height: z.coerce.number().transform((value) => value.toString()),
  goalCalories: z.coerce.number().transform((value) => value.toString()),
  activityLevel: ActivityLevelEnum,
  goal: GoalEnum,
  gender: GenderEnum,
});
export type OnboardingFormSchemaType = z.infer<typeof OnboardingFormSchema>;

export const FoodFormSchema = z.object({
  name: z.string(),
  protein: z.coerce.number().transform((value) => value.toString()),
  carbs: z.coerce.number().transform((value) => value.toString()),
  fat: z.coerce.number().transform((value) => value.toString()),
  calories: z.coerce.number().transform((value) => value.toString()),
});
export type FoodFormSchemaType = z.infer<typeof FoodFormSchema>;
