
console.log("=== Activity 6: Advanced To-Do List JavaScript ===");

// Part B: Application State Object
const todoApp = {
    tasks: [],
    taskIdCounter: 1,
    currentFilter: 'all',
    
    get totalTasks() {
        return this.tasks.length;
    },
    
    get completedTasks() {
        return this.tasks.filter(task => task.completed).length;
    },
    
    get pendingTasks() {
        return this.tasks.filter(task => !task.completed).length;
    },
    
    get completionRate() {
        return this.totalTasks > 0 ? ((this.completedTasks / this.totalTasks) * 100).toFixed(1) : 0;
    }
};

console.log("\n--- PART B: Refactored To-Do List Functions ---");

function createTask(text, priority = 'medium') {
    return {
        id: todoApp.taskIdCounter++,
        text: text.trim(),
        completed: false,
        priority: priority,
        timestamp: new Date(),
        createdAt: new Date().toLocaleString()
    };
}

function createTaskElement(task) {
    console.log("Creating task element for:", task);
    
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item', task.completed ? 'completed' : 'pending');
    listItem.dataset.taskId = task.id;
    listItem.dataset.priority = task.priority;
    
    const priorityBar = document.createElement('div');
    priorityBar.classList.add('task-priority', `priority-${task.priority}`);
    
    const textSpan = document.createElement('span');
    textSpan.classList.add('todo-text');
    textSpan.textContent = task.text;
    textSpan.addEventListener('dblclick', () => editTask(task.id));
    
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');
    
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
    toggleBtn.classList.add('task-btn', 'toggle-btn');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('task-btn', 'delete-btn');
    
    actionsDiv.appendChild(toggleBtn);
    actionsDiv.appendChild(deleteBtn);
    
    listItem.appendChild(priorityBar);
    listItem.appendChild(textSpan);
    listItem.appendChild(actionsDiv);
    
    return listItem;
}

function addTask(taskText = null) {
    console.log("addTask() function called");
    
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const text = taskText || taskInput.value.trim();
    const priority = prioritySelect ? prioritySelect.value : 'medium';
    
    console.log("Input value:", text, "Priority:", priority);
    
    if (!text) {
        console.log("Validation failed: Empty input");
        showMessage("Please enter a task before adding!", 'error');
        return;
    }
    
    const task = createTask(text, priority);
    todoApp.tasks.push(task);
    
    console.log("Task created:", task);
    
    if (taskInput) taskInput.value = '';
    
    renderTasks();
    updateTaskStats();
    updateEmptyState();
    
    showMessage(`Task "${text}" added successfully!`, 'success');
    console.log("Task successfully added:", text);
}

function deleteTask(taskId) {
    console.log("Deleting task with ID:", taskId);
    
    const task = todoApp.tasks.find(t => t.id === taskId);
    if (!task) {
        console.error("Task not found!");
        return;
    }
    
    if (!confirm(`Are you sure you want to delete "${task.text}"?`)) {
        return;
    }
    
    todoApp.tasks = todoApp.tasks.filter(t => t.id !== taskId);
    
    renderTasks();
    updateTaskStats();
    updateEmptyState();
    
    showMessage(`Task "${task.text}" deleted!`, 'success');
    console.log("Task deleted successfully");
}

function toggleTaskStatus(taskId) {
    console.log("Toggling task status for ID:", taskId);
    
    const task = todoApp.tasks.find(t => t.id === taskId);
    if (!task) {
        console.error("Task not found!");
        return;
    }
    
    task.completed = !task.completed;
    console.log("Task completion status changed to:", task.completed);
    
    renderTasks();
    updateTaskStats();
    
    const status = task.completed ? 'completed' : 'pending';
    showMessage(`Task marked as ${status}!`, 'success');
}

function updateTaskStats() {
    const stats = {
        total: todoApp.totalTasks,
        completed: todoApp.completedTasks,
        pending: todoApp.pendingTasks,
        completionRate: todoApp.completionRate
    };
    
    console.log("Task Statistics:", stats);
    
    const outputDiv = document.getElementById('output');
    if (!outputDiv) return;
    
    const statsDisplay = document.getElementById('task-stats') || document.createElement('div');
    statsDisplay.id = 'task-stats';
    statsDisplay.innerHTML = `
        <h3>Task Statistics:</h3>
        <p>Total Tasks: ${stats.total}</p>
        <p>Completed: ${stats.completed}</p>
        <p>Pending: ${stats.pending}</p>
        <p>Completion Rate: ${stats.completionRate}%</p>
    `;
    
    if (!document.getElementById('task-stats')) {
        outputDiv.appendChild(statsDisplay);
    }
}

