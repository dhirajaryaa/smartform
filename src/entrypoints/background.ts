import { defineBackground, storage, browser } from "#imports";

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

        // run background tasks on click on context menu
        browser.contextMenus.onClicked.addListener(async (info, tab) => {
                        
            if (info.menuItemId === "smartform-auto-fill") {
                // send message to content script to fill the form
                console.table(tab);
                
            }
        });
    })


});