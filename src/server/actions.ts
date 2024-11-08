"use server";

export async function analyzeImage(base64Image: string) {
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
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are now a nutrituonal expoert. You are part of an app that lets users track their food in take and you should response with the proteins, carbs and fat that you can see in the picture please only answer the food that is in the middle of the screen please try to be as accurate as possible. Return your answer in. ONLY RETURN THE DATA IN A JSON FORMAT THAT IS NEEDED NO EXTRA INFO: 
              {
                name: ....
                protein: ...
                carbs:...
                fat:....
              }`,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
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
