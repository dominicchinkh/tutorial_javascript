// Bitwise Shift Operators Showcase

// Example number: 5 (binary: 0000...0101)
let number = 5;

// 1. Left Shift (<<)
// Shifts the bits to the left by the specified number of positions.
// New bits on the right are filled with 0.
// This is effectively multiplying the number by 2^n.
let leftShift = number << 2; 
console.log(`Left Shift (5 << 2):`, leftShift); // 20 (Binary: 10100)

// 2. Sign-propagating Right Shift (>>)
// Shifts the bits to the right. The leftmost bit (the sign bit) is copied
// to fill the empty spots on the left, preserving the sign (+ or -).
// This is effectively integer division by 2^n.
let rightShift = -20 >> 2;
console.log(`Sign-propagating Right Shift (-20 >> 2):`, rightShift); // -5

// 3. Zero-fill Right Shift (>>>)
// Shifts the bits to the right and fills the empty spots on the left with 0.
// This results in a non-negative 32-bit integer, regardless of the sign.
let zeroFillRightShift = -20 >>> 2;
console.log(`Zero-fill Right Shift (-20 >>> 2):`, zeroFillRightShift); // 1073741819
