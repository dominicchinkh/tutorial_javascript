//-------------------------
// 1. Primitive Data Types

console.log(typeof "Hello");      // "string"
console.log(typeof 42);           // "number"
console.log(typeof 3.14);         // "number"
console.log(typeof 100n);         // "bigint"
console.log(typeof true);         // "boolean"
console.log(typeof Symbol("id")); // "symbol"
console.log(typeof undefined);    // "undefined"

//--------------------------
// 2. Objects and Functions

console.log(typeof { a: 1 });    // "object"
console.log(typeof [1, 2, 3]);   // "object" (Arrays are objects)
console.log(typeof new Date());  // "object"
console.log(typeof /regex/);     // "object"

// Functions are the only callable objects that return "function"
console.log(typeof function() {});  // "function"
console.log(typeof (() => {}));     // "function"
console.log(typeof Math.sin);       // "function"

//----------------------------------
// 3. Notable Quirks and Edge Cases

// null returns "object" (a legacy bug in JS since 1995)
console.log(typeof null);        // "object"

// NaN (Not-a-Number) is technically a number type
console.log(typeof NaN);         // "number"

// Wrapper objects created with 'new' return "object", not primitive types
console.log(typeof "text");             // "string"
console.log(typeof new String("text")); // "object"

//-------------------------------------------
// 4. Undeclared vs. Uninitialized Variables

// Undeclared variables return "undefined" without throwing a ReferenceError
console.log(typeof undeclaredVar); // "undefined"

// Temporal Dead Zone (TDZ): Checking let/const before initialization WILL throw an error
try {
  console.log(typeof letVar); // Throws ReferenceError!
  let letVar = 10;
  
} catch (e) {
  console.log("TDZ Error:", e.message);
}
