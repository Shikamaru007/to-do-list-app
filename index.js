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

        if(task.completed){
            taskList.classList.add("checked")
            saveData()
        }
        taskList.addEventListener("click", () => {
            task.completed = !task.completed;
            taskList.classList.toggle("checked")
            saveData()
        })


        taskContainer.appendChild(taskList);
        
    })

}

function deleteTask(index){
    tasks.splice(index, 1);
    updateDisplay()
    saveData()
}

function saveData(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showData(){
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(savedTasks){
        tasks = savedTasks;
        updateDisplay();
    }
}

document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        addToDo();
    }
})

showData();

