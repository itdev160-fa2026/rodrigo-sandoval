
console.log("=== Activity 4: Interactive To-Do List JavaScript ===");

let totalTasks = 0;
let completedTasks = 0;


console.log("\n--- PART A: Element Creation Demonstrations ---");

function demonstrateElementCreation() {
    console.log("Creating different types of elements...");

    const paragraph = document.createElement('p');
    const button = document.createElement('button');
    const div = document.createElement('div');
    const span = document.createElement('span');
    
    console.log("Created paragraph element:", paragraph);
    console.log("Created button element:", button);
    console.log("Created div element:", div);
    console.log("Created span element:", span);

    console.log("\nSetting properties on elements...");
    paragraph.textContent = "This is the demo div";
    paragraph.id = "demo-paragraph";
    button.textContent = "Demo Button";
    button.className = "demo-btn";
    div.innerHTML = "<strong>This div has HTML content</strong>";
    span.setAttribute('data-info', 'demo-span');
    
    console.log("Paragraph after modification:", paragraph);
    console.log("Button after modification:", button);
    console.log("Div after modification:", div);
    console.log("Span after modification:", span);

    console.log("\nDemonstrating difference between creation and appending:");
    console.log("Elements created but not yet in DOM tree");
    console.log("Document body children count before append:", document.body.children.length);

    const outputDiv = document.getElementById('output');
    outputDiv.appendChild(paragraph);
    outputDiv.appendChild(button);
    outputDiv.appendChild(div);
    outputDiv.appendChild(span);
    
    console.log("Elements now appended to DOM");
    console.log("Output div children count after append:", outputDiv.children.length);
}

console.log("\n--- PART B: Element Styling Demonstrations ---");

function demonstrateElementStyling() {
    console.log("Demonstrating element styling...");
    
    const testElement = document.createElement('div');
    testElement.textContent = "Styling Test Element";
    testElement.id = "styling-test";

    console.log("Using element.style to modify CSS properties:");
    testElement.style.backgroundColor = "lightblue";
    testElement.style.padding = "10px";
    testElement.style.margin = "5px";
    testElement.style.borderRadius = "5px";
    testElement.style.fontWeight = "bold";
    
    console.log("Applied styles:", testElement.style.cssText);

    console.log("\nDemonstrating classList methods:");

    testElement.classList.add('demo-class', 'highlighted');
    console.log("After classList.add('demo-class', 'highlighted'):", testElement.className);

    console.log("Contains 'demo-class':", testElement.classList.contains('demo-class'));
    console.log("Contains 'non-existent':", testElement.classList.contains('non-existent'));

    testElement.classList.toggle('active');
    console.log("After toggle('active'):", testElement.className);
    testElement.classList.toggle('active');
    console.log("After toggle('active') again:", testElement.className);

    testElement.classList.remove('highlighted');
    console.log("After remove('highlighted'):", testElement.className);

    document.getElementById('output').appendChild(testElement);
}


console.log("\n--- PART C: Element Appending Demonstrations ---");

function demonstrateElementAppending() {
    console.log("Demonstrating element appending methods...");

    const container = document.createElement('div');
    container.id = "append-demo-container";
    container.style.border = "2px solid #333";
    container.style.padding = "10px";
    container.style.margin = "10px 0";

    const firstChild = document.createElement('p');
    firstChild.textContent = "First child (appendChild)";
    firstChild.style.background = "lightgreen";
    
    const secondChild = document.createElement('p');
    secondChild.textContent = "Second child (appendChild)";
    secondChild.style.background = "lightcoral";
    
    const prependedChild = document.createElement('p');
    prependedChild.textContent = "Prepended child (prepend)";
    prependedChild.style.background = "lightyellow";
    
    const insertedChild = document.createElement('p');
    insertedChild.textContent = "Inserted before second (insertBefore)";
    insertedChild.style.background = "lightpink";
    
    console.log("Container children before appending:", container.children.length);
    
    container.appendChild(firstChild);
    container.appendChild(secondChild);
    console.log("After appendChild operations:", container.children.length);
    console.log("DOM tree:", container.innerHTML);
    
    container.prepend(prependedChild);
    console.log("After prepend operation:", container.children.length);
    console.log("DOM tree:", container.innerHTML);
    
    container.insertBefore(insertedChild, secondChild);
    console.log("After insertBefore operation:", container.children.length);
    console.log("DOM tree:", container.innerHTML);
    
    console.log("\nDemonstrating removeChild:");
    const removedElement = container.removeChild(insertedChild);
    console.log("Removed element:", removedElement);
    console.log("Container children after removal:", container.children.length);
    console.log("Final DOM tree:", container.innerHTML);
    
    document.getElementById('output').appendChild(container);
}

