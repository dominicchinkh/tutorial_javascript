//-------------------------------------------------
// 1. Basic Behavior (Evaluating & Returning Last)

// The comma operator evaluates both expressions, 
// discards the result of the first, and returns the last.
let result = (2, 3); 
console.log(result); // Output: 3

//-----------------------
// 2. Using Side Effects

let x = 1;
// x++ evaluates (incrementing x to 2), then the expression returns the current value of x
x = (x++, x);
console.log(x); // Output: 2

//--------------------------------------
// 3. Multiple Updaters in a `for` Loop

console.log("--- For Loop Example ---");
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Using the comma operator to initialize and update multiple variables
for (let i = 0, j = 2; i <= 2; i++, j--) {
  console.log(`matrix[${i}][${j}] = ${matrix[i][j]}`);
}
// Output:
// matrix[0][2] = 3
// matrix[1][1] = 5
// matrix[2][0] = 7

//---------------------------------------------------------
// 4. Processing and Returning in One-Line Arrow Functions

console.log("--- Arrow Function Example ---");
let runningSum = 0;

// The comma operator updates 'runningSum' as a side effect 
// while returning the square calculation as the final value.
const squares = [1, 2, 3, 4].map((n) => ((runningSum += n), n * n));

console.log("Squares:", squares);     // Output: [1, 4, 9, 16]
console.log("Running Sum:", runningSum); // Output: 10

//----------------------------------------
// 5. Precedence Note (Lowest Precedence)

let a, b, c;

// Because the comma operator has lower precedence than assignment (=),
// this evaluates `a = b = 3` first, then `c = 4`, returning `4` as the result of the entire expression.
a = b = 3, c = 4; 
console.log(a); // Output: 3 (left-most assignment)
console.log(c); // Output: 4 

// If you want to group a comma expression inside an assignment, use parentheses:
let y, z;
x = (y = 5, z = 6);
console.log(x); // Output: 6 (returns the last operand, z = 6)
