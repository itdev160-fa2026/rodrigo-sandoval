// Part A: Arithmetic Operators
console.log("Part A: Arithmetic Operators");
let a = 10, b = 3;
console.log("Addition (a + b):", a + b);
console.log("Subtraction (a - b):", a - b);
console.log("Multiplication (a * b):", a * b);
console.log("Division (a / b):", a / b);
console.log("Modulus (a % b):", a % b);

// Operator precedence example
console.log("Operator Precedence (a + b * 2):", a + b * 2);
console.log("Operator Precedence ((a + b) * 2):", (a + b) * 2);

// Part B: Comparison Operators
console.log("\nPart B: Comparison Operators");
console.log("a == b:", a == b);
console.log("a === b:", a === b);
console.log("a != b:", a != b);
console.log("a !== b:", a !== b);
console.log("a > b:", a > b);
console.log("a < b:", a < b);
console.log("a >= b:", a >= b);
console.log("a <= b:", a <= b);

// Demonstrating == vs ===
let c = "10";
console.log("a == c (loose equality):", a == c);
console.log("a === c (strict equality):", a === c);

// Part C: Logical Operators
console.log("\nPart C: Logical Operators");
let x = true, y = false;
console.log("x && y (AND):", x && y);
console.log("x || y (OR):", x || y);
console.log("!x (NOT):", !x);

// Truth table demonstration
console.log("Truth Table for AND:");
console.log("true && true:", true && true);
console.log("true && false:", true && false);
console.log("false && true:", false && true);
console.log("false && false:", false && false);

console.log("Truth Table for OR:");
console.log("true || true:", true || true);
console.log("true || false:", true || false);
console.log("false || true:", false || true);
console.log("false || false:", false || false);

console.log("Truth Table for NOT:");
console.log("!true:", !true);
console.log("!false:", !false);

// Part D: Basic Conditional Statements
console.log("\nPart D: Basic Conditional Statements");
let age = 20;
if (age < 13) {
    console.log("You are a child.");
} else if (age >= 13 && age < 18) {
    console.log("You are a teenager.");
} else {
    console.log("You are an adult.");
}

// Part E: Switch Statement Demo
console.log("\nPart E: Switch Statement Demo");
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of the work week.");
        break;
    case "Friday":
        console.log("End of the work week.");
        break;
    case "Saturday":
    case "Sunday":
        console.log("It's the weekend!");
        break;
    default:
        console.log("It's a regular day.");
}

// Part F: Age Checker Application
function checkAge() {
    const ageInput = document.getElementById("ageInput").value;
    const resultDiv = document.getElementById("result");
    let message = "";

    if (isNaN(ageInput) || ageInput.trim() === "") {
        message = "Invalid age - please enter a number";
        resultDiv.className = "invalid";
    } else {
        const age = parseInt(ageInput);
        if (age < 0 || age > 150) {
            message = "Invalid age - please enter a realistic age";
            resultDiv.className = "invalid";
        } else if (age < 18) {
            message = "You are a minor";
            resultDiv.className = "minor";
        } else {
            message = "You are an adult";
            resultDiv.className = "adult";
        }
    }

    resultDiv.textContent = message;
}