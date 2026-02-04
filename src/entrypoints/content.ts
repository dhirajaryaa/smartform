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

                    //! get active form 
                    const field = document.activeElement as HTMLElement | null;
                    const form = field?.closest("form") || field?.closest("[role='form']") || document.querySelector("form") || document.querySelector("[role='form']");

                    //? highlight the form
                    form?.style.setProperty("outline", "4px solid #007bff", "important");
                    form?.style.setProperty("padding", "6px", "important");
                    form?.style.setProperty("border-radius", "6px", "important");

                    // get all editable fields in the form
                    const fields = getEditableElement(form).filter(isSupportedField);

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