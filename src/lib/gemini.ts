import { storage } from "#imports";

export const callGemini = async (prompt: string) => {
  try {
    const apiKey = await storage.getItem("local:geminiApiKey");

    if (!apiKey) {
      return { success: false, error: "No API key found" };
    }

    const modelName = "gemini-2.5-flash";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            response_mime_type: "application/json"
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error?.message ?? "Gemini API request failed"
      };
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return {
      success: true,
      data: text
    };

  } catch (err: any) {
    return {
      success: false,
      error: err.message ?? "Unknown error occurred"
    };
  }
};
