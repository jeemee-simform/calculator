function factorial(n) {
  if (n > 170) return Infinity;
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;

  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function radian(a) {
  return (a * Math.PI) / 180;
}

function saveHistory(str) {
  const arr = JSON.parse(localStorage.getItem("history") || "[]");
  arr.push(str);
  localStorage.setItem("history", JSON.stringify(arr));
}

function showHistory(historyListDiv) {
  const arr = JSON.parse(localStorage.getItem("history")) || [];

  historyListDiv.innerHTML = "";
  arr.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.textContent = `${index + 1}. ${item}`;
    historyListDiv.appendChild(div);
  });
}

export { factorial, saveHistory, showHistory, radian };