console.log("\n--- PART D: To-Do List Core Functionality ---");

function addTask() {
    console.log("addTask() function called");
    
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    console.log("Input value:", taskText);
    
    if (taskText === '') {
        console.log("Validation failed: Empty input");
        alert("Please enter a task before adding!");
        return;
    }
    
    console.log("Validation passed: Creating new task");
    
    const listItem = document.createElement('li');
    console.log("Created li element:", listItem);
    
    listItem.textContent = taskText;
    console.log("Set text content:", listItem.textContent);
    
    listItem.classList.add('todo-item', 'pending');
    console.log("Added CSS classes:", listItem.className);
    
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('todo-actions');
    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('btn-complete');
    completeBtn.onclick = () => toggleTaskCompletion(listItem);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('btn-delete');
    deleteBtn.onclick = () => deleteTask(listItem);
    
    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    const textSpan = document.createElement('span');
    textSpan.classList.add('todo-text');
    textSpan.textContent = taskText;

    listItem.textContent = '';
    listItem.appendChild(textSpan);
    listItem.appendChild(actionsDiv);
    
    const todoList = document.getElementById('todo-list');
    todoList.appendChild(listItem);
    console.log("Appended list item to todo list");
    console.log("Todo list children count:", todoList.children.length);
    
    taskInput.value = '';
    console.log("Cleared input field");
    
    totalTasks++;
    updateTaskStatistics();
    
    textSpan.onclick = () => toggleTaskCompletion(listItem);
    
    console.log("Task successfully added:", taskText);
}

console.log("\n--- PART E: Task State Management ---");

function toggleTaskCompletion(listItem) {
    console.log("Toggling task completion for:", listItem);
    
    const isCompleted = listItem.classList.contains('done');
    console.log("Current completion status:", isCompleted);
    
    if (isCompleted) {
        listItem.classList.remove('done');
        listItem.classList.add('pending');
        completedTasks--;
        console.log("Task marked as pending");
    } else {
        listItem.classList.remove('pending');
        listItem.classList.add('done');
        completedTasks++;
        console.log("Task marked as completed");
    }
    
    console.log("New completion status:", listItem.classList.contains('done'));
    updateTaskStatistics();
    
    const completeBtn = listItem.querySelector('.btn-complete');
    completeBtn.textContent = listItem.classList.contains('done') ? 'Undo' : 'Complete';
}

function deleteTask(listItem) {
    console.log("Deleting task:", listItem);
    
    const isCompleted = listItem.classList.contains('done');
    
    listItem.remove();
    
    totalTasks--;
    if (isCompleted) {
        completedTasks--;
    }
    
    updateTaskStatistics();
    console.log("Task deleted successfully");
}

function updateTaskStatistics() {
    const stats = {
        total: totalTasks,
        completed: completedTasks,
        pending: totalTasks - completedTasks,
        completionRate: totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0
    };
    
    console.log("Task Statistics:", stats);
    
    const outputDiv = document.getElementById('output');
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

console.log("\n--- Event Handling and Initialization ---");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded, initializing application...");
    
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.onclick = addTask;
        console.log("Event listener added to Add Task button");
    } else {
        console.error("Add Task button not found!");
    }
    
    const taskInput = document.getElementById('taskInput');
    if (taskInput) {
        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                console.log("Enter key pressed in input field");
                addTask();
            }
        });
        console.log("Enter key event listener added to input field");
    } else {
        console.error("Task input field not found!");
    }
    
    console.log("Running demonstrations...");
    demonstrateElementCreation();
    demonstrateElementStyling();
    demonstrateElementAppending();
    
    updateTaskStatistics();
    
    console.log("Application initialization complete!");
});

function logDOMState() {
    const todoList = document.getElementById('todo-list');
    console.log("Current DOM state:");
    console.log("Todo list children:", todoList.children.length);
    console.log("Todo list HTML:", todoList.innerHTML);
}

function clearAllTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    totalTasks = 0;
    completedTasks = 0;
    updateTaskStatistics();
    console.log("All tasks cleared");
}

console.log("JavaScript file loaded successfully!");