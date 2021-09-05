let addMessage = document.querySelector(".message"),
  addButton = document.querySelector(".add"),
  todo = document.querySelector(".todo"),
  addSearch = document.querySelector(".search"),
  addGo = document.querySelector(".go"),
  addBack = document.querySelector(".back");

let todoList = [];

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

addButton.addEventListener("click", function () {
  if (!addMessage.value) return;
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };

  todoList.unshift(newTodo);
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList));
  addMessage.value = "";
  console.log(todoList);
});

function displayMessages() {
  let displayMessage = "";
  if (todoList.length === 0) todo.innerHTML = "";
  todoList.forEach(function (item, i) {
    displayMessage += `
      <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? "checked" : ""}>
        <label for='item_${i}' class="${item.important ? "important" : ""}">${
      item.todo
    }</label>
      </li>
      `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener("change", function (event) {
  let idInput = event.target.getAttribute("id");
  let forLabel = todo.querySelector("[for=" + idInput + "]");
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

todo.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  todoList.forEach(function (item, i) {
    if (item.todo === event.target.innerHTML) {
      if (event.ctrlKey || event.metaKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }
      displayMessages();
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

addMessage.addEventListener("keyup", function (event) {
  if (!addMessage.value) return;
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };
  if (event.keyCode === 13) {
    todoList.unshift(newTodo);
    displayMessages();
    localStorage.setItem("todo", JSON.stringify(todoList));
    addMessage.value = "";
  }
});

addGo.addEventListener("click", () => {
  if (!addSearch.value) return;
  addBack.style.display = "block";
  addGo.style.display = "none";
  let arr = JSON.parse(localStorage.getItem("todo"));
  let displayMessage = "";
  let searchResults = [];
  arr.forEach((item) => {
    if (item.todo === addSearch.value) {
      searchResults.unshift(item);
    } else {
      todo.innerHTML = "<div class='noMatches'>No matches</div>";
    }
  });
  searchResults.forEach(function (item, i) {
    displayMessage += `
          <li>
            <input type='checkbox' id='item_${i}' ${
      item.checked ? "checked" : ""
    }>
            <label for='item_${i}' class="${
      item.important ? "important" : ""
    }">${item.todo}</label>
          </li>
          `;
    todo.innerHTML = displayMessage;
  });
  addSearch.value = "";
});

addBack.addEventListener("click", () => {
  addBack.style.display = "none";
  addGo.style.display = "block";
  let displayMessage = "";
  let array = JSON.parse(localStorage.getItem("todo"));
  array.forEach(function (item, i) {
    displayMessage += `
              <li>
                <input type='checkbox' id='item_${i}' ${
      item.checked ? "checked" : ""
    }>
                <label for='item_${i}' class="${
      item.important ? "important" : ""
    }">${item.todo}</label>
              </li>
              `;
    todo.innerHTML = displayMessage;
  });
});
