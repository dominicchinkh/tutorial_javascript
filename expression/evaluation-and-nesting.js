// Evaluation and Nesting Showcase

// Helper functions for demonstration
function f() {
  console.log("F called!");
  return 2;
}

function g() {
  console.log("G called!");
  return 3;
}

// 1. Assignment as an expression
// The expression (x = f()) evaluates to the result of f() (which is 2).
// That result is then assigned to y.
let x;
const y = (x = f()); 
console.log("y:", y); // 2
console.log("x:", x); // 2

// 2. Chaining Assignments
// Because assignments return their assigned value, you can chain them.
// "a" gets the value of "b", which gets the value of "f()".
let a, b;
a = b = f(); 
console.log("a:", a, "b:", b); // Both are 2

// 3. Nesting in Array Literals
// Assignments can be nested inside complex expressions like arrays.
// Note: JavaScript evaluates expressions from left to right.
let c, d;
let arr = [c = f(), d = g()]; 
console.log("Array:", arr); // [2, 3]
console.log("c:", c, "d:", d); // c is 2, d is 3

// 4. Nesting in Function Calls
// You can pass the result of an assignment directly into a function.
let result = console.log("Direct assignment result:", (x = 100));
console.log("x is now:", x); // 100
