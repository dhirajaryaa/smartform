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

    // main code logic here
    browser.runtime.onInstalled.addListener(async (details) => {
        //log installation details
        if (details.reason === "install") {
            await storage.setItem("local:installDate", new Date().toDateString());
            await storage.setItem("local:lastUpdate", new Date().toDateString());
        }
        else if (details.reason === "update") {
            await storage.setItem("local:lastUpdate", new Date().toDateString());
        };

        //create context menu
        browser.contextMenus.create({
            id: "smartform-auto-fill",
            title: "Fill with SmartForm",
            contexts: ["editable"]
        });

        //? run background tasks on click on context menu
        browser.contextMenus.onClicked.addListener(async (info, tab) => {
            if (!tab?.id) return;
            if (info.menuItemId === "smartform-auto-fill") {
                // send message to content script to get all input fields
                browser.tabs.sendMessage(tab.id, {
                    action: "SMART_FILL"
                });
                return;
            };

            // browser.contextMenus.onClicked.addListener(async (info, tab) => {

            //     if (info.menuItemId === "smartform-auto-fill") {
            //         // send message to content script to fill the form
            //         browser.tabs.sendMessage(tab?.id!, {
            //             action: "SMART_FILL"
            //         });

            //     }
            // });
        });

        //? listen for messages from content script
        browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
            if (message.action === "PROCESS_FIELDS") {
                const userInfo = await storage.getItem("local:userInfo");
                const geminiApiKey = await storage.getItem("local:geminiApiKey");

                if (!geminiApiKey) {
                    sendResponse({ status: "error", message: "No Gemini API key found. Please set it in the extension options." });
                    return;
                };

                const prompt = llmRealDataPrompt
                    .replace("ADD_INPUT_FIELDS", JSON.stringify(message.data))
                    .replace("ADD_USER_DATA", JSON.stringify(userInfo ?? ""));

                //! call gemini api with prompt
                const llmRes = await callGemini(prompt);
                // console.log(llmRes);

                

                //* send message to set value on input
                sendResponse({ status: "done", data: llmRes });
            }
            return true;
        })
    });

});