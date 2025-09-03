// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load saved tasks from localStorage
window.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.className = "task";

  const span = document.createElement("span");
  span.textContent = taskText;

  // Toggle completed
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList .task").forEach(task => {
    tasks.push({
      text: task.querySelector("span").textContent,
      completed: task.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
