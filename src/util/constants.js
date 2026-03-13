import { radian } from "./helper.js";

const btnDiv = document.getElementsByClassName("btn-div")[0];
const display = document.getElementById("display");
const historyListDiv = document.getElementsByClassName("list")[0];
const clear = document.getElementsByClassName("clear")[0];

const FUNCTIONS = ["sin", "cos", "tan", "cosec", "sec", "cot", "log", "ln"];

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

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "%": (a, b) => a % b,
  "^": (a, b) => Math.pow(a, b),
};

const trig = {
  sin: (a) => Math.sin(radian(a)),
  cos: (a) => Math.cos(radian(a)),
  tan: (a) => Math.tan(radian(a)),
  cosec: (a) => 1 / Math.sin(radian(a)),
  sec: (a) => 1 / Math.cos(radian(a)),
  cot: (a) => 1 / Math.tan(radian(a)),
  log: (a) => (a <= 0 ? NaN : Math.log10(a)),
  ln: (a) => (a <= 0 ? NaN : Math.log(a)),
};

export {
  FUNCTIONS,
  precedence,
  associativity,
  btnDiv,
  clear,
  display,
  historyListDiv,
  operators,
  trig,
};
