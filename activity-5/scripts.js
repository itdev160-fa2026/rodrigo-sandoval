function demonstrateEventMethods() {
    const output = document.getElementById('output');
    
    const addButton = document.querySelector('button[onclick="add()"]');
    addButton.addEventListener('mouseover', function(event) {
        console.log('addEventListener mouseover:', event);
        logToOutput('addEventListener: Mouse over Add button');
    });
    
    addButton.addEventListener('mouseout', function(event) {
        console.log('addEventListener mouseout:', event);
        logToOutput('addEventListener: Mouse left Add button');
    });
    
    const subtractButton = document.querySelector('button[onclick="subtract()"]');
    subtractButton.onmouseover = function(event) {
        console.log('Direct property mouseover:', event);
        logToOutput('Direct property: Mouse over Subtract button');
    };
    
    subtractButton.onmouseout = function(event) {
        console.log('Direct property mouseout:', event);
        logToOutput('Direct property: Mouse left Subtract button');
    };
    
    logToOutput('Event handling methods demonstrated - check console for event objects');
}

function addEventTypeListeners() {
    const mathWidget = document.querySelector('.math-widget');
    
    mathWidget.addEventListener('click', function(event) {
        console.log('Click event:', {
            type: event.type,
            target: event.target.tagName,
            timestamp: event.timeStamp
        });
    });
    
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function(event) {
            console.log('Input event:', {
                type: event.type,
                target: event.target.id,
                value: event.target.value
            });
            logToOutput(`Input changed: ${event.target.id} = ${event.target.value}`);
        });
        
        input.addEventListener('focus', function(event) {
            console.log('Focus event:', event);
            logToOutput(`Focused on: ${event.target.id}`);
        });
        
        input.addEventListener('blur', function(event) {
            console.log('Blur event:', event);
            logToOutput(`Left focus: ${event.target.id}`);
        });
    });
}

function exploreEventObject(event, operation) {
    console.log('=== EVENT OBJECT EXPLORATION ===');
    console.log('Event type:', event.type);
    console.log('Event target:', event.target);
    console.log('Event currentTarget:', event.currentTarget);
    console.log('Target tag name:', event.target.tagName);
    console.log('Target text content:', event.target.textContent);
    console.log('Event timestamp:', event.timeStamp);
    
    
    logToOutput(`Event Details for ${operation}:`);
    logToOutput(`- Type: ${event.type}`);
    logToOutput(`- Target: ${event.target.tagName} (${event.target.textContent})`);
    logToOutput(`- Timestamp: ${event.timeStamp}`);
    
    const targetInfo = {
        id: event.target.id || 'No ID',
        className: event.target.className || 'No class',
        tagName: event.target.tagName,
        textContent: event.target.textContent
    };
    
    console.log('Target information object:', targetInfo);
    return targetInfo;
}

function validateInputs() {
    const number1 = document.getElementById('number1').value;
    const number2 = document.getElementById('number2').value;
    const result = document.getElementById('result');
    
    if (number1 === '' || number2 === '') {
        result.innerHTML = '⚠️ Please enter both numbers';
        result.style.color = '#e74c3c';
        return null;
    }
    
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    
    if (isNaN(num1) || isNaN(num2)) {
        result.innerHTML = '❌ Please enter valid numbers';
        result.style.color = '#e74c3c';
        return null;
    }
    
    return { num1, num2 };
}

function displayResult(value, operation) {
    const result = document.getElementById('result');
    result.style.color = '#2c3e50';
    
    if (typeof value === 'string') {
        result.innerHTML = value;
        result.style.color = '#e74c3c';
    } else {
        result.innerHTML = `${operation}: ${value}`;
        logToOutput(`Calculation: ${operation} = ${value}`);
    }
}

function add(event) {
    if (event) exploreEventObject(event, 'Addition');
    
    const inputs = validateInputs();
    if (!inputs) return;
    
    const result = inputs.num1 + inputs.num2;
    displayResult(result, 'Sum');
    addVisualFeedback(event?.target);
}

function subtract(event) {
    if (event) exploreEventObject(event, 'Subtraction');
    
    const inputs = validateInputs();
    if (!inputs) return;
    
    const result = inputs.num1 - inputs.num2;
    displayResult(result, 'Difference');
    addVisualFeedback(event?.target);
}

function multiply(event) {
    if (event) exploreEventObject(event, 'Multiplication');
    
    const inputs = validateInputs();
    if (!inputs) return;
    
    const result = inputs.num1 * inputs.num2;
    displayResult(result, 'Product');
    addVisualFeedback(event?.target);
}

function divide(event) {
    if (event) exploreEventObject(event, 'Division');
    
    const inputs = validateInputs();
    if (!inputs) return;
    
    if (inputs.num2 === 0) {
        displayResult('❌ Cannot divide by zero!', 'Error');
        return;
    }
    
    const result = inputs.num1 / inputs.num2;
    displayResult(result.toFixed(6), 'Quotient');
    addVisualFeedback(event?.target);
}

function addVisualFeedback(button) {
    if (!button) return;
    
    button.style.transform = 'scale(0.95)';
    button.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        button.style.transform = '';
        button.style.backgroundColor = '';
    }, 150);
    
    logToOutput(`Button clicked: ${button.textContent}`);
}

function clearResult() {
    const result = document.getElementById('result');
    result.innerHTML = '';
    result.style.color = '#2c3e50';
}

function setupInputFeedback() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearResult();
            
            if (this.value && !isNaN(parseFloat(this.value))) {
                this.style.borderColor = '#27ae60';
            } else if (this.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
        });
    });
}

function logToOutput(message) {
    const output = document.getElementById('output');
    const timestamp = new Date().toLocaleTimeString();
    output.innerHTML += `<div>[${timestamp}] ${message}</div>`;
    output.scrollTop = output.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded - initializing Activity 5');
    
    const output = document.getElementById('output');
    output.innerHTML = '<h3>JavaScript Console Output:</h3>';
    logToOutput('Activity 5 initialized - Math widget ready!');
    
    demonstrateEventMethods();
    addEventTypeListeners();
    setupInputFeedback();
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            console.log('Enhanced button click:', {
                operation: this.textContent,
                timestamp: event.timeStamp,
                target: event.target
            });
        });
    });
    
    logToOutput('All event handlers initialized');
    logToOutput('Try clicking buttons and interacting with inputs!');
    logToOutput('Check browser console for detailed event information');
});

window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    logToOutput(`❌ Error: ${event.error.message}`);
});