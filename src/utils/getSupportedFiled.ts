export function isSupportedField(el: HTMLElement): boolean {
    // Skip invisible elements
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") {
        return false;
    }

    // Skip disabled
    if ((el as any).disabled) return false;

    // INPUT elements
    if (el instanceof HTMLInputElement) {
        const type = el.type.toLowerCase();

        const allowedTypes = [
            "text",
            "email",
            "tel",
            "number",
            "url",
            "search"
        ];

        if (!allowedTypes.includes(type)) return false;

        // Skip hidden, submit, button etc
        if (
            ["hidden", "submit", "button", "reset", "file", "checkbox", "radio", "color", "date"].includes(type)
        ) {
            return false;
        }

        // Skip already filled
        if (el.value.trim() !== "") return false;

        return true;
    }

    // TEXTAREA
    if (el instanceof HTMLTextAreaElement) {
        if (el.value.trim() !== "") return false;
        return true;
    }

    // SELECT (optional support)
    if (el instanceof HTMLSelectElement) {
        return true;
    }

    // Contenteditable
    if (el.isContentEditable) return true;

    // ARIA textbox
    if (el.getAttribute("role") === "textbox") return true;

    return false;
}
