const todoForm = document.querySelector("#form");
const todoInput = document.querySelector("#entrada");
const todoList = document.querySelector("#list");
const editForm = document.querySelector("#edit");
const editInput = document.querySelector("#edit-input");
const inputSearch = document.querySelector("#input-busca");
const cancelEditBtn = document.querySelector("#cancel-btn");
const btnEditar = document.getElementById("btn-editar");
const filtroFeito = document.getElementById("select-filter");
const todos = document.querySelectorAll(".todo");

todoForm.addEventListener("submit", (ele) => {
  ele.preventDefault();
  const inputValue = todoInput.value;
  if (inputValue) {
    saveInputvalue(inputValue);
  }
});

const saveInputvalue = (texto) => {
  let div = document.createElement("div");
  div.classList.add("todo");

  let h3 = document.createElement("h3");
  h3.id = Date.now();
  h3.innerText = texto;

  let btnCheck = document.createElement("button");
  btnCheck.classList.add("concluido");
  btnCheck.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';

  let btnPen = document.createElement("button");
  btnPen.classList.add("pen");
  btnPen.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';

  let btnXmark = document.createElement("button");
  btnXmark.classList.add("remove");
  btnXmark.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

  div.append(h3, btnCheck, btnPen, btnXmark);

  todoList.appendChild(div);
  todoInput.value = "";
  todoInput.focus();
};

let pegaId = "";

const toggleEdit = () => {
  editForm.classList.toggle("esconder");
  todoForm.classList.toggle("esconder");
  // todoList.classList.toggle("esconder");
};
document.addEventListener("click", (ele) => {
  const targetEle = ele.target;
  const parentEle = targetEle.closest("div");

  if (targetEle.classList.contains("concluido")) {
    parentEle.classList.toggle("feito");
  }

  if (targetEle.classList.contains("pen")) {
    editInput.value = parentEle.innerText;
    pegaId = parentEle.children[0].id;
    toggleEdit();
  }
  if (targetEle.classList.contains("remove")) {
    if (confirm("Tem certeza que deseja remover a tarefa da lista")) {
      parentEle.remove();
    }
  }
});

cancelEditBtn.addEventListener("click", (ele) => {
  ele.preventDefault();
  toggleEdit();
});

btnEditar.addEventListener("click", (ele) => {
  ele.preventDefault();
  editarTarefa(editInput.value, pegaId);
});

const editarTarefa = (valor, id) => {
  document.getElementById(id).innerText = valor;
};

filtroFeito.addEventListener("change", (ele) => {
  const filtrar = ele.target.value;
  switch (filtrar) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;
    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("feito")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;
    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("feito")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;
    default:
      break;
  }
});

inputSearch.addEventListener("keyup", (ele) => {
  const search = ele.target.value;
  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
    todo.style.display = "flex";

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
});
