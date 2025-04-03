document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

let taskCounter = 0;

function initializeApp() {
    loadTasks();
    attachEventListeners();
}


function formatDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                   (day % 10 === 2 && day !== 12) ? 'nd' :
                   (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
    return `${day}${suffix} ${month}`;
}


function attachEventListeners() {
    let addTaskBtn = document.getElementById('addTask');
    let reportTypeDropdown = document.getElementById('reportType');
    let generateBtn = document.getElementById('generate');
    let copyBtn = document.getElementById('copyButton');
    if (addTaskBtn) addTaskBtn.addEventListener('click', () => addTask());
    if (reportTypeDropdown) reportTypeDropdown.addEventListener('change', togglePendingFields);
    if (generateBtn) generateBtn.addEventListener('click', generateReport);
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    } else {
        console.warn("copyButton not found!");
    }
}


function togglePendingFields() {
    const isSOD = document.getElementById('reportType').value === "SOD";
    document.querySelectorAll('.pending').forEach(input => {
        input.parentElement.style.display = isSOD ? 'none' : 'block';
    });
}


function saveTasks() {
    let tasks = [];
    document.querySelectorAll('.taskEntry').forEach(task => {
        tasks.push({
            id: task.id,
            taskType: task.querySelector('.taskType').value,
            taskId: task.querySelector('.taskInputId').value.trim(),
            taskName: task.querySelector('.taskName').value.trim(),
            description: task.querySelector('.description').value.trim(),
            pending: task.querySelector('.pending').value.trim(),
            help: task.querySelector('.help').value.trim()
        });
    });
    chrome.storage.local.set({ tasks, taskCounter, savedDate: new Date().toDateString() });
}


function loadTasks() {
    chrome.storage.local.get(['tasks', 'taskCounter', 'savedDate'], function (data) {
        if (data.savedDate !== new Date().toDateString()) {
            chrome.storage.local.remove(['tasks', 'taskCounter']);
        } else {
            taskCounter = data.taskCounter || 0;
            if (data.tasks) {
                data.tasks.forEach(task => addTask(task));
            }
        }
    });
}




function addTask(savedTask = null) {
    let container = document.getElementById('taskContainer');
    let taskId = savedTask ? savedTask.id : `task-${taskCounter++}`;

    let taskHTML = `
        <div class="taskEntry fade-in" id="${taskId}">
            <div class="taskHeader">
                <span class="taskTitle">Task/ Ticket/ Project</span>
                <button class="removeTask">❌</button>
            </div>
            <div class="taskDetails" style="display: none;">
                <label>Task Type:</label>
                <select class="taskType">
                    <option value="Task">Task</option>
                    <option value="Ticket">Ticket</option>
                    <option value="Project">Project</option>
                </select>
                <label>Task ID:</label>
                <input type="text" class="taskInputId">
                <label>Task Name:</label>
                <input type="text" class="taskName">
                <label>Description:</label>
                <textarea class="description"></textarea>
                <label class="pendingLabel">Pending Items:</label>
                <textarea class="pending"></textarea>
                <label>Need Help:</label>
                <textarea class="help"></textarea>
            </div>
        </div>`;

    container.insertAdjacentHTML('beforeend', taskHTML);
    let taskElement = document.getElementById(taskId);
    let taskDetails = taskElement.querySelector('.taskDetails');

    taskElement.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', saveTasks);
    });

    // Event Listeners
    taskElement.querySelector('.taskHeader').addEventListener("click", function () {
        taskDetails.style.display = taskDetails.style.display === "none" ? "block" : "none";
    });
    taskElement.querySelector('.removeTask').addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent collapse when clicking remove
        removeTask(taskId);
    });

    // Restore Saved Task Data
    if (savedTask) {
        taskElement.querySelector('.taskType').value = savedTask.taskType;
        taskElement.querySelector('.taskInputId').value = savedTask.taskId || "";
        taskElement.querySelector('.taskName').value = savedTask.taskName || "";
        taskElement.querySelector('.description').value = savedTask.description || "";
        taskElement.querySelector('.pending').value = savedTask.pending || "";
        taskElement.querySelector('.help').value = savedTask.help || "";
    }
    saveTasks();

}


function removeTask(taskId) {
    let taskElement = document.getElementById(taskId);
    taskElement.classList.add("fade-out");
    setTimeout(() => {
        taskElement.remove();
        saveTasks();
    }, 300);
}


function generateReport() {
    let reportType = document.getElementById('reportType').value;
    let date = formatDate();
    let personName = "Charan";
    let tasks = document.querySelectorAll('.taskEntry');
    let report = `*${reportType} | ${date} | ${personName}*\n\n`;

    let completedSection = "✅ *Completed Items*\n";
    let pendingSection = reportType === "EOD" ? "📌 *Pending Items*\n" : "📌 *Today's TODO*\n";
    let helpSection = "⚡ *Need Help*\n";
    let hasHelp = false;

    let taskIndex = 1;
    tasks.forEach(task => {
        let taskType = task.querySelector('.taskType')?.value;
        let taskId = task.querySelector('.taskInputId')?.value.trim();
        let taskName = task.querySelector('.taskName')?.value.trim();
        let description = task.querySelector('.description')?.value.trim();
        let pending = task.querySelector('.pending')?.value.trim();
        let help = task.querySelector('.help')?.value.trim();

        let taskPrefix = taskId ? `#${taskId} |` : `#`;
        if (reportType === "EOD") completedSection += `${taskIndex}. *${taskPrefix} ${taskName} - ${taskType}*\n    ${description}\n\n`;
        if (reportType === "EOD" && pending) pendingSection += `${taskIndex}. *${taskPrefix} ${taskName} - ${taskType}*\n    ${pending}\n\n`;
        if (reportType === "SOD") pendingSection += `${taskIndex}. *${taskPrefix} ${taskName} - ${taskType}*\n    ${description}\n\n`;
        if (help) {
            hasHelp = true;
            helpSection += `${taskIndex}. *${taskPrefix} ${taskName} - ${taskType}*\n    ${help}\n\n`;
        }
        taskIndex++;
    });

    if (reportType === "EOD") report += completedSection;
    report += pendingSection;
    if (hasHelp) report += helpSection;

    document.getElementById('output').textContent = report;
}



function copyToClipboard() {
    let outputText = document.getElementById('output').textContent;
    if (!outputText) {
        alert("No report generated to copy!");
        return;
    }

    navigator.clipboard.writeText(outputText).then(() => {
        let copyButton = document.getElementById('copyButton');
        copyButton.innerText = "Copied!";
        setTimeout(() => copyButton.innerText = "Copy to Clipboard", 1500);
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
}
