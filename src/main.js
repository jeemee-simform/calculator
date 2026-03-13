import { btnDiv, clear, historyListDiv } from "./util/constants.js";
import { showHistory } from "./util/helper.js";
import { historyListDivHandler } from "./hendlers/historyListDivHandler.js";
import { clearHandler } from "./hendlers/clearHandler.js";
import { btnDivhandler } from "./hendlers/btnDivHandler.js";

showHistory(historyListDiv);

historyListDiv.addEventListener("click", historyListDivHandler);

clear.addEventListener("click", clearHandler);

btnDiv.addEventListener("click", btnDivhandler);

// console.log(Boolean("false"));
// console.log(Boolean(false));
// console.log("3" + 1);
// console.log("3" - 1);
// console.log("3" - " 02 ");
// console.log("3" * " 02 ");
// console.log(Number("1"));
// console.log(Number("number"));
// console.log(Number(null));
// console.log(Number(false));
// console.log(JSON.stringify([1, 2, null, 3]));
// console.log(JSON.stringify([1, 2, undefined, 3]));
// console.log(null === undefined);
// console.log(null == undefined);
// console.log(null == 0);
// console.log(null < 0);
// console.log(null > 0);
// console.log(null <= 0);
// console.log(null >= 0);
// console.log(undefined == 0);
// console.log(undefined < 0);
// console.log(undefined > 0);
// console.log(undefined <= 0);
// console.log(undefined >= 0);
// console.log(0 == false);
// console.log("" == false);
// console.log([] == false);
// console.log(undefined === false);
// console.log(null == false);
// console.log("1" == true);
// console.log(1n == true);
// console.log(" 1     " == true);
// console.log([] + []);
// console.log([] + 1);
// console.log([[]] + 1);
// console.log([[1]] + 1);
// console.log([[[[2]]]] + 1);
// console.log([] - 1);
// console.log([[]] - 1);
// console.log([[1]] - 1);
// console.log([[[[2]]]] - 1);
// console.log([] + {});
// console.log({} + {});
// console.log({} - {});
// console.log([] + {});
// console.log(+{});
// console.log(+[]);
// console.log({} + []);
// console.log({} + []);
// console.log({} + []);
// console.log({} + []);
// console.log({} + +[]);
// console.log({} + +[] + {});
// console.log({} + +[] + {} + []);
// const foo = [0];
// if (foo) {
//   console.log(foo == true);
// } else {
//   console.log(foo == false);
// }
// console.log(1 + 2);
// console.log(1 + +2);
// console.log(1 + +(+2));
// console.log(1 + "2");
// console.log(1 + +"2");
// console.log("1" + 2);
// console.log("1" + +2);
// console.log(1 + true);
// console.log(1 + +true);
// console.log("1" + true);
// console.log("1" + +true);
// console.log(1 + null);
// console.log(1 + +null);
// console.log("1" + null);
// console.log("1" + +null);
// console.log(1 + undefined);
// console.log(1 + +undefined);
// console.log("1" + undefined);
// console.log("1" + +undefined);
// console.log("1" + +(+undefined));
// console.log(typeof null);
// console.log(null instanceof Object);
// console.log(typeof 1);
// console.log(1 instanceof Number);
// console.log(1 instanceof Object);
// console.log(Number(1) instanceof Object);
// console.log(new Number(1) instanceof Object);
// console.log(typeof true);
// console.log(true instanceof Boolean);
// console.log(true instanceof Object);
// console.log(Boolean(true) instanceof Object);
// console.log(new Boolean(true) instanceof Object);
// console.log([] instanceof Array);
// console.log([] instanceof Object);
// console.log((() => {}) instanceof Object);
// function AddAmount() {
// const products = [
//   { name: "iPhone 15", type: "Mobile", price: 999 },
//   { name: "Galaxy S23", type: "Mobile", price: 899 },
//   { name: "MacBook Air", type: "Laptop", price: 1299 },
//   { name: "Dell XPS 13", type: "Laptop", price: 1199 },
//   { name: "iPad Pro", type: "Tablet", price: 799 },
//   { name: "Sony WH-1000XM5", type: "Headphones", price: 399 },
//   { name: "Apple Watch", type: "Smartwatch", price: 499 },
//   { name: "Canon EOS R6", type: "Camera", price: 2499 },
//   { name: "PlayStation 5", type: "Gaming Console", price: 499 },
// ];

// console.log(
//   products.reduce((acc, curr) => {
//     const temp = curr.type;
//     if (acc[temp]) acc[temp] += curr.price;
//     else acc[temp] = curr.price;
//     return acc;
//   }, {}),
// );
