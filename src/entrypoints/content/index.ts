import { browser } from "#imports";
import { supportedField } from "@/utils/getSupportedField";
import { getFieldMeta } from "@/utils/getFieldMeta";
import { getActiveForm } from "@/lib/getActiveForm";
import { setFormActiveStyle } from "@/utils/formStyle";
import { getEditableField } from "@/utils/getEditableField";
import { getFieldContext } from "@/utils/getFieldContext";

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
                        // Todo - set styling for better ux.
                        setFormActiveStyle(form);

                        // Todo - get all editable filed;
                        // Todo - filter fields pick only supported;
                        const allFields = getEditableField(form).filter(supportedField);

                        // Todo - get field context or label;
                        // Todo - set generated id;
                        const formContext = allFields.map((el: HTMLElement) => getFieldContext(el));
                        console.log(JSON.stringify(formContext));

                        // Todo - send to llm;
                        const response = await browser.runtime.sendMessage({
                            action: "process-field-data",
                            data: { heading, timezone, formContext }
                        }
                        );
                        // Todo - show Response if error alert it;
                        // Todo - show Response if succuss so set field id based value
                        // Todo - then remove form styling
                    };
                    break;

                default:
                    break;
            }
        });

        //! ===================================================== !//
        //* error show on invalid dom 
        if (ctx.isInvalid) {
            console.warn("SmartForm: Invalid context for content script execution.");
        };
    },
});