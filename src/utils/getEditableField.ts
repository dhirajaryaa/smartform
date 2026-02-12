export function getEditableField(form: HTMLFormElement | null): HTMLElement[] {
  if (!form) return [];

  const elements = form.querySelectorAll(`
   input,
    textarea,
    select,
    [contenteditable="true"],
    [role="textbox"]
  `);

  return Array.from(elements) as HTMLElement[];
}
