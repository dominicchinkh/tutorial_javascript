// ==========================================
// 1. Map: Keys of Any Type & Key Integrity
// ==========================================
console.log("=== 1. Map (Keys of Any Type) ===");

const myMap = new Map();

const keyObj = { id: 101 };
const keyFunc = function() {};
const keyString = "a string";

// Setting values with non-string keys
myMap.set(keyObj, "Value associated with object key");
myMap.set(keyFunc, "Value associated with function key");
myMap.set(keyString, "Value associated with string key");

console.log("Map Size:", myMap.size); // 3
console.log("Get object key:", myMap.get(keyObj));
console.log("Has function key?", myMap.has(keyFunc)); // true

// Map iteration maintains insertion order
console.log("\nIterating Map:");
for (const [key, value] of myMap) {
  console.log(`Key Type [${typeof key}] -> Value: "${value}"`);
}


// ==========================================
// 2. Set: Collection of Unique Values
// ==========================================
console.log("\n=== 2. Set (Unique Values) ===");

const mySet = new Set([1, 2, 3, 3, 4, 4, 5]);

// Adding duplicates has no effect
mySet.add(5);
mySet.add("5"); // Strings and numbers are distinct ("5" vs 5)

console.log("Set Size (duplicates removed):", mySet.size); // 6
console.log("Set items:", [...mySet]); // [1, 2, 3, 4, 5, "5"]

// Set operations (e.g., set containment)
console.log("Contains 3?", mySet.has(3)); // true
mySet.delete(2);
console.log("After deleting 2:", [...mySet]);


// ==========================================
// 3. WeakMap: Object-Only Keys & Garbage Collection
// ==========================================
console.log("\n=== 3. WeakMap (Garbage-Collectable Keys) ===");

const weakMap = new WeakMap();

let user = { name: "Alice" };
const metadata = { lastLogin: "2026-09-02" };

// Keys MUST be objects (or non-registered symbols)
weakMap.set(user, metadata);

console.log("Metadata for user:", weakMap.get(user));

// If 'user' reference is set to null, the entry in weakMap 
// becomes eligible for garbage collection automatically.
user = null; 
// Note: WeakMaps are not enumerable (no .size, no for...of iteration)


// ==========================================
// 4. WeakSet: Unique Object References
// ==========================================
console.log("\n=== 4. WeakSet (Unique Object References) ===");

const activeSessions = new WeakSet();

let sessionA = { id: "sess_1" };
let sessionB = { id: "sess_2" };

activeSessions.add(sessionA);
activeSessions.add(sessionB);

console.log("Is sessionA active?", activeSessions.has(sessionA)); // true

activeSessions.delete(sessionA);
console.log("Is sessionA active after deletion?", activeSessions.has(sessionA)); // false
