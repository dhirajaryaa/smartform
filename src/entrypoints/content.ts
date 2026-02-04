import { getAllEditableFields } from "@/utils/getEditableElement";
import { extractFieldMeta } from "@/utils/getFieldMeta";
import { browser } from "#imports";
import { isSupportedField } from "@/utils/getSupportedFiled";

export default defineContentScript({
    //? matches: ['*://*/*'],// production url 
    matches: ["https://www.themoviedb.org/*", "https://docs.google.com/forms/*"], //!testing purposes
    main(ctx) {
        if (ctx.isValid) {

            const heading = document.title || document.querySelector("h1")?.textContent ;

            // run when click on context menu
            browser.runtime.onMessage.addListener((message) => {
                if (message.action === "SMART_FILL") {
                    console.log("🙏🙏🙏🙏🙏🙏");

                    const fields = getAllEditableFields().filter(isSupportedField);                    

                    if (!fields.length) {
                        console.warn("⚠️ No editable fields found");
                        return;
                    };

                    const metaList = fields.map(extractFieldMeta);

                    // send message to background to process the data
                    browser.runtime.sendMessage({
                        action: "PROCESS_FIELDS",
                        data: { heading, fields: metaList }
                    }, (response) => {
                        console.log("Response from background:", response);
                    })
                }
                //     if (message.type === "GET_EDITABLE_FIELDS") {
                //         const fields = getAllEditableFields();
                //         if (fields.length > 0) {
                //             filteredInputs = fields.filter((field) => {
                //                 const editableElement = getEditableElement(field);
                //                 if (editableElement) {
                //                     const fieldMeta = extractFieldMeta(editableElement);
                //                     return SUPPORTED_INPUTS.includes(fieldMeta.type);
                //                 }
                //                 return false;
                //             });
                //         };
                //     }
                // });
            });

        }
        else {
            console.warn("SmartForm: Invalid context for content script execution.");
        }

    },
});