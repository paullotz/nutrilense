"use server";

import { auth } from "@/lib/auth";
import {
  FoodFormSchemaType,
  OnboardingFormSchemaType,
  ProfileFormSchemaType,
} from "@/lib/form";
import { headers } from "next/headers";
import { food, profile, user } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export async function analyzeImage(imageUrl: string) {
  const openAiApiKey = process.env.OPENAI_API_KEY;
  if (!openAiApiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: "chatgpt-4o-latest",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are now a nutrition expert. You are part of an app that allows users to track their food intake and you are asked to answer with the proteins, carbohydrates and fats that you can see in the picture, please only answer the food that is in the middle of the screen, please try to be as accurate as possible. Send back your answer. If you cannot see any of the foods in the picture, please mark "detected" as false. Make the first letter of the name of the food capital. If you can see any food set "detected" to true. RETURN ONLY THE DATA NEEDED IN JSON FORMAT, NO EXTRA INFO: 
              {
                detected: true or false,
                name: ....
                protein: ...
                carbs:...
                fat:....
                calories:...
              }`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  return data;
}

export async function insertProfile(values: OnboardingFormSchemaType) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("No session found.");
  }

  const result = await db.insert(profile).values({
    ...values,
    userId: session.user.id,
  });

  return result;
}

export async function updateProfile(values: ProfileFormSchemaType) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("No session found.");
  }

  if (session.user.name !== values.name) {
    // Update user name incase its different
    await db
      .update(user)
      .set({ name: values.name })
      .where(eq(user.id, session.user.id));
  }

  const result = await db
    .update(profile)
    .set({
      ...values,
    })
    .where(eq(profile.userId, session.user.id));

  return result;
}

export async function addFood(values: FoodFormSchemaType) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    throw new Error("No session found.");
  }

  const result = await db.insert(food).values({
    ...values,
    userId: session.user.id,
  });

  return result;
}
