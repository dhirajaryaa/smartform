import { SmartAIResponse } from "@/ai/types";
import { callGemini } from "@/ai/gemini";
import { storage } from "#imports";
import { callGroq } from "@/ai/groq";

export async function callAI(prompt: string
): Promise<SmartAIResponse> {
    const provider = await storage.getItem("local:provider") as string;
    const apiKey = await storage.getItem("local:apiKey") as string;

    if (!provider) {
        throw new Error("Provider not selected");
    };

    if (!apiKey) {
        throw new Error("API key not found");
    };

    switch (provider) {
        // case "openai":
        //     return await callOpenAI(prompt, apiKey!);

        case "groqai":
            return await callGroq(prompt, apiKey);

        case "gemini":
            return await callGemini(prompt, apiKey);

        // case "anthropic":
        // return await callAnthropic(prompt, apiKey!);
        
        default:
         throw new Error("provider not supported");
    }
}
