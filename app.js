let tasks = JSON.parse(localStorage.getItem("tasks")) || []
function storeTasks(){
    let storedData = JSON.stringify(tasks)
    localStorage.setItem("tasks", storedData)
}
function fillPage(){
    document.getElementById("tasks").innerHTML = ""
    for(let i = 0 ; i < tasks.length ; i++ ){
    document.getElementById("tasks").innerHTML +=
    `
    <div class="task-item ${tasks[i].isDone ? "done" : ""}" id="task${i}">
                <div class="actions">
                    <button onclick="editTask(${i})" class="btn edit"><span class="material-symbols-outlined">edit</span></button>
                    <button onclick="doneTask(${i})" class="btn ${tasks[i].isDone ? "done" : "notdone"}" id="doneButton"><span class="material-symbols-outlined">${tasks[i].isDone ? "cancel" : "check"}</span></button>
                    <button onclick="deleteTask(${i})" class="btn delete"><span class="material-symbols-outlined">delete</span></button>
                </div>
                <div class="task-info">
                    <h3>${tasks[i].title}</h3>
                    <p>${tasks[i].date}<span class="material-symbols-outlined" style="font-size: 14px;">calendar_month</span></p>
                </div>
            </div>
    `
    }
}
fillPage()

document.getElementById("addButton").addEventListener("click",function(){
    document.getElementById("tasks").innerHTML = ""
    let taskTitle = prompt("Please Enter The Name Of The Task In The Bar :")
    let now = new Date()
    let dateString = now.toLocaleDateString()
    tasks.push({"title" : taskTitle,
                "date" : dateString,
                "isDone" : false})
    storeTasks()
    fillPage()
})
function deleteTask(index){
    let task = tasks[index]
    let isConfirmed = confirm(`Are You Sure About Deleting The Task "${task.title}"`)
    if (isConfirmed){
            let element = document.getElementById(`task${index}`)
            element.classList.add("removing")
            setTimeout(function(){
            tasks.splice(index , 1)
            storeTasks()
            fillPage()}
    ,700)
    }
}
function editTask(index){
    let task = tasks[index]
    let newTaskTitle = prompt("Please Enter The New Name Of The Task In The Bar :")
    if(newTaskTitle){
        task.title = newTaskTitle
        storeTasks()
        fillPage()
    }
}
function doneTask(index){
    let task = tasks[index]
    task.isDone = !task.isDone
    storeTasks()
    fillPage()
}