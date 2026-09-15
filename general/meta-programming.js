// ==========================================
// 1. Basic Proxy: Intercepting & Validating Properties
// ==========================================
console.log("=== 1. Proxy (Get & Set Traps) ===");

const userTarget = {
  firstName: "Jane",
  lastName: "Doe",
  _secretKey: "xyz123",
  age: 28
};

// Handler defines interceptor traps for the target object
const userHandler = {
  // Property Read Trap (get)
  get(target, prop, receiver) {
    // Intercept access to "private" properties starting with '_'
    if (typeof prop === "string" && prop.startsWith("_")) {
      console.warn(`[Access Denied] Cannot read private property "${prop}"`);
      return undefined;
    }

    // Dynamic virtual property creation
    if (prop === "fullName") {
      return `${target.firstName} ${target.lastName}`;
    }

    // Default delegation via Reflect
    return Reflect.get(target, prop, receiver);
  },

  // Property Write Trap (set)
  set(target, prop, value, receiver) {
    if (prop === "age") {
      if (typeof value !== "number" || value < 0) {
        throw new TypeError("Age must be a positive number.");
      }
    }

    console.log(`[Property Set] Changing "${prop}" from ${target[prop]} to ${value}`);
    // Reflect.set applies default internal property assignment behavior
    return Reflect.set(target, prop, value, receiver);
  },

  // Property Deletion Trap (deleteProperty)
  deleteProperty(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error(`Cannot delete private property "${prop}"`);
    }
    return Reflect.deleteProperty(target, prop);
  }
};

const userProxy = new Proxy(userTarget, userHandler);

console.log("Full name (Virtual Prop):", userProxy.fullName); // "Jane Doe"
console.log("Reading private prop:", userProxy._secretKey);   // Warns + undefined

userProxy.age = 29; // Logs property update
console.log("Updated Age:", userProxy.age); // 29


// ==========================================
// 2. Function Proxies: Intercepting Function Execution
// ==========================================
console.log("\n=== 2. Function Call Traps (apply & construct) ===");

function rawCalculator(a, b) {
  return a * b;
}

const functionHandler = {
  // Trap for function invocation ()
  apply(target, thisArg, argumentsList) {
    console.log(`[Function Call] Calling ${target.name} with args:`, argumentsList);
    const result = Reflect.apply(target, thisArg, argumentsList);
    console.log(`[Function Result]: ${result}`);
    return result;
  }
};

const proxiedCalc = new Proxy(rawCalculator, functionHandler);
proxiedCalc(6, 7); // Logs execution details and returns 42


// ==========================================
// 3. Revocable Proxies
// ==========================================
console.log("\n=== 3. Revocable Proxies ===");

const sensitiveData = { apiToken: "Bearer token_abc123" };

// Creates a proxy that can be permanently deactivated/invalidated
const { proxy: revocableProxy, revoke } = Proxy.revocable(sensitiveData, {
  get(target, prop) {
    return target[prop];
  }
});

console.log("Access before revocation:", revocableProxy.apiToken);

// Revoke proxy access permanently
revoke();

try {
  console.log(revocableProxy.apiToken); // Throws TypeError
} catch (err) {
  console.error("[Proxy Revoked]:", err.message);
}


// ==========================================
// 4. Well-Known Symbols (Customizing Engine Behavior)
// ==========================================
console.log("\n=== 4. Well-Known Symbols ===");

class CustomCollection {
  #items = [];

  constructor(...items) {
    this.#items = items;
  }

  // 4a. Symbol.iterator: Custom iteration protocol
  *[Symbol.iterator]() {
    for (const item of this.#items) {
      yield item.toUpperCase();
    }
  }

  // 4b. Symbol.toPrimitive: Intercept type conversions (String, Number, Default)
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.#items.length;
    }
    if (hint === "string") {
      return `[Collection of ${this.#items.length} items]`;
    }
    return this.#items.join(", ");
  }

  // 4c. Symbol.toStringTag: Customize Object.prototype.toString output
  get [Symbol.toStringTag]() {
    return "CustomCollection";
  }
}

const list = new CustomCollection("apple", "banana", "cherry");

// Iteration using custom Symbol.iterator
console.log("Iterating collection (upper-cased):", [...list]); // ["APPLE", "BANANA", "CHERRY"]

// Custom type coercion via Symbol.toPrimitive
console.log("Coercion to Number (+list):", +list);             // 3
console.log("Coercion to String (`${list}`):", `${list}`);     // "[Collection of 3 items]"

// Custom String tag via Symbol.toStringTag
console.log("Object tag:", Object.prototype.toString.call(list)); // "[object CustomCollection]"
