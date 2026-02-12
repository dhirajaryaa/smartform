export interface FieldContext {
  label: string;
  options?: string[];
  type: string | undefined;
}

export function getFieldContext(el: HTMLElement): FieldContext | null {
  if (!el) return null;

  // Skip hidden input
  if (el instanceof HTMLInputElement && el.type === "hidden") {
    return null;
  }

  // ----------------------------
  // 🔹 TYPE DETECTION
  // ----------------------------
  let type: string | undefined;

  if (el instanceof HTMLInputElement) {
    type = el.type;
  } else if (el instanceof HTMLTextAreaElement) {
    type = "textarea";
  } else if (el instanceof HTMLSelectElement) {
    type = "select";
  } else {
    return null; // only support input/textarea/select
  }

  //? LABEL DETECTION

  let label = "";

  // 1. aria-label
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel?.trim()) {
    label = ariaLabel.trim();
  }

  // 2. aria-labelledby (Google Forms compatible)
  if (!label) {
    const labelledBy = el.getAttribute("aria-labelledby");

    if (labelledBy) {
      const ids = labelledBy.split(" ");
      for (const id of ids) {
        const refEl = document.getElementById(id);
        if (!refEl) continue;
        const text = refEl.textContent?.trim();
        if (text) {
          label = text.replace(/\*$/, "").trim();
          break;
        }
      }
    }
  }

  // 3. label[for]
  if (!label && el.id) {
    const labelEl = document.querySelector(`label[for="${el.id}"]`);
    if (labelEl?.textContent?.trim()) {
      label = labelEl.textContent.trim();
    }
  }

  // 4. wrapped label
  if (!label) {
    const wrapped = el.closest("label");
    if (wrapped?.textContent?.trim()) {
      label = wrapped.textContent.trim();
    }
  }

  // 5. fieldset legend
  if (!label) {
    const fieldset = el.closest("fieldset");
    const legend = fieldset?.querySelector("legend");
    if (legend?.textContent?.trim()) {
      label = legend.textContent.trim();
    }
  }

  // 6. Google Forms parent container fallback
  if (!label) {
    label = detectParentLabel(el);
  }

  // 7. placeholder fallback
  if (!label && "placeholder" in el) {
    label = (el as HTMLInputElement).placeholder || "";
  }

  // 8. name fallback
  if (!label) {
    label = el.getAttribute("name") || "";
  }

  // 10.  Google Forms parent container fallback
  if (!label) {
    label = detectParentLabel(el);
  }

  // Final clean
  label = label.replace(/\*$/, "").trim();

  //? SELECT OPTIONS

  let options: string[] | undefined;

  if (el instanceof HTMLSelectElement) {
    options = Array.from(el.options)
      .map(option => option.textContent?.trim() || "")
      .filter(Boolean);
  }

  return {
    label,
    type,
    ...(options && { options })
  };
}

// ? Google Forms Parent Detector [brute force]
function detectParentLabel(el: HTMLElement): string {
  let parent: HTMLElement | null = el.parentElement;
  let depth = 0;
  const MAX_DEPTH = 6; // prevent infinite loop

  while (parent && depth < MAX_DEPTH) {

    // Google Forms main question container
    if (parent.getAttribute("role") === "listitem") {
      const heading = parent.querySelector('[role="heading"]');
      if (heading?.textContent?.trim()) {
        return heading.textContent.replace(/\*$/, "").trim();
      }
    }

    parent = parent.parentElement;
    depth++;
  }

  return "";
};
