const btnDiv = document.getElementsByClassName("btn-div")[0];
const display = document.getElementById("display");

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

function output() {
  const str = display.innerText;

  const { isError, result } = replaceFunctionWithValue(str);
  console.log(typeof result, result, isError);
  if (isError) {
    display.innerText = "Error";
    return;
  }

  const ans = eval(result);

  display.innerText = ans;
}
