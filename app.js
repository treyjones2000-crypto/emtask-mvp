console.log("EmTask app.js is running");

// Grab elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");
const prioritySelect = document.getElementById("prioritySelect");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("emtask_tasks")) || [];

// Save tasks
function save() {
  localStorage.setItem("emtask_tasks", JSON.stringify(tasks));
}

// Render tasks
function render() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks yet. Add one 👉";
    li.style.opacity = "0.6";
    list.appendChild(li);
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    const text = document.createElement("span");
    text.textContent = `${task.priority} ${task.text}`;

    if (task.done) {
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.6";
    }

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      save();
      render();
    });

    text.addEventListener("click", () => {
      tasks.splice(index, 1);
      save();
      render();
    });


    li.appendChild(checkbox);
    li.appendChild(text);
    list.appendChild(li);
  });
}

// Add task
addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  tasks.push({
    text: value,
    priority: prioritySelect.value,
    done: false
  });

  input.value = "";
  save();
  render();
});

// Keyboard UX
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addBtn.click();
  }

  if (e.key === "Escape") {
    input.value = "";
  }
});

// Initial render
render();



