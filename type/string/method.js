//---------------------------------------------
// Querying methods (Getting characters/codes)

const text = "JavaScript";

console.log(text.charAt(4));      // "S" (Returns character at specified index)
console.log(text.at(-1));         // "t" (Supports negative indexing from the end)
console.log(text.charCodeAt(0));  // 74 (UTF-16 code unit of 'J')
console.log(text.codePointAt(0)); // 74 (Full Unicode code point)

//----------------------------------------
// Searching methods (Finding substrings)

const sentence = "The quick brown fox jumps over the lazy dog.";

console.log(sentence.indexOf("fox"));      // 16 (First occurrence index)
console.log(sentence.lastIndexOf("the"));  // 31 (Last occurrence index)
console.log(sentence.includes("quick"));   // true (Checks if substring exists)
console.log(sentence.startsWith("The"));   // true (Checks prefix)
console.log(sentence.endsWith("dog."));    // true (Checks suffix)

//----------------------------------
// Transforming & modifying methods

const messyString = "   Hello, World!   ";

// Case conversion
console.log("hello".toUpperCase());       // "HELLO"
console.log("HELLO".toLowerCase());       // "hello"

// Trimming whitespace
console.log(`"${messyString.trim()}"`);          // "Hello, World!"
console.log(`"${messyString.trimStart()}"`);     // "Hello, World!   "

// Substrings and slicing
const word = "Developer";
console.log(word.slice(0, 4));            // "Deve" (Extracts section)
console.log(word.substring(1, 4));        // "eve"

// Replacing text
const replaced = "Cat in the hat".replace("Cat", "Dog");
console.log(replaced);                    // "Dog in the hat"

// Splitting into an array
const csv = "apple,banana,orange";
console.log(csv.split(","));              // [ 'apple', 'banana', 'orange' ]
