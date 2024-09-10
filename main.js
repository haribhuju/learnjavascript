import "./style.css";

const MAXWORD = 150;

const textAreaEl = document.querySelector("#textarea");
const spanCounterEL = document.querySelector(".field-counter");

window.addEventListener("DOMContentLoaded", () => {
  spanCounterEL.textContent = MAXWORD;
});

textAreaEl.addEventListener("input", () => {
  const textAreaELValueLength = textAreaEl.value.length;
  const charsLeft = MAXWORD - textAreaELValueLength;
  spanCounterEL.textContent = charsLeft;
});
