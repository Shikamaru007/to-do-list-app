const addButton = document.getElementById("btn");
const taskInput = document.getElementById("taskInput");
const taskContainer = document.getElementById("taskContainer");


let tasks = [];

function addToDo() {
    if(taskInput.value === "") return;
    const task = taskInput.value.trim();
    tasks.push({'taskTitle': `${task}`, 'completed': false});
    updateDisplay();
    taskInput.value = '';
    saveData()
}

function updateDisplay(){
    taskContainer.innerHTML = ""

    tasks.forEach((task, index) => {
        const taskName = task.taskTitle;
       
        const taskList = document.createElement("li");
        taskList.innerHTML = `<span>${taskName}</span> <button  class = "removeIcon" onclick ="deleteTask(${index})"><img src="images/remove.svg" alt="remove icon"></button>`;


        taskContainer.appendChild(taskList);
        
    })

}

taskContainer.addEventListener("click", (event) => {
    if(event.target.tagName === "SPAN"){
        event.target.parentElement.classList.toggle("checked");
        saveData()
    }
    else if(event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        saveData()
    }
})

function deleteTask(index){
    tasks.splice(index, 1);
    updateDisplay()
    saveData()
}

function saveData(){
    localStorage.setItem('data', taskContainer.innerHTML);
}

function showData(){
    taskContainer.innerHTML = localStorage.getItem('data');
}

document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        addToDo();
    }
})

updateDisplay()
showData();

