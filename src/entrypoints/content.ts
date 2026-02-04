import { getAllEditableFields } from "@/utils/getEditableElement";
import { extractFieldMeta, generateFieldId } from "@/utils/getFieldMeta";
import { browser } from "#imports";
import { isSupportedField } from "@/utils/getSupportedFiled";

export default defineContentScript({
    //? matches: ['*://*/*'],// production url 
    matches: ["https://www.themoviedb.org/*", "https://docs.google.com/forms/*"], //!testing purposes
    main(ctx) {
        if (ctx.isValid) {
            const heading = document.title || document.querySelector("h1")?.textContent;

            // run when click on context menu
            browser.runtime.onMessage.addListener((message) => {
                // trigger to select form fields
                if (message.action === "SMART_FILL") {

                    const fields = getAllEditableFields().filter(isSupportedField);

                    if (!fields.length) {
                        console.warn("⚠️ No editable fields found");
                        return;
                    };
                    console.log("Detected fields:", fields);

                    //? extract meta data from fields
                    const metaList = fields.map(extractFieldMeta);
                    //? send message to background to process the data
                    browser.runtime.sendMessage({
                        action: "PROCESS_FIELDS",
                        data: {
                            heading, fields: metaList.map((meta, index) => ({
                                id: generateFieldId(index),
                                ...meta
                            }))
                        }
                    });
                };

            });

        }
        else {
            console.warn("SmartForm: Invalid context for content script execution.");
        }

    },
});