interface FieldMeta {
  type: string;
  context: string;
  name?: string;
  options?: string[];
};

function getFieldContext(el: HTMLElement): string {
  if (!el) return "";

  // 1️⃣ Native <label for="">
  if ((el as HTMLInputElement).labels?.length) {
    return cleanText((el as HTMLInputElement).labels![0].innerText);
  }

  // 2️⃣ Wrapped inside <label>
  const wrappedLabel = el.closest("label");
  if (wrappedLabel) {
    return cleanText(wrappedLabel.innerText);
  }

  // 3️⃣ aria-labelledby
  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    const ids = labelledBy.split(" ");
    for (const id of ids) {
      const ref = document.getElementById(id);
      if (ref?.innerText) {
        return cleanText(ref.innerText);
      }
    }
  }

  // 4️⃣ aria-label
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel) return cleanText(ariaLabel);

  // 5️⃣ Placeholder
  if ((el as HTMLInputElement).placeholder) {
    return cleanText((el as HTMLInputElement).placeholder);
  }

  // 6️⃣ Look for nearby heading (Google Forms style)
  let parent = el.parentElement;
  let depth = 0;

  while (parent && depth < 4) {
    // role="heading"
    const roleHeading = parent.querySelector('[role="heading"]');
    if (roleHeading?.textContent) {
      return cleanText(roleHeading.textContent);
    }

    // Standard headings
    const heading = parent.querySelector("h1, h2, h3, h4, legend");
    if (heading?.textContent) {
      return cleanText(heading.textContent);
    }

    parent = parent.parentElement;
    depth++;
  }

  return "";
};

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\*/g, "")
    .trim()
    .slice(0, 200); // prevent huge blocks
}

export function extractFieldMeta(el: HTMLElement): FieldMeta {
  const context = getFieldContext(el);
  return {
    context: el instanceof HTMLSelectElement ? el.getAttribute("name") || context : context,
    type: el.getAttribute("type") || el.tagName.toLowerCase(),
    options:
      el instanceof HTMLSelectElement
        ? Array.from(el.options).map(opt => opt.value)
        : undefined
  };
}


export function generateFieldId(
  index: number
) {
  return `${Date.now()}_${index}`;
}





