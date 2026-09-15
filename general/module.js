// ==========================================
// 1. Module Declarations & Export Types
// File: ./mathUtils.js
// ==========================================

// Named exports (exported individually)
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Private top-level variable (NOT exported, scoped ONLY to this module file)
const internalSecret = "MODULE_PRIVATE_KEY";

// Default export (Only ONE default export permitted per module)
export default class Calculator {
  #memory = 0;

  add(val) {
    this.#memory += val;
    return this;
  }

  get total() {
    return this.#memory;
  }
}


// ==========================================
// 2. Importing Modules & Aliasing
// File: ./main.js
// ==========================================

// Importing Default and Named Exports together
import Calculator, { add, multiply as mult, PI } from "./mathUtils.js";

// Importing EVERYTHING as a namespace object
import * as MathUtils from "./mathUtils.js";

console.log("=== 1. Named & Default Imports ===");
console.log("PI constant:", PI);
console.log("Add function:", add(10, 20)); // 30
console.log("Multiply via alias (mult):", mult(4, 5)); // 20

const calc = new Calculator();
console.log("Default export instance total:", calc.add(15).total); // 15

console.log("\n=== 2. Namespace Import (import * as) ===");
console.log("Namespace keys:", Object.keys(MathUtils)); // ["PI", "add", "default", "multiply"]
console.log("Accessing via namespace:", MathUtils.add(5, 5)); // 10


// ==========================================
// 3. Re-exporting / Aggregating Modules
// File: ./index.js (Barrel Export pattern)
// ==========================================

// Re-export specific named exports from another module
export { add, multiply } from "./mathUtils.js";

// Re-export a default export as a named export
export { default as StandardCalculator } from "./mathUtils.js";

// Re-export everything from a sub-module
export * from "./mathUtils.js";


// ==========================================
// 4. Dynamic Imports (import()) & Top-Level Await
// ==========================================
console.log("\n=== 3. Dynamic Imports & import.meta ===");

async function loadAnalyticsModule(featureEnabled) {
  if (featureEnabled) {
    // Dynamic import loads modules lazily at runtime
    // Returns a Promise that resolves to the module object
    const module = await import("./mathUtils.js");
    console.log("[Dynamic Import] Lazily loaded PI:", module.PI);
  } else {
    console.log("[Dynamic Import] Feature disabled, module skipped.");
  }
}

await loadAnalyticsModule(true);


// ==========================================
// 5. Module Metadata (import.meta)
// ==========================================

// import.meta contains context-specific metadata about the current module
console.log("\n=== 4. import.meta Metadata ===");
console.log("Current Module URL:", import.meta.url); 
// Output in browser: "https://example.com/js/main.js"
// Output in Node.js ESM: "file:///app/main.js"
