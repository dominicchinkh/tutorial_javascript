// ==========================================
// 1. Allocation & Memory Lifecycle
// ==========================================
console.log("=== 1. Value Allocation ===");

// Value allocation: primitive types are allocated on the stack/heap
const number = 42; // Allocates memory for a number
const text = "MDN Guide"; // Allocates memory for a string

// Object allocation
const user = { name: "Alice", age: 30 }; // Allocates memory for object & properties
const numbers = [1, 2, 3, 4, 5]; // Allocates memory for array

// Function allocation (callable object)
function calculateSum(a, b) {
  return a + b;
}


// ==========================================
// 2. Garbage Collection: Reachability (Mark-and-Sweep)
// ==========================================
console.log("\n=== 2. Reachability & Garbage Collection ===");

function createRefChain() {
  let rootObj = { data: "Important Data" };
  let childObj = { parent: rootObj };
  
  // Both objects are reachable starting from rootObj
  console.log("Root data:", childObj.parent.data);

  // Severing the reference to rootObj
  rootObj = null; 
  
  // Is the original object GC'd? NO, because 'childObj.parent' still holds a reference!
  console.log("Child parent data:", childObj.parent.data); // Still accessible

  childObj = null;
  // NOW both objects are unreachable from the root scope and eligible for GC.
}

createRefChain();


// ==========================================
// 3. Circular References (Limitation of Older Reference-Counting)
// ==========================================
console.log("\n=== 3. Circular References ===");

function createCircularReference() {
  const objA = {};
  const objB = {};

  // Circular link: objA points to objB, and objB points to objA
  objA.friend = objB;
  objB.friend = objA;

  // In old Reference-Counting GC algorithms, setting objA and objB to null
  // left reference counts at 1, causing a memory leak.
  // Modern engines use Mark-and-Sweep: once the local scope exits, neither object
  // is reachable from the global root, so BOTH are successfully collected.
}

createCircularReference();


// ==========================================
// 4. Common Memory Leak Pitfalls & Solutions
// ==========================================
console.log("\n=== 4. Memory Leak Patterns & Solutions ===");

// --- Pitfall A: Accidental Global Variables ---
function leakGlobal() {
  // Missing 'let' or 'const' creates a property on the global object (window/globalThis)
  // implicitGlobal = "I stick around forever!";
}

// --- Pitfall B: Uncleared Timers / Event Listeners ---
function leakyTimerSetup() {
  const largeDataBuffer = new Array(1000000).fill("DATA");
  
  const timerId = setInterval(() => {
    // Keeps largeDataBuffer alive via closure scope as long as interval runs
    console.log("Processing buffer length:", largeDataBuffer.length);
  }, 1000);

  // Solution: Clear the interval when no longer needed
  clearInterval(timerId);
}
leakyTimerSetup();


// --- Pitfall C: Unintentional Closure Retainers ---
function closureLeakExample() {
  let unusedData = new Array(1000000).fill("HEAP_ITEM");

  return function leakyClosure() {
    // Even if leakyClosure doesn't explicitly use 'unusedData',
    // shared lexical scope context can retain references in older engines.
  };
}


// ==========================================
// 5. Preventing Leaking via Weak References (WeakMap & WeakRef)
// ==========================================
console.log("\n=== 5. Weak References (WeakMap & WeakRef) ===");

// 5a. WeakMap: Keys must be objects and are held "weakly"
const cache = new WeakMap();

function processUser(userObj) {
  if (!cache.has(userObj)) {
    const computedData = { metadata: `Processed for ${userObj.name}` };
    cache.set(userObj, computedData);
  }
  return cache.get(userObj);
}

let activeUser = { name: "Bob" };
console.log("Cached entry:", processUser(activeUser));

// When activeUser is set to null, the entry in WeakMap is automatically GC'd!
activeUser = null; 


// 5b. WeakRef & FinalizationRegistry (ES2021)
let target = { payload: "Ephemeral Object" };

// Create a weak reference that does not prevent GC
const weakRef = new WeakRef(target);

// Dereference: Returns the target object if still alive, or undefined if GC'd
console.log("WeakRef deref (before GC):", weakRef.deref()?.payload);

// Set up a cleanup listener for when garbage collection occurs
const registry = new FinalizationRegistry((heldValue) => {
  console.log(`[GC Callback] Object with label "${heldValue}" was garbage collected.`);
});

registry.register(target, "User Payload Cache");

// Release hard reference
target = null;
