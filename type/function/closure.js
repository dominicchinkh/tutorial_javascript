// ==========================================
// 1. Lexical Scoping & Basic Closure
// ==========================================
console.log("=== 1. Lexical Scoping & Basic Closure ===");

function makeGreeting(greeting) {
  // Outer function scope variable 'greeting'
  return function (name) {
    // Inner function retains access to 'greeting' even after makeGreeting finishes executing
    return `${greeting}, ${name}!`;
  };
}

const sayHello = makeGreeting("Hello");
const sayHola = makeGreeting("Hola");

console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayHola("Bob"));    // "Hola, Bob!"


// ==========================================
// 2. Private Variables & Data Encapsulation
// ==========================================
console.log("\n=== 2. Private Variables (Module Pattern) ===");

// Emulating private methods and variables using closures
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable - cannot be accessed directly from outside

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getValue() {
      return count;
    }
  };
}

const counter = createCounter(10);
console.log("Initial count:", counter.getValue()); // 10
console.log("After increment:", counter.increment()); // 11
console.log("After decrement:", counter.decrement()); // 10

// Direct access is impossible:
console.log("Direct count access:", counter.count); // undefined


// ==========================================
// 3. Shared Lexical Environment
// ==========================================
console.log("\n=== 3. Shared Lexical State ===");

function makeCounterPair() {
  let sharedValue = 0;

  // Both methods close over the EXACT SAME sharedValue reference
  return {
    add(val) {
      sharedValue += val;
    },
    inspect() {
      return sharedValue;
    }
  };
}

const pair = makeCounterPair();
pair.add(5);
pair.add(10);
console.log("Shared Value:", pair.inspect()); // 15


// ==========================================
// 4. Closures in Loops (Classic Pitfall & Fix)
// ==========================================
console.log("\n=== 4. Closures in Loops ===");

// Problem (var): All closures reference the same mutated outer variable 'i'
function createFunctionsWithVar() {
  const result = [];
  for (var i = 0; i < 3; i++) {
    result.push(() => `var loop value: ${i}`);
  }
  return result;
}

const varFuncs = createFunctionsWithVar();
console.log(varFuncs[0]()); // "var loop value: 3" (Not 0!)
console.log(varFuncs[1]()); // "var loop value: 3"

// Solution 1: Use block-scoped 'let' (Creates a fresh variable binding per iteration)
function createFunctionsWithLet() {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(() => `let loop value: ${i}`);
  }
  return result;
}

const letFuncs = createFunctionsWithLet();
console.log(letFuncs[0]()); // "let loop value: 0"
console.log(letFuncs[1]()); // "let loop value: 1"


// ==========================================
// 5. Function Factory / Currying
// ==========================================
console.log("\n=== 5. Function Factories & Currying ===");

// Closures allow partial application of arguments
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log("Double 5:", double(5)); // 10
console.log("Triple 5:", triple(5)); // 15
