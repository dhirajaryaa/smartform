export function getAllEditableFields(): HTMLElement[] {
    const elements = document.querySelectorAll(`
   input,
    textarea,
    select,
    [contenteditable="true"],
    [role="textbox"]
  `);

    return Array.from(elements) as HTMLElement[];
}
