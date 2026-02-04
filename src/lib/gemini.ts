import {storage} from "#imports"
// const apiKey = import.meta.env.WXT_GEMINI_API_KEY;

export const callGemini = async (prompt: string) => {
    const apiKey = await storage.getItem("local:geminiApiKey");
    
    console.log(apiKey);

    console.log(prompt);

    console.log(`total prompt is : ${prompt.length}`);
    

}