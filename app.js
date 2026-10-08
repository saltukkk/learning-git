// Learning Git – TODO App
// A small, dependency-free TODO list. Tasks are saved in the browser's
// localStorage so they survive a page refresh.

const STORAGE_KEY = "learning-git-todos";

// ---------- DOM elements ----------
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const countLabel = document.getElementById("todo-count");
const clearCompletedButton = document.getElementById("clear-completed");

// ---------- State ----------
// Each todo looks like: { id: number, text: string, completed: boolean }
let todos = loadTodos();

// ---------- Storage helpers ----------
function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    // If storage is unavailable or the data is broken, start with an empty list.
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    // Ignore storage errors; the app still works for the current session.
  }
}

// ---------- Actions ----------
function addTodo(text) {
  const trimmed = text.trim();
  if (trimmed === "") {
    return;
  }

  todos.push({
    id: Date.now(),
    text: trimmed,
    completed: false,
  });

  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  render();
}

// ---------- Rendering ----------
function createTodoElement(todo) {
  const item = document.createElement("li");
  item.className = "todo-item";
  if (todo.completed) {
    item.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", "Mark task as done");
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  const text = document.createElement("span");
  text.className = "todo-text";
  text.textContent = todo.text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "×";
  deleteButton.setAttribute("aria-label", "Delete task");
  deleteButton.addEventListener("click", () => deleteTodo(todo.id));

  item.append(checkbox, text, deleteButton);
  return item;
}

function updateCount() {
  const remaining = todos.filter((todo) => !todo.completed).length;
  const word = remaining === 1 ? "task" : "tasks";
  countLabel.textContent = `${remaining} ${word} left`;
}

function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-message";
    empty.textContent = "Nothing to do. Add your first task above!";
    list.appendChild(empty);
  } else {
    todos.forEach((todo) => list.appendChild(createTodoElement(todo)));
  }

  updateCount();
}

// ---------- Event listeners ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo(input.value);
  input.value = "";
  input.focus();
});

clearCompletedButton.addEventListener("click", clearCompleted);

// ---------- Start ----------
render();
