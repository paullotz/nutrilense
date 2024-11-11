"use server";

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
              text: `You are now a nutrition expert. You are part of an app that allows users to track their food intake and you are asked to answer with the proteins, carbohydrates and fats that you can see in the picture, please only answer the food that is in the middle of the screen, please try to be as accurate as possible. Send back your answer. If you cannot see any of the foods in the picture, please mark "detected" as false. If you can see any food set "detected" to true. RETURN ONLY THE DATA NEEDED IN JSON FORMAT, NO EXTRA INFO: 
              {
                detected: true or false,
                name: ....
                protein: ...
                carbs:...
                fat:....
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
