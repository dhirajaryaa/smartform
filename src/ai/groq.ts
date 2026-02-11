import { SmartAIResponse } from "@/ai/types";
import { PROVIDERS } from "@/ai/providers";

export async function callGroq(
  prompt: string,
  apiKey: string
): Promise<SmartAIResponse> {

  const provider = PROVIDERS.groqai;

  const res = await fetch(
    `${provider.baseURL}/chat/completions`,
    {
      method: "POST",
      headers: provider.headers(apiKey),
      body: JSON.stringify({
        model: provider.modal, // or load from storage
        messages: [
          { role: "system", content: "output must be json format." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        response_format: {
          "type": "json_object"
        },
        "stop": null
      })
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Groq API Error: ${errorText}`);
  }

  const data = await res.json();

  const text =
    data.choices?.[0]?.message?.content ?? "";

  return {
    success: true,
    data: text
  };
}
