import { FUNCTIONS } from "../util/constants.js";

function tokenize(expr) {
  try {
    const tokens = [];
    let i = 0;
    let expectNumber = true;

    while (i < expr.length) {
      const char = expr[i];

      if (char === " ") {
        i++;
        continue;
      }

      if (
        "0123456789.".includes(char) ||
        ((char === "+" || char === "-") && expectNumber)
      ) {
        let num = char;
        i++;
        while (i < expr.length && "0123456789.".includes(expr[i])) {
          num += expr[i];
          i++;
        }
        tokens.push(Number(num));
        expectNumber = false;
        continue;
      }

      if (/[a-zA-Z]/.test(char)) {
        let name = char;
        i++;
        while (i < expr.length && /[a-zA-Z]/.test(expr[i])) {
          name += expr[i];
          i++;
        }
        if (!FUNCTIONS.includes(name)) {
          throw new Error("Unknown function: " + name);
        }
        tokens.push(name);
        expectNumber = true;
        continue;
      }

      if ("*/%^√!".includes(char)) {
        tokens.push(char);
        expectNumber = char !== "!";
        i++;
        continue;
      }

      if (char === "+" || char === "-") {
        tokens.push(char);
        expectNumber = true;
        i++;
        continue;
      }

      if (char === "(") {
        tokens.push(char);
        expectNumber = true;
        i++;
        continue;
      }

      if (char === ")") {
        tokens.push(char);
        expectNumber = false;
        i++;
        continue;
      }

      throw new Error("Invalid character: " + char);
    }

    return tokens;
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

export { tokenize };
