//------------------------
// Variable as a Key Name

const dynamicKey = "role";
const userValue = "Admin";

const user = {
  name: "Alex",
  // JavaScript evaluates the expression inside [] to use its value as the key
  [dynamicKey]: userValue 
};

console.log("--- Basic Computed Property ---");
console.log(user); // { name: 'Alex', role: 'Admin' }
console.log(user.role); // 'Admin'

//--------------------------------------------------
// Runtime expressions: String Concatenation & Math

// You aren't limited to single variables; you can execute full expressions

const prefix = "api_";
let idCounter = 1;

const apiResponse = {
  [prefix + "version"]: "v2.1",
  [prefix + "status"]: "success",
  [`id_${idCounter++}`]: "First Record",  // Math/Increments work too!
  [`id_${idCounter}`]: "Second Record"
};

console.log("\n--- Runtime Expressions ---");
console.log(apiResponse);

/* 
 *  Outputs:
 *  { 
 *    api_version: 'v2.1', 
 *    api_status: 'success', 
 *    id_1: 'First Record', 
 *    id_2: 'Second Record' 
 *  }
 */

//--------------------------------------------------
// Real World React use case: Dynamic Form Handlers

// This is the most common place you'll see this in modern React. Instead of writing
// 3 separate functions for 3 input fields, you write ONE

let formState = {
  username: "",
  email: "",
  password: ""
};

// A single function to update ANY field based on HTML input attributes
function handleInputChange(fieldName, value) {
  formState = {
    ...formState,
    [fieldName]: value // Dynamically updates username, email, or password
  };
}

// Simulating a user typing into different fields
handleInputChange("username", "dev_alex");
handleInputChange("email", "alex@example.com");

console.log("\n--- Real World Form Handling ---");
console.log("Updated Form State:", formState);

/* 
 *  Outputs:
 *  { username: 'dev_alex', email: 'alex@example.com', password: '' }
 */

//-----------------------------------
// Using Functions & Symbols as Keys

const getKeyName = () => "generated_" + Math.floor(Math.random() * 100);

// You can even use unique Symbols to avoid key collisions entirely
const secretSymbol = Symbol("uniqueKey");

const advancedObj = {
  [getKeyName()]: "Randomly Generated Key",
  [secretSymbol]: "This is a hidden symbol property"
};

console.log("\n--- Advanced Key Evaluation ---");
console.log(advancedObj); 
console.log("Accessing Symbol property:", advancedObj[secretSymbol]); // "This is a hidden symbol property"
