// ==========================================
// 1. Sync Disposable Resource (Symbol.dispose)
// ==========================================
console.log("=== 1. Sync Resource Management (using) ===");

class DatabaseConnection {
  #name;

  constructor(name) {
    this.#name = name;
    console.log(`[Database] Connected to ${this.#name}`);
  }

  query(sql) {
    console.log(`[Database] Executing "${sql}" on ${this.#name}`);
  }

  // Symbol.dispose method is automatically called when scope exits
  [Symbol.dispose]() {
    console.log(`[Database] Connection to ${this.#name} CLOSED.`);
  }
}

function runDatabaseOperation() {
  // 'using' keyword binds resource lifetime to block scope
  using db = new DatabaseConnection("ProductionDB");
  db.query("SELECT * FROM users");
  
  console.log("[Database] Operation finished, leaving function scope...");
  // Connection automatically closes HERE when scope exits
}

runDatabaseOperation();


// ==========================================
// 2. Async Disposable Resource (Symbol.asyncDispose)
// ==========================================
console.log("\n=== 2. Async Resource Management (await using) ===");

class TempFile {
  #path;

  constructor(path) {
    this.#path = path;
    console.log(`[File System] Created temp file at "${this.#path}"`);
  }

  write(data) {
    console.log(`[File System] Writing "${data}" to ${this.#path}`);
  }

  // Symbol.asyncDispose supports async cleanup (e.g., closing file handles, network calls)
  async [Symbol.asyncDispose]() {
    console.log(`[File System] Cleaning up temp file "${this.#path}" asynchronously...`);
    await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate async disk cleanup
    console.log(`[File System] Temp file "${this.#path}" DELETED.`);
  }
}

async function processFileData() {
  // 'await using' ensures async cleanup is awaited before proceeding
  await using temp = new TempFile("/tmp/session_data.tmp");
  temp.write("Session Token: 987654");
  
  console.log("[File System] File processing complete, leaving scope...");
  // Cleanup automatically awaited HERE when scope exits
}

await processFileData();


// ==========================================
// 3. Managing Multiple Resources (DisposableStack)
// ==========================================
console.log("\n=== 3. DisposableStack (Aggregating Resources) ===");

function executeMultiResourceTask() {
  // DisposableStack allows dynamic accumulation of cleanup tasks
  using stack = new DisposableStack();

  // Register an existing disposable resource
  const db = stack.use(new DatabaseConnection("AnalyticsDB"));
  db.query("SELECT COUNT(*) FROM logs");

  // Register arbitrary cleanup callbacks via defer()
  stack.defer(() => {
    console.log("[Custom Cleanup] Releasing temporary locks...");
  });

  stack.defer(() => {
    console.log("[Custom Cleanup] Flushing memory buffer...");
  });

  console.log("[Multi-Task] Work complete inside function...");
  // Cleanup triggers in REVERSE order of registration (LIFO):
  // 1. Flushing memory buffer
  // 2. Releasing temporary locks
  // 3. Database Connection CLOSED
}

executeMultiResourceTask();


// ==========================================
// 4. Exception Handling & Scope Safety
// ==========================================
console.log("\n=== 4. Automatic Disposal On Error ===");

function ErrorProneFunction() {
  try {
    using res = new DatabaseConnection("FaultyDB");
    console.log("[Error Demo] Throwing an error intentionally...");
    throw new Error("Unexpected database failure!");
  } catch (err) {
    console.error(`[Error Caught]: ${err.message}`);
  }
  // Even though an error was thrown, DatabaseConnection[Symbol.dispose]() ran
  // BEFORE entering the catch block!
}

ErrorProneFunction();
