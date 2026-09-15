// ==========================================
// 1. Creation, Initializers & Dynamic Keys
// ==========================================
console.log("=== 1. Creation & Computed Property Names ===");

const keyPrefix = "user_";
const dynamicId = 1042;

// Object literal with shorthand syntax & computed keys
const person = {
  name: "Alex",
  age: 28,
  // Computed property name using []
  [`${keyPrefix}${dynamicId}`]: "Active Member",
  // Method shorthand syntax
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};

console.log(person.greet());
console.log("Dynamic key lookup:", person["user_1042"]);


// ==========================================
// 2. Constructor Functions & Prototyping
// ==========================================
console.log("\n=== 2. Constructors & Prototype Chain ===");

// Constructor function definition
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

// Adding a shared method to the constructor's prototype
Car.prototype.getDetails = function() {
  return `${this.year} ${this.make} ${this.model}`;
};

const myCar = new Car("Toyota", "Corolla", 2024);
console.log("Car details via prototype:", myCar.getDetails());


// ==========================================
// 3. Object.create() for Prototypal Inheritance
// ==========================================
console.log("\n=== 3. Object.create() Prototypal Chain ===");

// Base animal object
const animal = {
  isAlive: true,
  speak() {
    console.log(`${this.type} makes a sound.`);
  }
};

// Create a new object inheriting directly from 'animal'
const dog = Object.create(animal);
dog.type = "Dog";
dog.bark = function() {
  console.log("Woof!");
};

dog.speak(); // Delegates up prototype chain to animal.speak()
dog.bark();  // Own property method


// ==========================================
// 4. Getters and Setters
// ==========================================
console.log("\n=== 4. Getters & Setters ===");

const account = {
  owner: "Sam",
  _balance: 1000,

  // Getter
  get balance() {
    return `$${this._balance.toFixed(2)}`;
  },

  // Setter
  set deposit(amount) {
    if (amount > 0) {
      this._balance += amount;
    } else {
      console.log("Deposit amount must be positive.");
    }
  }
};

console.log("Initial Balance:", account.balance); // $1000.00
account.deposit = 500;                            // Triggers setter
console.log("Updated Balance:", account.balance); // $1500.00


// ==========================================
// 5. Enumerating Object Properties
// ==========================================
console.log("\n=== 5. Enumerating Properties ===");

const laptop = {
  brand: "Dell",
  cpu: "i7",
  ram: "16GB"
};

// Object.keys() -> Array of own enumerable property names
console.log("Object.keys():", Object.keys(laptop)); 

// Object.values() -> Array of own property values
console.log("Object.values():", Object.values(laptop)); 

// Object.entries() -> Array of [key, value] pairs
console.log("Object.entries():");
for (const [key, value] of Object.entries(laptop)) {
  console.log(`  ${key}: ${value}`);
}


// ==========================================
// 6. Property Deletion vs Undefined
// ==========================================
console.log("\n=== 6. Deleting Properties ===");

const config = { host: "localhost", port: 8080 };

delete config.port; // Completely removes the key 'port'

console.log("Port property exists?", "port" in config); // false
console.log("Config keys after delete:", Object.keys(config)); // ["host"]
