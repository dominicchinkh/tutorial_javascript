// Helper utility to simulate async operations like fetching data or timers
const delay = (ms, value, shouldReject = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(`Operation failed after ${ms}ms`));
      } else {
        resolve(value);
      }
    }, ms);
  });
};


// ==========================================
// 1. Basic Promise Creation & State Changes
// ==========================================
console.log("=== 1. Basic Promise Creation ===");

const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Data retrieved successfully!");
  } else {
    reject(new Error("Failed to fetch data"));
  }
});

myPromise
  .then((data) => console.log("Fulfilled:", data))
  .catch((err) => console.error("Rejected:", err.message));


// ==========================================
// 2. Promise Chaining & Error Propagation
// ==========================================
console.log("\n=== 2. Promise Chaining & Error Handler ===");

// Note: flatten the nested chain into a single chain, which is simpler and makes 
//       error handling easier

delay(100, 10)
  .then((num) => {
    console.log("Step 1: Initial number is", num);
    return num * 2; // Returning a value passes it to the next .then()
  })
  .then((num) => {
    console.log("Step 2: Doubled number is", num);

    // Note: It is important to always return promises from then callbacks, even if 
    //       the promise always resolves to undefined. If the previous handler started 
    //       a promise but did not return it, there's no way to track its settlement 
    //       anymore, and the promise is said to be "floating"

    // Returning a new promise chains async steps seamlessly
    return delay(100, num + 5); 
  })
  .then((num) => {
    console.log("Step 3: Added 5 asynchronously, result is", num);
    // Intentional error to demonstrate .catch() short-circuiting
    throw new Error("Something went wrong in Step 4");
  })
  .then(() => {
    console.log("This step will be skipped due to the error above.");
  })
  .catch((error) => {
    console.error("Caught in chain:", error.message);
  })
  .finally(() => {
    console.log("Chain completed (finally block always runs).");
  });


// ==========================================
// 3. Modern Async / Await Syntax
// ==========================================
console.log("\n=== 3. Async / Await with Try / Catch ===");

// Note: await within one async function does not stop the entire program, only the 
//       parts that depend on its value, so other async jobs can still run while the 
//       await is pending

async function fetchUserData() {
  try {
    console.log("Fetching user profile...");
    const user = await delay(150, { id: 1042, name: "Alex" });
    console.log("User fetched:", user.name);

    console.log("Fetching user posts...");
    const posts = await delay(150, ["Post 1", "Post 2"]);
    console.log("Posts fetched:", posts.length, "posts found");

    return { user, posts };
  } catch (error) {
    console.error("Async/Await Error:", error.message);
  } finally {
    console.log("Async operation cleanup completed.");
  }
}

fetchUserData();


// ==========================================
// 4. Promise Combinators / Concurrency Methods
// ==========================================
// Wait a short moment to let previous logs clear in output
setTimeout(async () => {
  console.log("\n=== 4. Promise Concurrency Utilities ===");

  // A. Promise.all() - Fails fast if ANY promise rejects
  try {
    const results = await Promise.all([
      delay(100, "Result A"),
      delay(200, "Result B"),
      delay(150, "Result C")
    ]);
    console.log("Promise.all (all succeeded):", results);
  } catch (err) {
    console.error("Promise.all failed:", err.message);
  }

  // B. Promise.allSettled() - Waits for all to finish, never rejects
  const settledResults = await Promise.allSettled([
    delay(100, "Success Task"),
    delay(150, "Failed Task", true) // rejects
  ]);
  console.log("Promise.allSettled output:", settledResults);

  // C. Promise.race() - Settles as soon as the FIRST promise settles (resolves OR rejects)
  const fastestOutcome = await Promise.race([
    delay(300, "Slow"),
    delay(80, "Fast")
  ]);
  console.log("Promise.race winner:", fastestOutcome); // "Fast"

  // D. Promise.any() - Resolves as soon as the FIRST promise RESOLVES (ignores rejections)
  try {
    const firstSuccess = await Promise.any([
      delay(100, "Failed fast", true),
      delay(200, "Slower success"),
      delay(300, "Slowest success")
    ]);
    console.log("Promise.any first fulfilled value:", firstSuccess); // "Slower success"
  } catch (aggregateError) {
    console.error("Promise.any: All promises failed", aggregateError.errors);
  }
}, 600);
