import { SmartAIResponse } from "@/ai/types";
import { PROVIDERS } from "@/ai/providers";

export async function callGemini(
  prompt: string,
  apiKey: string
): Promise<SmartAIResponse> {
  const provider = PROVIDERS.gemini
  const res = await fetch(
    `${provider.baseURL}/models/${provider.modal}:generateContent`,
    {
      method: "POST",
      headers: provider.headers(apiKey),
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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API Error: ${errorText}`);
  }

  const data = await res.json();

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return {
    success: true,
    data: text
  };
}
