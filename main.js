import "./style.css";

const URL = "https://jsonplaceholder.typicode.com/todos/";
const formElement = document.querySelector("form");
const ulElement = document.querySelector("ul");

const getTodos = () => {
  fetch(URL + "?_limit=10")
    .then((res) => res.json())
    .then((data) => data.forEach((item) => addToDom(item)));
};

const addToDom = (data) => {
  const li = document.createElement("li");
  li.classList.add("app__item");
  li.setAttribute("data-id", data.id);

  if (data.completed) {
    li.classList.add("done");
  }

  li.appendChild(document.createTextNode(data.title));
  document.querySelector(".app__list").appendChild(li);
};

const addItem = (e) => {
  const itemValue = e.target.firstElementChild.value.trim();
  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      title: itemValue,
      completed: true,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      addToDom(data);
    });

  e.target.firstElementChild.value = "";
};

const toggleCompleted = (e) => {
  if (e.target.classList.contains("app__item")) {
    e.target.classList.toggle("done");

    updateValue(e.target.dataset.id, e.target.classList.contains("done"));
  }
};

const updateValue = (id, completed) => {
  fetch(`${URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      completed,
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

function init() {
  document.addEventListener("DOMContentLoaded", getTodos);
  formElement.addEventListener("submit", addItem);
  ulElement.addEventListener("click", toggleCompleted);
}

init();
