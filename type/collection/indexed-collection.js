// ==========================================
// 1. Array Creation & Length Behavior
// ==========================================
console.log("=== 1. Creation & Length Control ===");

// Preferred syntax: Array Literals
const fruits = ["Mango", "Apple", "Orange"];

// Creating arrays with pre-allocated length
const emptyWithLength = Array(3);
console.log("Pre-allocated length:", emptyWithLength.length); // 3
console.log("Contains items?", 0 in emptyWithLength); // false (sparse array)

// Manually truncating or expanding via .length
const scores = [10, 20, 30, 40, 50];
scores.length = 3; // Truncates the array
console.log("Truncated array:", scores); // [10, 20, 30]


// ==========================================
// 2. Modern Element Access with .at()
// ==========================================
console.log("\n=== 2. Modern Access with .at() ===");

const stations = ["Alpha", "Beta", "Gamma", "Delta"];

console.log("First element:", stations.at(0));   // "Alpha"
console.log("Last element (using -1):", stations.at(-1)); // "Delta"
console.log("Second to last:", stations.at(-2)); // "Gamma"


// ==========================================
// 3. Sparse Arrays vs. Dense Arrays
// ==========================================
console.log("\n=== 3. Sparse Arrays & Iteration ===");

// Notice the empty slot (,,)
const sparseList = ["first", "second", , "fourth"];

console.log("forEach skips empty slots:");
sparseList.forEach((item, index) => {
  console.log(`Index ${index}: ${item}`);
});
// Logs index 0 and 1, skips index 2, logs index 3


// ==========================================
// 4. Core Array Transformations & Mutations
// ==========================================
console.log("\n=== 4. Mutations & Transformations ===");

const queue = ["B", "C"];

// Adding and removing items (Push, Pop, Unshift, Shift)
queue.push("D");       // ["B", "C", "D"]
queue.unshift("A");    // ["A", "B", "C", "D"]
const removedFirst = queue.shift(); // Removes "A"
console.log("After shift/unshift/push:", queue); // ["B", "C", "D"]

// Splice: Removing and inserting items in place
const numbers = [1, 5, 6];
numbers.splice(1, 0, 2, 3, 4); // Inserts 2, 3, 4 starting at index 1
console.log("After splice insertion:", numbers); // [1, 2, 3, 4, 5, 6]

// Flattening nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
console.log("Flattened (depth 1):", nested.flat(1)); // [1, 2, 3, 4, [5, 6]]
console.log("Fully flattened:", nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
