function valid(str) {
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

export { valid };
