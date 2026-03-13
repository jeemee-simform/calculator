export const historyListDivHandler = (e) => {
  if (e.target.className == "list-item") {
    display.innerText = e.target.innerText.split(" ")[1];
  }
};