function filterTasks(filterType) {
    console.log("Filtering tasks by:", filterType);
    
    todoApp.currentFilter = filterType;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filterType) {
            btn.classList.add('active');
        }
    });
    
    renderTasks();
}

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;
    
    todoList.innerHTML = '';
    
    let filteredTasks = todoApp.tasks;
    
    switch (todoApp.currentFilter) {
        case 'pending':
            filteredTasks = todoApp.tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = todoApp.tasks.filter(task => task.completed);
            break;
        case 'all':
        default:
            filteredTasks = todoApp.tasks;
            break;
    }
    
    filteredTasks.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        todoList.appendChild(taskElement);
    });
    
    console.log(`Rendered ${filteredTasks.length} tasks with filter: ${todoApp.currentFilter}`);
}

console.log("\n--- PART C: Delete Functionality ---");

// Part C: Enhanced delete functionality with event delegation
function setupEventDelegation() {
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;
    
    todoList.addEventListener('click', function(event) {
        const taskItem = event.target.closest('.todo-item');
        if (!taskItem) return;
        
        const taskId = parseInt(taskItem.dataset.taskId);
        
        if (event.target.classList.contains('delete-btn')) {
            event.preventDefault();
            deleteTask(taskId);
        } else if (event.target.classList.contains('toggle-btn')) {
            event.preventDefault();
            toggleTaskStatus(taskId);
        }
    });
    
    console.log("Event delegation setup complete");
}

console.log("\n--- PART D: Filter and Toggle Features ---");

// Part D: Setup filter functionality
function setupFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            filterTasks(filterType);
        });
    });
    
    console.log("Filter buttons setup complete");
}

console.log("\n--- PART E: Advanced Features ---");

// Part E: Advanced Features

function editTask(taskId) {
    const task = todoApp.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
        showMessage("Task updated successfully!", 'success');
    }
}

function markAllDone() {
    if (todoApp.tasks.length === 0) {
        showMessage("No tasks to mark as done!", 'warning');
        return;
    }
    
    todoApp.tasks.forEach(task => task.completed = true);
    renderTasks();
    updateTaskStats();
    showMessage("All tasks marked as completed!", 'success');
}

function deleteCompleted() {
    const completedCount = todoApp.completedTasks;
    
    if (completedCount === 0) {
        showMessage("No completed tasks to delete!", 'warning');
        return;
    }
    
    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        todoApp.tasks = todoApp.tasks.filter(task => !task.completed);
        renderTasks();
        updateTaskStats();
        updateEmptyState();
        showMessage(`${completedCount} completed task(s) deleted!`, 'success');
    }
}

function clearAllTasks() {
    if (todoApp.tasks.length === 0) {
        showMessage("No tasks to clear!", 'warning');
        return;
    }
    
    if (confirm(`Delete all ${todoApp.totalTasks} task(s)?`)) {
        todoApp.tasks = [];
        renderTasks();
        updateTaskStats();
        updateEmptyState();
        showMessage("All tasks cleared!", 'success');
    }
}

function updateEmptyState() {
    const emptyState = document.getElementById('emptyState');
    const todoList = document.getElementById('todo-list');
    
    if (!emptyState || !todoList) return;
    
    if (todoApp.tasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

function showMessage(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    
    let messageEl = document.getElementById('message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'message';
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = type;
    
    switch (type) {
        case 'success':
            messageEl.style.backgroundColor = '#4caf50';
            break;
        case 'error':
            messageEl.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            messageEl.style.backgroundColor = '#ff9800';
            break;
        default:
            messageEl.style.backgroundColor = '#2196f3';
    }
    
    messageEl.style.opacity = '1';
    
    setTimeout(() => {
        messageEl.style.opacity = '0';
    }, 3000);
}

console.log("\n--- Event Handling and Initialization ---");

function initializeApp() {
    console.log("Initializing enhanced to-do application...");
    
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => addTask());
        console.log("Add Task button event listener added");
    }
    
    const taskInput = document.getElementById('taskInput');
    if (taskInput) {
        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
        console.log("Task input Enter key listener added");
    }
    
    const markAllDoneBtn = document.getElementById('markAllDoneBtn');
    if (markAllDoneBtn) {
        markAllDoneBtn.addEventListener('click', markAllDone);
    }
    
    const deleteCompletedBtn = document.getElementById('deleteCompletedBtn');
    if (deleteCompletedBtn) {
        deleteCompletedBtn.addEventListener('click', deleteCompleted);
    }
    
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllTasks);
    }
    
    setupEventDelegation();
    setupFilterButtons();
    
    renderTasks();
    updateTaskStats();
    updateEmptyState();
    
    console.log("Enhanced to-do application initialization complete!");
    showMessage("To-Do App loaded successfully!", 'success');
}

document.addEventListener('DOMContentLoaded', initializeApp);

console.log("Enhanced JavaScript file loaded successfully!");