import { FUNCTIONS, operators, trig } from "../util/constants.js";
import { factorial, radian } from "../util/helper.js";

function evaluatePostfix(postfix) {
  const stack = [];

  for (const token of postfix) {
    if (typeof token === "number") {
      stack.push(token);
    } else if (FUNCTIONS.includes(token)) {
      // functions
      const a = stack.pop();
      let result = trig[token](a);
      stack.push(Number(result.toFixed(10)));
    } else {
      // Operators
      const b = stack.pop();
      const a = stack.pop();

      if (token === "√") {
        stack.push(Math.sqrt(b));
      } else if (token === "!") {
        stack.push(factorial(b));
      } else {
        stack.push(operators[token](a, b));
      }
    }
  }
  return stack[0];
}

export { evaluatePostfix };
