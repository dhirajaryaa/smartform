interface FieldMeta {
  label: string;
  type: string;
  placeholder: string;
  name: string;
};

export function extractFieldMeta(el: HTMLElement | HTMLInputElement): FieldMeta {
  const label = el?.labels[0]?.innerText.trim() || el.closest("label")?.innerText.trim() || el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || "";

  return {
    label,
    name: el.getAttribute("name") || "",
    type: el.getAttribute("type") || el.tagName.toLowerCase(),
    placeholder: el.getAttribute("placeholder") || ""
  };
};


