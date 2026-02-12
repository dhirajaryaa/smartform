type ToastType = "success" | "error" | "info";

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

let toastContainer: HTMLElement | null = null;

function createContainer() {
  if (toastContainer) return toastContainer;

  toastContainer = document.createElement("div");
  toastContainer.id = "__smartform_toast_container__";
  toastContainer.style.position = "fixed";
  toastContainer.style.top = "20px";
  toastContainer.style.left = "50%";
  toastContainer.style.transform = "translateX(-50%)";
  toastContainer.style.zIndex = "999999";
  toastContainer.style.display = "flex";
  toastContainer.style.flexDirection = "column";
  toastContainer.style.gap = "10px";

  document.body.appendChild(toastContainer);
  return toastContainer;
}

function getBgColor(type: ToastType) {
  switch (type) {
    case "success":
      return "#16a34a";
    case "error":
      return "#dc2626";
    case "info":
    default:
      return "#2563eb";
  }
}

export function showToast({
  message,
  type = "info",
  duration = 3000,
}: ToastOptions) {
  const container = createContainer();

  const toast = document.createElement("div");
  toast.textContent = message;

  toast.style.background = getBgColor(type);
  toast.style.color = "#fff";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.fontFamily = "system-ui, sans-serif";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  toast.style.opacity = "0";
  toast.style.transform = "translateY(-10px)";

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
