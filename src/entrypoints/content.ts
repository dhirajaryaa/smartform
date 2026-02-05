import { browser } from "#imports";
import { isSupportedField } from "@/utils/getSupportedFiled";
import { getFieldMeta } from "@/utils/getFieldMeta";

export default defineContentScript({
    //? matches: ['*://*/*'],// production url 
    matches: ["https://www.themoviedb.org/*", "https://docs.google.com/forms/*", "https://dhirajarya.xyz/contact"], //!testing purposes
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
                    form?.style.setProperty("border", "4px solid #007bff", "important");
                    form?.style.setProperty("padding", "6px", "important");
                    form?.style.setProperty("border-radius", "6px", "important");

                    // get all editable fields in the form
                    const fields = getEditableElement(form).filter(isSupportedField);

                    if (!fields.length) {
                        console.warn("⚠️ No editable fields found");
                        return;
                    };

                    //? extract meta data from fields
                    const inputMetaData = getFieldMeta(fields);

                    //? send message to background to process the data
                    browser.runtime.sendMessage({
                        action: "PROCESS_FIELDS",
                        data: {
                            heading, fields: inputMetaData
                        }
                    });

                    // Todo: 1. pass to llm 
                    // Todo: 2. set value on form 
                    // Todo: 3. remove styling from form 
                };

            });

        }
        else {
            console.warn("SmartForm: Invalid context for content script execution.");
        }

    },
});