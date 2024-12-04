import { activityLevelEnum, genderEnum, goalEnum } from "@/server/db/schema";
import { z } from "zod";

const GoalEnum = z.enum(goalEnum.enumValues);
const ActivityLevelEnum = z.enum(activityLevelEnum.enumValues);
const GenderEnum = z.enum(genderEnum.enumValues);

export const OnboardingFormSchema = z.object({
  weight: z.number().min(30).max(200),
  height: z.number().min(120).max(300),
  activityLevel: ActivityLevelEnum,
  goal: GoalEnum,
  gender: GenderEnum,
});
export type OnboardingFormSchemaType = z.infer<typeof OnboardingFormSchema>;

export const FoodFormSchema = z.object({
  name: z.string(),
  protein: z.coerce.number(),
  carbs: z.coerce.number(),
  fat: z.coerce.number(),
});
export type FoodFormSchemaType = z.infer<typeof FoodFormSchema>;
