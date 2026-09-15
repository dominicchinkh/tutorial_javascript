// ==========================================
// 1. Base Class, Constructor & Private Fields
// ==========================================
console.log("=== 1. Class Declarations & Encapsulation ===");

class BankAccount {
  // Public field
  owner;

  // Private field (prefixed with #) - cannot be accessed outside this class
  #balance = 0;

  // Static private field (shared across all instances internally)
  static #accountCount = 0;

  constructor(owner, initialDeposit = 0) {
    this.owner = owner;
    this.#balance = initialDeposit;
    BankAccount.#accountCount++;
  }

  // Getter for private field
  get balance() {
    return `$${this.#balance.toFixed(2)}`;
  }

  // Public method modifying private state
  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
    return this.#balance;
  }

  // Private method (prefixed with #)
  #verifyFunds(amount) {
    return this.#balance >= amount;
  }

  withdraw(amount) {
    if (!this.#verifyFunds(amount)) {
      console.log(`[Denied] Insufficient funds for ${this.owner}`);
      return false;
    }
    this.#balance -= amount;
    return true;
  }

  // Static method (called on the class itself, not instances)
  static get totalAccountsCreated() {
    return BankAccount.#accountCount;
  }
}

const aliceAcc = new BankAccount("Alice", 100);
aliceAcc.deposit(50);
console.log(`${aliceAcc.owner}'s balance:`, aliceAcc.balance); // "$150.00"

// Attempting to withdraw
aliceAcc.withdraw(200); // Denied message
console.log("Total accounts:", BankAccount.totalAccountsCreated); // 1


// ==========================================
// 2. Inheritance with `extends` & `super`
// ==========================================
console.log("\n=== 2. Inheritance & Super Calls ===");

// Derived class / Subclass
class SavingsAccount extends BankAccount {
  #interestRate;

  constructor(owner, initialDeposit, interestRate = 0.05) {
    // Calling the parent constructor via super()
    super(owner, initialDeposit);
    this.#interestRate = interestRate;
  }

  // Method overriding
  deposit(amount) {
    // Call parent class deposit method first
    super.deposit(amount);
    console.log(`[Savings] Deposited ${amount} to ${this.owner}'s account.`);
  }

  // New subclass method
  applyInterest() {
    // Read parent balance via the public getter
    const currentNumBalance = parseFloat(this.balance.replace("$", ""));
    const interest = currentNumBalance * this.#interestRate;
    this.deposit(interest);
    console.log(`Applied interest: $${interest.toFixed(2)}`);
  }
}

const bobSavings = new SavingsAccount("Bob", 500, 0.03);
bobSavings.applyInterest();
console.log(`${bobSavings.owner}'s updated savings:`, bobSavings.balance);


// ==========================================
// 3. Static Initialization Blocks
// ==========================================
console.log("\n=== 3. Static Initialization Blocks ===");

class AppConfig {
  static environment;
  static apiEndpoint;

  // Static block executes once when the class is evaluated/loaded
  static {
    const isProduction = true; // Simulated environment check
    this.environment = isProduction ? "production" : "development";
    this.apiEndpoint = isProduction 
      ? "https://api.example.com/v1" 
      : "http://localhost:3000";
  }
}

console.log("Config Environment:", AppConfig.environment);
console.log("Config API Endpoint:", AppConfig.apiEndpoint);


// ==========================================
// 4. Checking Instance Types
// ==========================================
console.log("\n=== 4. Type Checking (instanceof) ===");

console.log("Is bobSavings an instance of SavingsAccount?", bobSavings instanceof SavingsAccount); // true
console.log("Is bobSavings an instance of BankAccount?", bobSavings instanceof BankAccount);       // true
