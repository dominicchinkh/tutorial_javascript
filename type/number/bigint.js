//---------------------
// Creation and syntax

// Literals end with an 'n'
const literalBigInt = 123n;
const negativeBigInt = -1234567890987654321n;

// Using the BigInt() constructor
const fromNumber = BigInt(123);

// Using strings with BigInt() avoids precision loss for huge numbers
const fromString = BigInt("-1234567890987654321");

console.log(typeof literalBigInt); // "bigint"

//-----------------------------------
// Arithmetic Operators with BigInts

// Most standard arithmetic operators work with BigInts (+, -, *, **, %)

const largeNum1 = 9007199254740991n;
const largeNum2 = 10n;

const sum = largeNum1 + largeNum2;
console.log("Addition:", sum); // 9007199254741001n

const product = largeNum2 * 3n;
console.log("Multiplication:", product); // 30n

const power = 2n ** 10n;
console.log("Exponentiation:", power); // 1024n

// Standard Numbers lose precision beyond Number.MAX_SAFE_INTEGER (2^53 - 1)
const numExponent = 12 ** 34; 
console.log(numExponent); // 4.9222352429520264e+36 (Approximated floating-point)

// BigInt maintains exact integer precision regardless of magnitude
const bigIntExponent = 12n ** 34n;
console.log(bigIntExponent); // 4922235242952026704037113243122008064n

// Note: Division (/) rounds towards zero (integer division)
const division = 7n / 2n;
console.log("Division (truncated):", division); // 3n (not 3.5)

//----------------------------------------
// Mixing BigInt and Number (Not Allowed)

// You cannot mix BigInt and regular Number types in direct arithmetic operations.
try {
  const mixed = 10n + 5; // Throws a TypeError
  
} catch (error) {
  console.log("Error caught:", error.message); 
  // Cannot mix BigInt and other types, use explicit conversion
}

// Correct way: explicitly convert the number to a BigInt
const fixedMix = 10n + BigInt(5);
console.log("Fixed Mix Addition:", fixedMix); // 15n

//------------------------------------------------
// Math object functions do NOT work with BigInts

try {
  Math.max(10n, 20n); // Throws TypeError
  
} catch (e) {
  console.log("Math object error:", e.message); 
  // "Cannot convert a BigInt value to a number"
}

//----------------------
// Comparison Operators

// BigInts can be compared with regular numbers using standard comparison operators
console.log("Comparison (10n > 5):", 10n > 5); // true
console.log("Equality (10n == 10):", 10n == 10); // true (loose equality converts types)
console.log("Strict Equality (10n === 10):", 10n === 10); // false (different types: BigInt vs Number)

//--------------------------------
// Bitwise Operators with BigInts

// Bitwise operators like &, |, ^, ~, <<, >> work with BigInt values
const bitwiseResult = 5n << 2n;
console.log("Bitwise Left Shift (5n << 2n):", bitwiseResult); // 20n
