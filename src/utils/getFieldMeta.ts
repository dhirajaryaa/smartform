export function getFieldMeta(fields: HTMLElement[]) {
    return fields.map((filed: HTMLElement) => {
        if (filed instanceof HTMLInputElement) {
            const label = (filed.labels?.[0]?.textContent || filed.closest("label")?.textContent || "").replace(/\s+/g, " ").trim();
            return {
                label: label,
                type: filed.type || "text",
                name: filed.name || "",
            };
        }
        return null; // or handle non-input elements as needed
    }).filter(meta => meta !== null);
}