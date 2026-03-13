import { associativity, FUNCTIONS, precedence } from "../util/constants.js";

function infixToPostfix(tokens) {
  const output = [];
  const stack = [];

  for (const token of tokens) {
    if (typeof token === "number") {
      output.push(token);
    } else if (FUNCTIONS.includes(token)) {
      stack.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();

      if (stack.length && FUNCTIONS.includes(stack[stack.length - 1])) {
        output.push(stack.pop());
      }
    } else {
      while (
        stack.length &&
        stack[stack.length - 1] !== "(" &&
        !FUNCTIONS.includes(stack[stack.length - 1]) &&
        ((associativity[token] === "L" &&
          precedence[token] <= precedence[stack[stack.length - 1]]) ||
          (associativity[token] === "R" &&
            precedence[token] < precedence[stack[stack.length - 1]]))
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}

export { infixToPostfix };
