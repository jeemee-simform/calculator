import { historyListDiv } from "../util/constants.js";
import { showHistory } from "../util/helper.js";

export const clearHandler = (e) => {
  localStorage.setItem("history", JSON.stringify([]));
  showHistory(historyListDiv);
};
