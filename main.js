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
      valid() ? output() : (display.innerHTML = "Error");
      return;
  }
  display.innerText += value ? value : id;
});

function valid() {
  const str = display.innerText;
  let bracketCount = 0;
  console.log(str);

  // bracket validater
  for (const char of str) {
    if (char === "(") bracketCount++;
    else if (char === ")") {
      if (bracketCount <= 0) return false;
      bracketCount--;
    }
  }
  return 0;
}

function output() {}
