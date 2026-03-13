import { output } from "../services/output.js";
import { valid } from "../services/validation.js";
import { display } from "../util/constants.js";

export const btnDivhandler = (e) => {
  let id = e.target.id;
  let value = e.target.value;

  switch (id) {
    case "bacsp":
      display.textContent = display.textContent.slice(0, -1);
      return;
    case "c":
      display.innerText = "";
      return;
    case "=":
      valid(display.innerText)
        ? output(display.innerText)
        : display.innerText == ""
          ? (display.innerText = "")
          : (display.innerText = "Error");
      return;
  }
  if (value !== "trigonometry") display.innerText += value ? value : id;
};
