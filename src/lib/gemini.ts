import {storage} from "#imports";

export const callGemini = async (prompt: string) => {
    const apiKey = await storage.getItem("local:geminiApiKey");
    if(!apiKey){
        throw new Error("No API key found for Gemini");
    };

    console.log(prompt);
    
    console.log(`total prompt is : ${prompt.length}`);



    
return "Gemini response placeholder";
}