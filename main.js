const btnDiv = document.getElementsByClassName("btn-div")[0];
const display = document.getElementById("display");
const historyListDiv = document.getElementsByClassName("list")[0];

showHistory();

historyListDiv.addEventListener("click", (e) => {
  if (e.target.className == "list-item") {
    display.innerText = e.target.innerText.split(" ")[1];
  }
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
    /^(?:3\.14159|2\.71828|sin\(|cos\(|cosec\(|sec\(|cot\(|ten\(|log\(|ln\(|\^\-1|\^2|[0-9+\-*/%^√!().])+$/;
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
    /(\d|\)|!|\^2|\^\-1)(√|sin\(|cos\(|cosec\(|sec\(|cot\(|ten\(|log\(|ln\()/;
  if (invalidPrefixOperator.test(str)) return false;

  // invalid function usege
  const invalidFunctionUsage = /(sin|cos|cosec|sec|cot|ten|log|ln)(?!\()/;
  if (invalidFunctionUsage.test(str)) return false;

  // invalid parenthesis ending: only !, numbers, or functions allowed before ')'
  const invalidParenEnd = /\([^\)]*([+\-*/%^√])\)/;
  if (invalidParenEnd.test(str)) return false;

  return true;
}

function funEvaluate(fun, value) {
  switch (fun) {
    case "sin":
      return Math.sin((value * Math.PI) / 180);
    case "cos":
      return Math.cos((value * Math.PI) / 180);
    case "tan":
      return Math.tan((value * Math.PI) / 180);
    case "cosec":
      return 1 / Math.sin((value * Math.PI) / 180);
    case "sec":
      return 1 / Math.cos((value * Math.PI) / 180);
    case "cot":
      return 1 / Math.tan((value * Math.PI) / 180);
    case "log":
      return Math.log10(value);
    case "ln":
      return Math.log(value);
  }
}

function replaceFunctionWithValue(str) {
  let isError = false;
  const findFuncRegex =
    /(sin|cos|tan|cosec|sec|cot|log|ln)\(([+-]?\d*\.?\d+)\)/g;
  const result = str.replace(findFuncRegex, (match, fun, value) => {
    console.log(match, fun, value);

    if ((fun === "log" || fun === "ln") && Number(value) <= 0) {
      isError = true;
      return 0;
    }
    return funEvaluate(fun, value);
  });
  return { isError, result };
}

function tokenize(expr) {
  const tokens = [];
  let num = "";
  let expectNumber = true;

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    // Number characters
    if ("0123456789.".includes(char)) {
      num += char;
      expectNumber = false;
      continue;
    }

    // Unary + or -
    if ((char === "+" || char === "-") && expectNumber) {
      num += char;
      continue;
    }

    // Push number if exists
    if (num !== "") {
      tokens.push(Number(num));
      num = "";
    }

    //  Binary + or -
    if (char === "+" || char === "-") {
      tokens.push(char);
      expectNumber = true;
      continue;
    }

    //  Other operators
    if ("*/%^√!".includes(char)) {
      tokens.push(char);

      // postfix operator !
      if (char === "!") {
        expectNumber = false;
      } else {
        expectNumber = true;
      }

      continue;
    }

    //  Left bracket
    if (char === "(") {
      tokens.push(char);
      expectNumber = true;
      continue;
    }

    //  Right bracket
    if (char === ")") {
      tokens.push(char);
      expectNumber = false;
      continue;
    }
  }

  //  Push last number
  if (num !== "") {
    tokens.push(Number(num));
  }

  return tokens;
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
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
    } else {
      while (
        stack.length &&
        stack[stack.length - 1] !== "(" &&
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

  while (stack.length) output.push(stack.pop());

  return output;
}

function evaluatePostfix(postfix) {
  const stack = [];

  for (const token of postfix) {
    if (typeof token === "number") {
      stack.push(token);
    } else {
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
  if (n < 0) return NaN;
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

    const { isError, result } = replaceFunctionWithValue(str);
    if (isError || result === "") {
      display.innerText = "Error";
      return;
    }
    const tokens = tokenize(result);

    const postfix = infixToPostfix(tokens);

    const ans = evaluatePostfix(postfix);

    if (ans && ans != "Error") {
      saveHistory(str);
      showHistory();
    }

    display.innerText = ans ? ans : "Error";
  } catch (e) {
    display.innerText = "Error";
  }
}
