// ==========================================
// 1. ArrayBuffer & Typed Array Views
// ==========================================
console.log("=== 1. ArrayBuffer & Views ===");

// Create a raw binary memory buffer of 16 bytes
const buffer = new ArrayBuffer(16);
console.log("Buffer byte length:", buffer.byteLength); // 16

// Create an Int32Array view over the buffer (each element is 4 bytes -> 4 elements total)
const int32View = new Int32Array(buffer);

int32View[0] = 42;
int32View[1] = 100;
int32View[2] = 255;
int32View[3] = 1024;

console.log("Int32Array elements:", int32View);
console.log("Int32Array length (number of elements):", int32View.length); // 4


// ==========================================
// 2. Multiple Views on the Same Buffer
// ==========================================
console.log("\n=== 2. Multiple Views Shared Memory ===");

// Create a Uint8Array view over the EXACT SAME memory buffer (16 elements of 1 byte each)
const uint8View = new Uint8Array(buffer);

// Modifying the buffer via the Uint32 view changes the underlying bytes
console.log("Byte representation of int32View[0] (42) in Uint8Array:");
console.log(`[${uint8View[0]}, ${uint8View[1]}, ${uint8View[2]}, ${uint8View[3]}]`); 
// Output: [42, 0, 0, 0] (Little-Endian integer storage)


// ==========================================
// 3. Uint8ClampedArray (Pixel / Image Data)
// ==========================================
console.log("\n=== 3. Uint8ClampedArray (Clamping Behavior) ===");

// Standard Uint8Array wraps around on overflow (modulo 256)
const standardUint8 = new Uint8Array(2);
standardUint8[0] = 300;  // 300 % 256 = 44
standardUint8[1] = -50;  // Wraps around to 206

console.log("Standard Uint8Array overflow:", standardUint8); // [44, 206]

// Uint8ClampedArray clamps values to [0, 255] (used in HTML Canvas ImageData)
const clampedUint8 = new Uint8ClampedArray(2);
clampedUint8[0] = 300;   // Clamped to max limit 255
clampedUint8[1] = -50;   // Clamped to min limit 0

console.log("Clamped Uint8Array output:", clampedUint8); // [255, 0]


// ==========================================
// 4. DataView for Heterogeneous Data & Endianness
// ==========================================
console.log("\n=== 4. DataView & Explicit Endianness ===");

const dvBuffer = new ArrayBuffer(8);
const dataView = new DataView(dvBuffer);

// Write different data types at specific byte offsets
dataView.setUint8(0, 255);                     // 1 byte at offset 0
dataView.setUint16(1, 0x1234, false);          // 2 bytes at offset 1 (Big-Endian)
dataView.setFloat32(3, 3.14159, true);         // 4 bytes at offset 3 (Little-Endian)

console.log("Read Uint8 at offset 0:", dataView.getUint8(0)); // 255
console.log("Read Uint16 at offset 1 (Big-Endian):", dataView.getUint16(1, false).toString(16)); // "1234"
console.log("Read Float32 at offset 3 (Little-Endian):", dataView.getFloat32(3, true)); // ~3.14159


// ==========================================
// 5. Subarrays vs Slices
// ==========================================
console.log("\n=== 5. Subarrays (Shared) vs. Slices (Copied) ===");

const sourceArray = new Int16Array([10, 20, 30, 40, 50]);

// subarray() creates a view referencing the SAME memory
const subView = sourceArray.subarray(1, 4); // [20, 30, 40]
subView[0] = 999; // Mutates original array

console.log("Original array after subarray mutation:", sourceArray); // [10, 999, 30, 40, 50]

// slice() creates a NEW copy of the buffer
const slicedArray = sourceArray.slice(1, 4);
slicedArray[0] = 777; // Does NOT affect original array

console.log("Original array after slice mutation:", sourceArray); // [10, 999, 30, 40, 50]
console.log("Sliced Array:", slicedArray);                         // [777, 30, 40]
