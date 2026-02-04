const apiKey = import.meta.env.WXT_GEMINI_API_KEY;

export const callGemini = async (prompt: string) => {
    console.log(apiKey);

    console.log(prompt);

    console.log(`total prompt is : ${prompt.length}`);
    

}