export function getActiveForm(): HTMLFormElement | null {
    const field = document.activeElement as HTMLElement | null;
    return field?.closest("form") || field?.closest("[role='form']") || document.querySelector("form") || document.querySelector("[role='form']");

};