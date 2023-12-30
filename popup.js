let [seconds, minutes, hours,milisecond] = [0, 0, 0,0];
let displayTime = document.getElementById("time");
let timer = null;

if (localStorage.getItem("timerValues")) {
    const storedValues = JSON.parse(localStorage.getItem("timerValues"));
    [hours, minutes, seconds,milisecond] = storedValues;
    displayTime.innerHTML = formatTime(hours) + " : " + formatTime(minutes) + " : " + formatTime(seconds)+"."+formatTime(milisecond);
}

function stopwatch() {
    milisecond++;
    if (milisecond==100){
        seconds++;
        milisecond=0;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
}
var hr;
    displayTime.innerHTML = formatTime(hours) + " : " + formatTime(minutes) + " : " + formatTime(seconds)+"."+formatTime(milisecond);
}

function start() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 10);
}

function stop() {
    clearInterval(timer);
    localStorage.setItem("timerValues", JSON.stringify([hours, minutes, seconds,milisecond]));
}

function reset() {
    clearInterval(timer);
    [seconds, minutes, hours,milisecond] = [0, 0, 0,0];
    displayTime.innerHTML = "00 : 00 : 00.00";
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}



function loadTasks() {
    var taskList = document.getElementById("taskList");
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        var deleteButtons = document.querySelectorAll("#taskList button.btn-danger");
        deleteButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                button.parentElement.remove();
                saveTasks();
            });
        });
    }
}

function saveTasks() {
    var taskList = document.getElementById("taskList");
    localStorage.setItem("tasks", taskList.innerHTML);
}

document.getElementById("addTask").addEventListener("click", function () {
    var taskNameInput = document.getElementById("taskName");
    var taskName = taskNameInput.value.trim();
    if (taskName !== "") {
        var li = document.createElement("li");
        li.textContent = taskName;
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.style.fontSize = "12px";
        deleteButton.className = "btn btn-danger my-1 mx-3";
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveTasks();
        });
        li.appendChild(deleteButton);
        document.getElementById("taskList").appendChild(li);
        taskNameInput.value = "";
        saveTasks();
    }

});

window.addEventListener("load", function () {
    loadTasks();
});
function getDateTimeValue() {
    var dateTimeInput = document.getElementById("myDateTimeInput");
    var dateTimeValue = dateTimeInput.value;
    var dataElement = document.getElementById("data");

    if (dateTimeValue) {
        var dataElement = document.getElementById("data");
    
    if (dataElement) {
        var li = document.createElement("li");
        li.textContent = "Reminder :"+ dateTimeValue;

        // Create a delete button for each reminder
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.fontSize = "12px";
        deleteButton.className = "btn btn-danger my-1 mx-3";
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveReminders(); // Save reminders after deletion
        });

        li.appendChild(deleteButton);
        dataElement.appendChild(li);
        saveReminders(); // Save reminders after addition
        dateTimeInput.value = null;
    } else {
        console.error("Element with ID 'data' not found.");
    }
    console.log(dateTimeValue);
}
}
function loadReminders() {
    var dataElement = document.getElementById("data");
    var savedReminders = localStorage.getItem("reminders");
    if (savedReminders) {
        dataElement.innerHTML = savedReminders;
    }

    // Add event listener for the "Delete" button for each loaded reminder
    var deleteButtons = document.querySelectorAll("#data button.btn-danger");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.parentElement.remove();
            saveReminders(); // Save reminders after deletion
            
        });
    });
}

function saveReminders() {
    var dataElement = document.getElementById("data");
    localStorage.setItem("reminders", dataElement.innerHTML);
}

// Load reminders and set up "Delete" button event listeners when the page is loaded
window.addEventListener("load", function () {
    loadReminders();
});

document.getElementById('startButton').addEventListener('click', start);
document.getElementById('stopButton').addEventListener('click', stop);
document.getElementById('resetButton').addEventListener('click', reset);
document.getElementById('remindtask').addEventListener('click', getDateTimeValue);
