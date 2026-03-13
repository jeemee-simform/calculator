import { tokenize } from "./tokenizer.js";
import { infixToPostfix } from "./infixToPostfix.js";
import { evaluatePostfix } from "./evaluatePostfix.js";
import { saveHistory, showHistory } from "../util/helper.js";
import { display, historyListDiv } from "../util/constants.js";

function output(str) {
  try {
    const tokens = tokenize(str);
    if (tokens === "Error") {
      display.innerText = "Error";
      return;
    }
    console.log("token  ", tokens);

    const postfix = infixToPostfix(tokens);
    console.log("postfix  ", postfix);

    const ans = evaluatePostfix(postfix);

    if (!isNaN(ans)) {
      saveHistory(str);
      showHistory(historyListDiv);
    }

    display.innerText = isNaN(ans) ? "Error" : ans;
  } catch (e) {
    display.innerText = "Error";
  }
}

export { output };
