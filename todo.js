const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
var TODOS_LS = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos() {
  var loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    var parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function paintToDo(text) {
  const checkBox = document.createElement("input");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  checkBox.setAttribute("type", "checkbox");
  delBtn.innerText = "x";
  span.innerText = text;
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  checkBox.value = newId;
  checkBox.name = "box";
  span.id = newId;
  toDoList.appendChild(li);
  var toDoObj = {
    text: text,
    id: newId,
    whether: "",
  };
  toDos.push(toDoObj);
  saveToDos();
  delBtn.addEventListener("click", deleteToDo);
  checkBox.addEventListener("click", clickCheckbox);
}

function handleSubmit() {
  event.preventDefault();
  var currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function filterFn(toDo) {
  return toDo.id === 1;
}

function clickCheckbox(event) {
  const checkbox = event.target;
  const span = checkbox.value;
  if (checkbox.checked) {
    document.getElementById(span).style.textDecoration = "line-through";
    document.getElementById(span).style.textDecorationColor = "red";
    localStorage.setItem("whether", "check");
  } else {
    document.getElementById(span).style.textDecoration = "none";
  }
  allDone();
}

function allDone() {
  const chk_obj = document.getElementsByName("box");
  const chk_leng = chk_obj.length;
  var checked = 0;

  for (i = 0; i < chk_leng; i++) {
    if (chk_obj[i].checked == true) {
      checked += 1;
    }
  }

  console.log(checked);

  if (checked == chk_leng) {
    alert("All Done! \nGood job, you are awesome!");
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
