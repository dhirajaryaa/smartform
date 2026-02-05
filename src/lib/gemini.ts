import { storage } from "#imports";

export const callGemini = async (prompt: string) => {
    const apiKey = await storage.getItem("local:geminiApiKey");

    if (!apiKey) {
        console.error("No API key found!");
        return null;
    };

    // Use a valid model name
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
        throw new Error(data.error?.message ?? "Gemini API request failed");
    }

    // Extract the text from the response
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
};