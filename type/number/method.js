//---------------------------------------------
// Static methods (Parsing & Checks)

console.log("=== STATIC METHODS ===");

// Number.parseInt() - Parses string to integer with specified radix/base
console.log(Number.parseInt("42px", 10));        // 42

// Number.parseFloat() - Parses string to floating-point number
console.log(Number.parseFloat("3.14159rem"));  // 3.14159

// Number.isFinite() - Determines if the value is a finite number (No coercion)
console.log(Number.isFinite(100));             // true
console.log(Number.isFinite(Infinity));        // false
console.log(Number.isFinite("100"));           // false (String is not a number)

// Number.isInteger() - Determines if the value is an integer
console.log(Number.isInteger(5));              // true
console.log(Number.isInteger(5.5));            // false

// Number.isNaN() - Determines if the value is NaN (More robust than global isNaN)
console.log(Number.isNaN(NaN));                // true
console.log(Number.isNaN("hello"));            // false (Does not force coercion)

// Number.isSafeInteger() - Determines if a value is an integer within safe limits (±(2^53 - 1))
console.log(Number.isSafeInteger(9007199254740991));  // true
console.log(Number.isSafeInteger(9007199254740992));  // false

//--------------------------------
// Prototype methods (Formatting)

console.log("\n=== PROTOTYPE METHODS ===");

const sampleNumber = 1234.56789;

// toFixed() - Formats number using fixed-point notation with a specific number of decimals
console.log(sampleNumber.toFixed(2));          // "1234.57" (Rounds to 2 decimal places)
console.log(sampleNumber.toFixed(0));          // "1235"

// toPrecision() - Formats number to a specified significant length
console.log(sampleNumber.toPrecision(4));      // "1235"
console.log((0.0012345).toPrecision(2));       // "0.0012"

// toExponential() - Returns a string representing the number in exponential notation
console.log(sampleNumber.toExponential(3));    // "1.235e+3"
