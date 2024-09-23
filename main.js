import "./style.css";

const pElement = document.querySelector(".app__result");
const btnElement = document.querySelector(".app__button");

function generateJokes() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.chucknorris.io/jokes/random");

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        const joke = JSON.parse(this.responseText).value;
        pElement.textContent = joke;
      } else {
        console.log("error");
      }
    }
  };

  xhr.send();
}

btnElement.addEventListener("click", generateJokes);
document.addEventListener("DOMContentLoaded", generateJokes);
