// Logical Operators Showcase

const a = true;
const b = false;

// 1. Logical AND (&&)
// Returns true only if both operands are true.
// Short-circuiting: If the first operand is false, it returns that first operand immediately.
console.log("AND (true && false):", a && b);      // false
console.log("AND (true && true):", a && true);    // true

// 2. Logical OR (||)
// Returns true if at least one operand is true.
// Short-circuiting: If the first operand is true, it returns that first operand immediately.
console.log("OR (true || false):", a || b);       // true
console.log("OR (false || false):", b || false);  // false

// 3. Logical NOT (!)
// Returns the opposite of the boolean value of the operand.
console.log("NOT (!true):", !a);                  // false
console.log("NOT (!false):", !b);                 // true

// Advanced: Short-circuiting for default values
// Often used to provide default values if a variable is falsy (like null or undefined)
let username = null;
let displayName = username || "Guest"; 
console.log("Display Name:", displayName);        // "Guest" (because username was falsy)

// Advanced: Conditional execution (using &&)
let isLoggedIn = true;
isLoggedIn && console.log("User is logged in!"); // Executes only if isLoggedIn is true
