console.log("Hello, World!");

document.getElementById("output").textContent = "Hello, World!";

let studentName = "Rodrigo";
const age = 35;
let isStudent = true;
let emptyValue = null;
let notAssigned;

console.log("-- Variable Values --");
console.log("Student Name:", studentName);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Empty Value:", emptyValue);
console.log("Not Assigned:", notAssigned);


console.log("-- Variable Types --");
console.log("typeof studentName:", typeof studentName);
console.log("typeof age:", typeof age);
console.log("typeof isStudent:", typeof isStudent);
console.log("typeof emptyValue:", typeof emptyValue);
console.log("typeof notAssigned:", typeof notAssigned);

console.log("-- Variable Reassignment --");
console.log("Original studentName:", studentName);
studentName = "Rico";
console.log("Updated studentName:", studentName);

try {
  age = 21;
} catch (error) {
  console.log("Error when trying to reassign 'age':", error.message);
}