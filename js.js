const bar = document.querySelector(".div1");
const list = document.querySelector("ul");
const percent = document.querySelector(".prc");
const taskInput = document.querySelector(".task");
const addBtn = document.querySelector(".addBtn");
const markAll = document.querySelector(".markAll");
const undoAl = document.querySelector(".undoAll");
const year = document.querySelector("span");
let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

const storeTasks = () => {
  if (taskInput.value === "") {
    return;
  }
  const addedTask = {
    body: taskInput.value,
    status: "",
  };
  allTasks.push(addedTask);

  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  createIteam();
  taskInput.value = "";
};

const createIteam = () => {
  list.innerHTML = "";
  allTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.body;
    if (task.status) {
      li.classList.add(task.status);
    }
    cretingDeleteBtn(li);
    list.appendChild(li);
  });
  showBar();
};

const deleteTask = (task) => {
  if (task.target.classList.contains("delete")) {
    const taskToDelete = Array.from(list.children).indexOf(
      task.target.parentElement
    );

    allTasks.splice(taskToDelete, 1);
    console.log(allTasks[taskToDelete]);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    createIteam();
  }
};

const cretingDeleteBtn = (parent) => {
  const btn = document.createElement("span");
  btn.textContent = "X";
  btn.classList.add("delete");

  parent.appendChild(btn);
};

const toggle = (task) => {
  if (task.target.tagName === "LI") {
    const items = Array.from(list.children);
    const index = items.indexOf(task.target);
    allTasks[index].status = allTasks[index].status === "done" ? "" : "done";

    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    createIteam();
    showBar();
    showMsg();
  }
};

const toggleAll = () => {
  allTasks.forEach((task) => {
    task.status = "done";

    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    createIteam();
    showBar();
  });
  showMsg();
};

const undoAll = () => {
  allTasks.forEach((task) => {
    task.status = "";

    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    createIteam();
    showBar();
  });
};

const showMsg = () => {
  const allDone =
    allTasks.length > 0 && allTasks.every((task) => task.status === "done");
  if (allDone) {
    alert("all tasks are done!");
  }
};

const showBar = () => {
  const doneIteams = list.querySelectorAll(".done").length;
  if (doneIteams > 0) {
    const widthpercent = Math.floor((doneIteams / allTasks.length) * 100);

    bar.style.width = `${widthpercent}%`;
    percent.textContent = widthpercent + "%";
  } else {
    bar.style.width = `0%`;

    percent.textContent = 0 + "%";
  }
};

markAll.addEventListener("click", toggleAll);
undoAl.addEventListener("click", undoAll);

addBtn.addEventListener("click", storeTasks);
window.addEventListener("load", createIteam);
window.addEventListener("load", showBar);
list.addEventListener("click", toggle);
list.addEventListener("click", deleteTask);
