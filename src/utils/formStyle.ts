function setFormActiveStyle(form: HTMLElement | HTMLFormElement) {

  form.style.setProperty("border", "4px solid #007bff", "important");
  form.style.setProperty("padding", "6px", "important");
  form.style.setProperty("border-radius", "6px", "important");
};

function removeFormActiveStyle(form: HTMLElement | HTMLFormElement) {
  //? reset form styling 
  form.style.removeProperty("border");
  form.style.removeProperty("padding");
  form.style.removeProperty("border-radius");

}

export { setFormActiveStyle, removeFormActiveStyle };