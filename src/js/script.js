/*
# Este projeto é baseado em um projeto público, mas foi modificado 
# de acordo com os requisitos do Curso IST 107.
# Instrutor: Washington Valencia
# Instituição: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array de cores para mudança de fundo
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Função para alterar a cor de fundo com um efeito de gradiente
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop para reiniciar o ciclo
    };

    // Mudar a cor a cada 2 segundos com uma transição suave
    setInterval(changeBackgroundColor, 2000);
});

let tasks = [];

let addButton = document.getElementById("addButton");
let askUserButton = document.getElementById("askUserButton");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");

function inputLength() {
    return input.value.length;
}

function taskExists(task) {
    return tasks.includes(task.toLowerCase());
}

function createListElement(task) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    ul.appendChild(li);
    input.value = "";

    // Adicionar botão de deletar a cada tarefa
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    dBtn.classList.add("delete-btn");
    li.appendChild(dBtn);

    dBtn.addEventListener("click", () => {
        ul.removeChild(li);
        tasks = tasks.filter(t => t !== task.toLowerCase());
    });
}

function addTask(task) {
    if (!taskExists(task)) {
        tasks.push(task.toLowerCase());
        createListElement(task);
    } else {
        alert("Task already exists!");
    }
}

function addListAfterClick() {
    if (inputLength() > 0) {
        addTask(input.value);
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
        addTask(input.value);
    }
}

function askUserForTasks() {
    let task;
    while (true) {
        task = prompt("Please enter a new task (or leave empty to stop):");
        if (!task) break;
        if (taskExists(task)) {
            alert("Task already exists! Please enter a new task.");
        } else {
            addTask(task);
        }
    }
}

addButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
askUserButton.addEventListener("click", askUserForTasks);