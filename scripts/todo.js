"use strict";

// TASK 8: Hiển thị Todo List

let addBtn = document.getElementById("btn-add");
let taskInput = document.getElementById("input-task");
let todoList = document.getElementById("todo-list");
let taskLists = document.querySelectorAll("ul#todo-list > li");
let spans = document.querySelectorAll("ul#todo-list > li > span");
let localList = getFromStorage("localList");
let todoArr = getFromStorage("todoArr");
let highestTaskId = getFromStorage("highestTaskId");

currentUser = getFromStorage("currentUser");

// Process variables
if (todoArr.length === 0) {
  highestTaskId = -1;
  saveToStorage("highestTaskId", highestTaskId);
} else {
  if (highestTaskId === []) {
    highestTaskId = -1;
  }
}
let todoByUser = todoArr.filter((obj) => obj.owner === currentUser[0].username);

class Task {
  constructor(id, task, owner, isDone) {
    this.id = id;
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Toggle task check
const updateTask = function (obj) {
  let idToUpdate = Number(obj.querySelector("span.task-id").textContent);

  let indexToUpdate = todoArr.findIndex((item) => item.id === idToUpdate);

  //// Check task instance
  // check if the clicked line contains the class 'checked'
  if (obj.classList.contains("checked")) {
    todoArr[indexToUpdate].isDone = false;
  } else {
    todoArr[indexToUpdate].isDone = true;
  }

  //// Update task list on database (local storage)
  saveToStorage("todoArr", todoArr);
  todoByUser = todoArr.filter((obj) => obj.owner === currentUser[0].username);

  //// Update display (Update HTML)
  renderTasks(todoByUser);
};

// Delete task
const deleteTask = function (obj) {
  let idToDelete = Number(
    obj.parentElement.querySelector("span.task-id").textContent
  );
  let indexToDelete = todoArr.findIndex((item) => item.id === idToDelete);

  //// Delete task instance
  todoArr.splice(indexToDelete, 1);

  //// Update task list on database (local storage)
  saveToStorage("todoArr", todoArr);
  todoByUser = todoArr.filter((obj) => obj.owner === currentUser[0].username);

  //// Update display (Remove from HTML)
  renderTasks(todoByUser);
};

const renderTasks = function (arr) {
  todoList.innerHTML = "";
  for (let i in arr) {
    // Create
    let taskLine = document.createElement("li");
    // Configure
    taskLine.innerHTML = `${arr[i].task}<span class="task-id hide">${arr[i].id}</span><span class="close">×</span>`;
    // Check whether the data of the taskLine is true or false
    if (arr[i].isDone === true) {
      taskLine.classList.add("checked");
    } else {
      taskLine.classList.remove("checked");
    }
    taskLine.addEventListener("click", function (e1) {
      updateTask(e1.target);
    });
    taskLine.querySelector(".close").addEventListener("click", function (e2) {
      deleteTask(e2.target);

      // e.target.classList.toggle("checked");
    });

    // Implement
    todoList.append(taskLine);
  }
};

addBtn.addEventListener("click", function () {
  if (taskInput.value !== "") {
    let task = new Task(
      highestTaskId + 1,
      taskInput.value,
      currentUser[0].username,
      false
    );
    todoArr.push(task);
    highestTaskId = highestTaskId + 1;
    todoByUser = todoArr.filter((obj) => obj.owner === currentUser[0].username);
    renderTasks(todoByUser);
    taskInput.value = "";

    saveToStorage("todoArr", todoArr);
    saveToStorage("highestTaskId", highestTaskId);
  } else {
    alert("Task title is missing!");
  }
});

//

// IMPORTANT: Run on start
renderTasks(todoByUser);
