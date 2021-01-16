let todoInput = document.querySelector("#todo");
let todoList = document.querySelector(".todoContainer > ul");

// TODO: save the todos to the browser storage

const Todos = [];

document.forms.todoForm.addEventListener("submit", e => {
  e.preventDefault();

  let todo = todoInput.value.toString().trim();
  todoInput.value = "";

  if (todo) {
    Todos.push({
      todo: todo,
      isDone: false
    });
    showTodo();
  } else {
    alert("Invalid");
  }
});

showTodo();
function showTodo() {
  todoList.innerHTML = "";
  for (let i in Todos) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    let delBtn = document.createElement("button");
    let doneBtn = document.createElement("button");

    span.innerHTML = Todos[i].todo;
    doneBtn.innerHTML = Todos[i].isDone ? "✅" : "🔲";
    doneBtn.title = Todos[i].isDone ? "Undo" : "Done";
    if (Todos[i].isDone) {
      span.classList.add("done");
    }
    delBtn.innerHTML = "🚮";
    delBtn.title = "Delete";

    delBtn.addEventListener("click", e => {
      let todo_id = parseInt(
        e.target.parentElement.getAttribute("id").split("_")[1]
      );
      Todos.splice(todo_id, 1);
      showTodo();
    });

    doneBtn.addEventListener("click", e => {
      let todo_id = parseInt(
        e.target.parentElement.getAttribute("id").split("_")[1]
      );
      Todos[todo_id].isDone = !Todos[todo_id].isDone;
      showTodo();
    });

    li.setAttribute("id", `todo_${i}`);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);

    todoList.appendChild(li);
  }

  if(!todoList.innerHTML){
      todoList.innerHTML = "Empty"
  }
}
