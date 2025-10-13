// Activity 6: Interactive To-Do List (Part 2)
// Enhanced to-do list with refactored functions and advanced features


console.log("=== Activity 6: Function Demonstrations ===");


console.log("\n--- Function Declarations vs Function Expressions ---");

console.log("Calling hoisted function before definition:");
console.log("Result:", hoistedFunction(5, 3));

function hoistedFunction(a, b) {
    console.log("Hoisted function called with parameters:", a, b);
    return a + b;
}

console.log("\nDefining function expression:");
const functionExpression = function(x, y) {
    console.log("Function expression called with parameters:", x, y);
    return x * y;
};

console.log("Calling function expression:", functionExpression(4, 6));

const namedFunctionExpression = function multiply(x, y) {
    console.log("Named function expression 'multiply' called");
    return x * y;
};

console.log("Named function expression result:", namedFunctionExpression(3, 7));

console.log("\n--- Parameters, Arguments, and Return Values ---");

function calculateArea(width, height, shape = "rectangle") {
    console.log("calculateArea called with:");
    console.log("  width:", width);
    console.log("  height:", height);
    console.log("  shape:", shape);
    console.log("  arguments object:", arguments);
    console.log("  arguments length:", arguments.length);
    
    let area;
    if (shape === "rectangle") {
        area = width * height;
    } else if (shape === "triangle") {
        area = (width * height) / 2;
    } else {
        area = "Unknown shape";
    }
    
    console.log("  calculated area:", area);
    return area;
}

console.log("Rectangle area:", calculateArea(5, 10));
console.log("Triangle area:", calculateArea(8, 6, "triangle"));
console.log("Too many arguments:", calculateArea(3, 4, "rectangle", "extra", "params"));
console.log("Too few arguments:", calculateArea(7));

function logMessage(message) {
    console.log("Logging message:", message);
}

console.log("Function without return:", logMessage("Hello World"));

console.log("\n--- Local vs Global Scope Examples ---");

var globalVar = "I'm global with var";
let globalLet = "I'm global with let";
const globalConst = "I'm global with const";

console.log("Global scope variables:");
console.log("globalVar:", globalVar);
console.log("globalLet:", globalLet);
console.log("globalConst:", globalConst);

function scopeDemo() {
    console.log("\nInside scopeDemo function:");
    
    console.log("Accessing global variables from function:");
    console.log("  globalVar:", globalVar);
    console.log("  globalLet:", globalLet);
    console.log("  globalConst:", globalConst);
    
    var localVar = "I'm local with var";
    let localLet = "I'm local with let";
    const localConst = "I'm local with const";
    
    console.log("Local variables in function:");
    console.log("  localVar:", localVar);
    console.log("  localLet:", localLet);
    console.log("  localConst:", localConst);
    
    function nestedFunction() {
        console.log("\nInside nested function:");
        console.log("  Can access global globalVar:", globalVar);
        console.log("  Can access parent localVar:", localVar);
        
        let nestedVar = "I'm in nested scope";
        console.log("  nestedVar:", nestedVar);
        
        return nestedVar;
    }
    
    let nestedResult = nestedFunction();
    console.log("Result from nested function:", nestedResult);
    
    if (true) {
        let blockScoped = "I'm block scoped";
        var functionScoped = "I'm function scoped";
        console.log("\nInside if block:");
        console.log("  blockScoped:", blockScoped);
        console.log("  functionScoped:", functionScoped);
    }
    
    console.log("Outside if block:");
    console.log("  functionScoped is accessible:", functionScoped);
    
    try {
        console.log("  Trying to access blockScoped:", blockScoped);
    } catch (error) {
        console.log("  blockScoped is not accessible:", error.message);
    }
}

scopeDemo();

let shadowVar = "Original global value";

function shadowDemo() {
    let shadowVar = "Shadowed local value";
    console.log("\nInside shadowDemo - shadowVar:", shadowVar);
    
    function innerShadow() {
        let shadowVar = "Inner shadowed value";
        console.log("Inside innerShadow - shadowVar:", shadowVar);
    }
    
    innerShadow();
    console.log("Back in shadowDemo - shadowVar:", shadowVar);
}

console.log("Before shadowDemo - shadowVar:", shadowVar);
shadowDemo();
console.log("After shadowDemo - shadowVar:", shadowVar);

console.log("\n--- Arrow Function Examples ---");

const basicArrow = () => {
    console.log("Basic arrow function with no parameters");
    return "Arrow function result";
};

console.log("Basic arrow result:", basicArrow());

const singleParam = name => {
    console.log("Arrow function with single parameter:", name);
    return `Hello, ${name}!`;
};

console.log("Single param result:", singleParam("JavaScript"));

const multipleParams = (a, b, c) => {
    console.log("Arrow function with multiple parameters:", a, b, c);
    return a + b + c;
};

console.log("Multiple params result:", multipleParams(1, 2, 3));

const implicitReturn = (x, y) => x * y;
console.log("Implicit return result:", implicitReturn(6, 7));


const explicitReturn = (x, y) => {
    console.log("Arrow function with explicit return, calculating:", x, "^", y);
    return Math.pow(x, y);
};

console.log("Explicit return result:", explicitReturn(2, 8));

console.log("\nArrow functions vs regular functions (this context):");

const regularObj = {
    name: "Regular Object",
    regularMethod: function() {
        console.log("Regular method - this.name:", this.name);
        return this.name;
    },
    arrowMethod: () => {
        console.log("Arrow method - this.name:", this.name);
        console.log("Arrow method - this refers to:", this);
        return "Arrow functions don't bind 'this'";
    }
};

regularObj.regularMethod();
regularObj.arrowMethod();


const numbers = [1, 2, 3, 4, 5];
console.log("\nArrow functions with array methods:");
console.log("Original array:", numbers);

const doubled = numbers.map(n => n * 2);
console.log("Doubled (map):", doubled);

const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers (filter):", evens);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum (reduce):", sum);

console.log("\n--- Function Behavior Summary ---");
console.log("1. Function declarations are hoisted - can be called before definition");
console.log("2. Function expressions are not hoisted - must be defined first");
console.log("3. Parameters are local to the function scope");
console.log("4. Functions can access variables from outer scopes (scope chain)");
console.log("5. Local variables shadow global variables with the same name");
console.log("6. Arrow functions don't bind their own 'this' context");
console.log("7. Arrow functions are great for short, simple functions");

console.log("\n=== Function Demonstrations Complete ===");