import { defineBackground, storage, browser } from "#imports";
import { callGemini } from "@/lib/gemini";
import { llmRealDataPrompt } from "@/utils/prompt";

export default defineBackground(() => {
    //   banner print  
    console.log(`
 ▗▄▄▖▗▖  ▗▖ ▗▄▖ ▗▄▄▖▗▄▄▄▖    ▗▄▄▄▖ ▗▄▖ ▗▄▄▖ ▗▖  ▗▖
▐▌   ▐▛▚▞▜▌▐▌ ▐▌▐▌ ▐▌ █      ▐▌   ▐▌ ▐▌▐▌ ▐▌▐▛▚▞▜▌
 ▝▀▚▖▐▌  ▐▌▐▛▀▜▌▐▛▀▚▖ █      ▐▛▀▀▘▐▌ ▐▌▐▛▀▚▖▐▌  ▐▌
▗▄▄▞▘▐▌  ▐▌▐▌ ▐▌▐▌ ▐▌ █      ▐▌   ▝▚▄▞▘▐▌ ▐▌▐▌  ▐▌
`);

    console.info("smart form working📃....");

    //! main code logic here
    browser.runtime.onInstalled.addListener(async (details) => {
        //log installation details
        if (details.reason === "install") {
            await storage.setItem("local:installDate", new Date().toDateString());
        };
    });

    //! create context menu
    browser.contextMenus.create({
        id: "smartform-auto-filler",
        title: "Fill with SmartForm",
        contexts: ["editable"]
    });

    //? trigger message to get access all input
    browser.contextMenus.onClicked.addListener((info, tab) => {
        if (!tab?.id) return;
        if (info.menuItemId === "smartform-auto-filler") {
            // send message to content script to get all input fields
            browser.tabs.sendMessage(tab.id, {
                action: "get-form-fields"
            });
            return;
        };
    });

    //? listen for messages from content script
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
        //* process field
        if (message.action === "PROCESS_FIELDS") {
            (async () => {
                // check user info 
                const userInfo = await storage.getItem("local:userInfo");
                // check api key 
                const geminiApiKey = await storage.getItem("local:geminiApiKey");
                if (!geminiApiKey) {
                    sendResponse({ status: "error", message: "No Gemini API key provided" });
                    return;
                };
                // call ai and send res 
                const prompt = llmRealDataPrompt
                    .replace("ADD_INPUT_FIELDS", JSON.stringify(message.data))
                    .replace("ADD_USER_DATA", JSON.stringify(userInfo ?? ""));

                const llmRes = await callGemini(prompt);

                if (!llmRes.success) {
                    sendResponse({
                        status: "error",
                        message: llmRes.error
                    });
                    return;
                }

                sendResponse({
                    status: "done",
                    data: llmRes.data
                });
            })();
            return true; //? important for async response
        }
    });

});