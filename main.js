const btnDiv = document.getElementsByClassName("btn-div")[0];
const display = document.getElementById("display");
const historyListDiv = document.getElementsByClassName("list")[0];
const clear = document.getElementsByClassName("clear")[0];

showHistory();

historyListDiv.addEventListener("click", (e) => {
  if (e.target.className == "list-item") {
    display.innerText = e.target.innerText.split(" ")[1];
  }
});

clear.addEventListener("click", (e) => {
  localStorage.setItem("history", JSON.stringify([]));
  showHistory();
});

btnDiv.addEventListener("click", (e) => {
  let id = e.target.id;
  let value = e.target.value;

  switch (id) {
    case "bacsp":
      display.innerHTML = display.innerHTML.slice(0, -1);
      return;
    case "c":
      display.innerText = "";
      return;
    case "=":
      valid()
        ? output()
        : display.innerText == ""
          ? (display.innerText = "")
          : (display.innerText = "Error");
      return;
  }
  if (value !== "trigonometry") display.innerText += value ? value : id;
});

function valid() {
  const str = display.innerText;
  let bracketCount = 0;

  // bracket validater
  for (const char of str) {
    if (char === "(") bracketCount++;
    else if (char === ")") {
      if (bracketCount <= 0) return false;
      bracketCount--;
    }
  }
  if (bracketCount) return false;

  // check char alowed or not
  const allowedPattern =
    /^(?:3\.14159|2\.71828|sin\(|cos\(|cosec\(|sec\(|cot\(|tan\(|log\(|ln\(|\^\-1|\^2|[0-9+\-*/%^√!().])+$/;
  if (!allowedPattern.test(str)) return false;

  // check desimal validation
  const invalidDesimal = /\d*\.\d*\./;
  if (invalidDesimal.test(str)) return false;

  // no consecutiv binary operator allowed
  const consecutivOperator = /[+\-*/%^]{2,}/;
  if (consecutivOperator.test(str)) return false;

  // invalid start and end
  const invalidStart = /^[*/%^]/;
  const invalidEnd = /[+\-*/%^√(]$/;
  if (invalidStart.test(str) || invalidEnd.test(str)) return false;

  // check postfix operqator
  const invalidPostfixOperator = /(^|[+\-*/%^√(])(\!|\^2|\^\-1)/;
  // factorial must not follow decimal
  const invalidFactorialDecimal = /\d+\.\d+!/;
  if (invalidPostfixOperator.test(str) || invalidFactorialDecimal.test(str))
    return false;

  //in valid prefix operator
  const invalidPrefixOperator =
    /(\d|\)|!|\^2|\^\-1)(√|sin\(|cos\(|cosec\(|sec\(|cot\(|tan\(|log\(|ln\()/;
  if (invalidPrefixOperator.test(str)) return false;

  // invalid function usege
  const invalidFunctionUsage = /(sin|cos|cosec|sec|cot|tan|log|ln)(?!\()/;
  if (invalidFunctionUsage.test(str)) return false;

  // invalid parenthesis ending: only !, numbers, or functions allowed before ')'
  const invalidParenEnd = /\([^\)]*([+\-*/%^√])\)/;
  if (invalidParenEnd.test(str)) return false;

  return true;
}

const FUNCTIONS = [
  "sin",
  "cos",
  "tan",
  "cosec",
  "sec",
  "cot",
  "tan",
  "log",
  "ln",
];

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

const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "%": 2,
  "^": 3,
  "√": 4,
  "!": 5,
};

const associativity = {
  "+": "L",
  "-": "L",
  "*": "L",
  "/": "L",
  "%": "L",
  "^": "R",
  "√": "R",
  "!": "L",
};

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

function evaluatePostfix(postfix) {
  const stack = [];

  for (const token of postfix) {
    if (typeof token === "number") {
      stack.push(token);
    } else if (FUNCTIONS.includes(token)) {
      const a = stack.pop();
      let result;
      switch (token) {
        case "sin":
          result = Math.sin((a * Math.PI) / 180);
          break;
        case "cos":
          result = Math.cos((a * Math.PI) / 180);
          console.log(a, result);
          break;
        case "tan":
          result = Math.tan((a * Math.PI) / 180);
          break;
        case "cosec":
          result = 1 / Math.sin((a * Math.PI) / 180);
          break;
        case "sec":
          result = 1 / Math.cos((a * Math.PI) / 180);
          break;
        case "cot":
          result = 1 / Math.tan((a * Math.PI) / 180);
          break;
        case "tan":
          result = Math.tan((a * Math.PI) / 180);
          break;
        case "log":
          result = a <= 0 ? NaN : Math.log10(a);
          break;
        case "ln":
          result = a <= 0 ? NaN : Math.log(a);
          break;
      }
      stack.push(result.toFixed(2));
    } else {
      // Operators
      if (token === "+") {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a + b);
      } else if (token === "-") {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a - b);
      } else if (token === "*") {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a * b);
      } else if (token === "/") {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a / b);
      } else if (token === "%") {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a % b);
      } else if (token === "^") {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(Math.pow(a, b));
      } else if (token === "√") {
        const a = stack.pop();
        stack.push(Math.sqrt(a));
      } else if (token === "!") {
        const a = stack.pop();
        stack.push(factorial(a));
      }
    }
  }

  return stack[0];
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;

  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function saveHistory(str) {
  if (!localStorage.getItem("history")) {
    localStorage.setItem("history", JSON.stringify([]));
  }

  const arr = JSON.parse(localStorage.getItem("history"));
  console.log(arr);

  arr.push(str);

  localStorage.setItem("history", JSON.stringify(arr));
}

function showHistory() {
  const historyList = document.getElementsByClassName("list")[0];

  const arr = JSON.parse(localStorage.getItem("history")) || [];

  historyList.innerHTML = "";
  arr.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.textContent = `${index + 1}. ${item}`;
    historyList.appendChild(div);
  });
}

function output() {
  try {
    const str = display.innerText;

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
      showHistory();
    }

    display.innerText = isNaN(ans) ? "Error" : ans;
  } catch (e) {
    display.innerText = "Error";
  }
}
