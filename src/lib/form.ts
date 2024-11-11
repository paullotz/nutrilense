import { z } from "zod";

const OnboardingFormSchema = z.object({
  goal: z.string(),
  gender: z.string(),
  weight: z.string(),
  height: z.string(),
  activityLevel: z.string(),
});
