document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => addTaskToDOM(task, index + 1));
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = {
        id: Date.now().toString(),
        text: taskText
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(task, tasks.length);
    taskInput.value = '';
}

function addTaskToDOM(task, taskNumber) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const numberSpan = document.createElement('span');
    numberSpan.className = 'task-number';
    numberSpan.textContent = taskNumber + '.';

    const span = document.createElement('span');
    span.textContent = task.text;

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(numberSpan);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskList = document.getElementById('task-list');
    const taskItem = taskList.querySelector(`[data-id="${id}"]`);
    taskList.removeChild(taskItem);

    updateTaskNumbers();
}

function updateTaskNumbers() {
    const taskList = document.getElementById('task-list');
    const tasks = taskList.children;
    for (let i = 0; i < tasks.length; i++) {
        const numberSpan = tasks[i].querySelector('.task-number');
        numberSpan.textContent = (i + 1) + '.';
    }
}

function updateTask(id, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function editTask(id) {
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const span = taskItem.querySelector('span:nth-child(2)');
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
        span.textContent = newText.trim();
        updateTask(id, newText.trim());
    }
}
