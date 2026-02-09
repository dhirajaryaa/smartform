import { browser } from "#imports";
import { isSupportedField } from "@/utils/getSupportedFiled";
import { getFieldMeta } from "@/utils/getFieldMeta";
import { getActiveForm } from "@/lib/getActiveForm";
import { setFormActiveStyle } from "@/utils/formStyle";

export default defineContentScript({
    // Todo: matches: ['*://*/*'],// production url 
    matches: ["https://www.themoviedb.org/*", "https://docs.google.com/forms/*"], //!testing purposes
    main(ctx) {
        // get site heading 
        const heading = document.title || document.querySelector("h1")?.textContent;
        // for generate random data local usable lang based
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        console.log(timezone);



        // run when click on context menu
        browser.runtime.onMessage.addListener(async (message, sender) => {
            // trigger to select form fields
            switch (message.action) {
                case "get-form-fields":
                    //! get active form 
                    const form = getActiveForm();
                    if (form) {
                        setFormActiveStyle(form)
                    };

                    break;

                default:
                    break;
            }

            if (message.action === "SMART_FILL") {

                const form = getActiveForm();
                if (form) {
                    console.log("styling");

                    setFormActiveStyle(form)
                };

                //? highlight the form
                form?.style.setProperty("border", "4px solid #2596be", "important");
                form?.style.setProperty("padding", "8px", "important");
                form?.style.setProperty("border-radius", "8px", "important");

                // get all editable fields in the form
                const fields = getEditableElement(form).filter(isSupportedField);

                if (!fields.length) {
                    console.warn("⚠️ No editable fields found");
                    return;
                };

                //? extract meta data from fields
                const inputMetaData = getFieldMeta(fields);
                console.log(inputMetaData);


                //? send message to background to process the data
                // const response = await browser.runtime.sendMessage({
                //     action: "PROCESS_FIELDS",
                //     data: {
                //         heading, fields: inputMetaData
                //     }
                // });


                // if (response?.status === "error") {
                //     alert(response.message);

                //     //? reset form styling 
                //     form?.style.removeProperty("border");
                //     form?.style.removeProperty("padding");
                //     form?.style.removeProperty("border-radius");
                // };

                // set response to field 
                // if (response?.status === "done") {
                //     const data =
                //         typeof response.data === "string"
                //             ? JSON.parse(response.data)
                //             : response.data;

                //     fields?.forEach((el: HTMLElement) => {
                //         if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                //             const key = el.name || el.id;

                //             if (key && data[key] !== undefined) {
                //                 el.value = data[key];

                //                 el.dispatchEvent(new Event("input", { bubbles: true }));
                //                 el.dispatchEvent(new Event("change", { bubbles: true }));
                //             }
                //         }
                //     });

                //     //? reset form styling 
                //     form?.style.removeProperty("border");
                //     form?.style.removeProperty("padding");
                //     form?.style.removeProperty("border-radius");

                // }



            };
        });

        //! ===================================================== !//
        //* error show on invalid dom 
        if (ctx.isInvalid) {
            console.warn("SmartForm: Invalid context for content script execution.");
        };
    },
});