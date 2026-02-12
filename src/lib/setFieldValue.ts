export function setFieldValue(
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    value: string
) {
    if (element instanceof HTMLSelectElement) {
        element.value = value;

        element.dispatchEvent(
            new Event("change", { bubbles: true })
        );
            return;

    };
    const prototype = Object.getPrototypeOf(element);
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

    descriptor?.set?.call(element, value);

    element.dispatchEvent(
        new Event("input", { bubbles: true })
    );

    element.dispatchEvent(
        new Event("change", { bubbles: true })
    );

    element.dispatchEvent(
        new Event("blur", { bubbles: true })
    );
}
