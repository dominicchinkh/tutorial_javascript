//-----------------------------------
// 1. Basic Object Property Deletion

const Employee = {
  firstname: "John",
  lastname: "Doe",
  age: 30
};

console.log(delete Employee.age); // true
console.log(Employee);            // { firstname: 'John', lastname: 'Doe' }

// Deleting a non-existent property also returns true
console.log(delete Employee.salary); // true

//---------------------------------------------
// 2. Arrays: Creating "Holes" (Sparse Arrays)

const trees = ["redwood", "bay", "cedar", "oak", "maple"];

// Deleting an array element removes the element at index 3,
// but does NOT shrink the array length.
delete trees[3];

console.log(trees.length); // 5 (length remains 5)
console.log(trees[3]);      // undefined
console.log(trees);         // ["redwood", "bay", "cedar", <1 empty item>, "maple"]

// To remove elements and shrink the array, use Array.prototype.splice instead:
// trees.splice(3, 1);

//----------------------------------------------
// 3. Variables and Non-Configurable Properties

// Variables declared with var, let, or const cannot be deleted.
var x = 42;
let y = 100;

console.log(delete x); // false (in non-strict mode)
console.log(x);        // 42

// Built-in non-configurable properties cannot be deleted
console.log(delete Math.PI); // false
console.log(Math.PI);        // 3.141592653589793

// Explicitly defined non-configurable properties
const user = {};
Object.defineProperty(user, "id", {
  value: 101,
  configurable: false
});

console.log(delete user.id); // false

//-------------------------
// 4. Strict Mode Behavior

function strictModeDemo() {
  "use strict";

  const settings = { theme: "dark" };
  delete settings.theme; // Allowed: returns true

  // Un-commenting either line below will throw a TypeError in strict mode:
  // delete Math.PI;      // TypeError: Cannot delete property 'PI' of #<Object>
  // delete x;            // SyntaxError: Delete of an unqualified identifier in strict mode
}

strictModeDemo();
