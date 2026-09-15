// Template literals are string literals allowing embedded expressions. You can use 
// multi-line strings and string interpolation features with them

//----------------------------
// Basic string interpolation

const name = "Alice";
const age = 30;

// Variables are injected using ${...}
const greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(greeting); 
// Output: Hello, my name is Alice and I am 30 years old.

//-----------------------
// Expression evaluation

const price = 19.99;
const taxRate = 0.08;

// You can write JavaScript expressions directly inside ${...}
const total = `Total Price: $${(price * (1 + taxRate)).toFixed(2)}`;
console.log(total); 
// Output: Total Price: $21.59

//-------------------
// Multi-line string

// Template literals preserve newlines naturally without needing \n
const htmlSnippet = `
  <div>
    <h1>Welcome</h1>
    <p>This is a multi-line HTML block.</p>
  </div>
`.trim();

console.log(htmlSnippet);

//------------------
// Tagged templates

// A tag function parses template strings and their injected values
function highlightTag(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const val = values[i] !== undefined ? `[${values[i]}]` : "";
    return result + str + val;
  }, "");
}

const user = "Bob";
const role = "Admin";

const output = highlightTag`User ${user} has role ${role}.`;
console.log(output); 
// Output: User [Bob] has role [Admin].
