// Boundary Limits
console.log(Number.MAX_VALUE);         // 1.7976931348623157e+308 (Largest positive representable number)
console.log(Number.MIN_VALUE);         // 5e-324 (Smallest positive representable number)

// Safe Integer Boundaries (Exact integer precision without loss)
console.log(Number.MAX_SAFE_INTEGER);    //  9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER);    // -9007199254740991 (-(2^53 - 1))

// Precision / Epsilon
console.log(Number.EPSILON);             // 2.220446049250313e-16 (Difference between 1 and next representable float)

// Floating-point precision check using EPSILON
const isNearlyEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;

console.log(0.1 + 0.2 === 0.3);             // false (due to IEEE 754 floating-point error)
console.log(isNearlyEqual(0.1 + 0.2, 0.3)); // true

// Special Constants
console.log(Number.POSITIVE_INFINITY);   // Infinity
console.log(Number.NEGATIVE_INFINITY);   // -Infinity
console.log(Number.NaN);                 // NaN ("Not-a-Number")
