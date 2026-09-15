// ==========================================
// 1. Custom Iterator (Protocol Implementation)
// ==========================================
console.log("=== 1. Custom Iterator Protocol ===");

// An object becomes an iterable when it implements the [Symbol.iterator] method
function createRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next() {
      if (nextIndex < end) {
        const result = { value: nextIndex, done: false };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    }
  };

  return rangeIterator;
}

const customIterator = createRangeIterator(1, 10, 3);
console.log(customIterator.next()); // { value: 1, done: false }
console.log(customIterator.next()); // { value: 4, done: false }
console.log(customIterator.next()); // { value: 7, done: false }
console.log(customIterator.next()); // { value: 3, done: true }


// ==========================================
// 2. Basic Generator Function (function*)
// ==========================================
console.log("\n=== 2. Basic Generator Function ===");

// Generators simplify custom iterator creation using function* and yield
function* idGenerator() {
  let id = 1;
  while (id <= 3) {
    yield `ID_${id}`;
    id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // "ID_1"
console.log(gen.next().value); // "ID_2"
console.log(gen.next().value); // "ID_3"
console.log(gen.next());       // { value: undefined, done: true }


// ==========================================
// 3. Generators are Iterable (for...of)
// ==========================================
console.log("\n=== 3. Iterating Generators with for...of ===");

function* fibonacciSequence(limit) {
  let [fn1, fn2] = [0, 1];
  while (fn1 <= limit) {
    yield fn1;
    [fn1, fn2] = [fn2, fn1 + fn2];
  }
}

// Generators work directly with for...of loops and spread syntax
for (const num of fibonacciSequence(20)) {
  console.log("Fibonacci:", num);
}

console.log("Spread generator into array:", [...fibonacciSequence(10)]); // [0, 1, 1, 2, 3, 5, 8]


// ==========================================
// 4. Two-Way Communication via next(value)
// ==========================================
console.log("\n=== 4. Passing Arguments into Generators ===");

function* conversationGenerator() {
  const name = yield "What is your name?";
  const answer = yield `Hello ${name}, do you like JavaScript?`;
  return `Final response noted: "${answer}" for ${name}`;
}

const chat = conversationGenerator();

// First next() starts the generator up to the first yield
console.log("Generator:", chat.next().value);               // "What is your name?"

// Passing a value into next() provides the return value for the yield expression
console.log("Generator:", chat.next("Alex").value);           // "Hello Alex, do you like JavaScript?"
console.log("Generator:", chat.next("Yes, absolutely!").value); // "Final response noted:..."


// ==========================================
// 5. Delegating Generators using yield*
// ==========================================
console.log("\n=== 5. Generator Delegation (yield*) ===");

function* countUp() {
  yield 1;
  yield 2;
}

function* countDown() {
  yield 2;
  yield 1;
}

function* combinedSequence() {
  yield "Start";
  yield* countUp();   // Delegates to countUp generator
  yield* countDown(); // Delegates to countDown generator
  yield "End";
}

console.log([...combinedSequence()]); // ["Start", 1, 2, 2, 1, "End"]


// ==========================================
// 6. Asynchronous Iterators & Generators
// ==========================================
console.log("\n=== 6. Async Generators (for await...of) ===");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Async generator function using async function* and await
async function* fetchEventsAsync() {
  await delay(100);
  yield "Event 1: Connected";
  
  await delay(100);
  yield "Event 2: Data Stream Received";
  
  await delay(100);
  yield "Event 3: Closed";
}

async function runAsyncLoop() {
  // Use for await...of to consume async iterators
  for await (const event of fetchEventsAsync()) {
    console.log("[Async Generator]", event);
  }
}

runAsyncLoop();
