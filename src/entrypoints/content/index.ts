import { browser } from "#imports";
import { supportedField } from "@/utils/getSupportedField";
import { getActiveForm } from "@/lib/getActiveForm";
import { setFormActiveStyle } from "@/utils/formStyle";
import { getEditableField } from "@/utils/getEditableField";
import { getFieldContext } from "@/utils/getFieldContext";
import { setFieldValue } from "@/lib/setFieldValue";
import { showToast } from "./toast";

export default defineContentScript({
    matches: ["<all_urls>"],
    main(ctx) {
        // get site heading 
        const heading = document.title || document.querySelector("h1")?.textContent;
        // for generate random data local usable lang based
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        // run when click on context menu
        browser.runtime.onMessage.addListener(async (message, sender) => {
            // trigger to select form fields
            switch (message.action) {
                case "get-form-fields":
                    //! get active form 
                    const form = getActiveForm();
                    if (form) {

                        // Todo - get all editable filed;
                        // Todo - filter fields pick only supported;
                        const allFields = getEditableField(form).filter(supportedField);

                        // Todo - get field context or label;
                        // Todo - set generated id;
                        let fieldContext: any[] = [];
                        const formContext = allFields?.map((el: HTMLElement, idx) => {
                            const context = getFieldContext(el);
                            const id = `fl_${idx}`;
                            fieldContext.push({ el, id });

                            return { ...context, id }
                        }).filter(Boolean);

                        if (formContext.length === 0) {
                            showToast({
                                message: "SmartForm: No valid form detected",
                                type: "error",
                            });
                            return;
                        }

                        // Todo - set styling for better ux.
                        setFormActiveStyle(form);

                        // Todo - send to llm;
                        const response = await browser.runtime.sendMessage({
                            action: "process-field-data",
                            data: { heading, timezone, formContext }
                        });

                        // Todo - show Response if error alert it;
                        if (response.status === 'error') {
                            showToast({ message: response.message, type: 'error' })
                        };

                        // Todo - show Response if succuss so set field id based value
                        if (response?.status === "done" && response?.data) {

                            fieldContext.forEach((field) => {
                                const value = JSON.parse(response.data)[field.id]

                                if (!value || typeof value !== "string") return;

                                setFieldValue(field.el, value);
                            });
                        }

                        // Todo - then remove form styling
                        removeFormActiveStyle(form);
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