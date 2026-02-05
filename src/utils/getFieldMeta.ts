export function getFieldMeta(fields: HTMLElement[]) {
    return fields.map((field: HTMLElement) => {
        if (field instanceof HTMLInputElement ||
            field instanceof HTMLTextAreaElement) {
            const label = (field.labels?.[0]?.textContent || field.closest("label")?.textContent || "").replace(/\s+/g, " ").trim();
            return {
                label: label,
                type: field.type || "text",
                name: field.name || "",
            };
        }
        return null; // or handle non-input elements as needed
    }).filter(meta => meta !== null);
}