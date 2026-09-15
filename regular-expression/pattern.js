// ==========================================
// 1. Creating Regular Expressions & Escaping
// ==========================================
console.log("=== 1. Creation & Escaping ===");

// Literal notation (compiled at script load time)
const literalRegex = /ab+c/i;

// Constructor (compiled at runtime, useful for dynamic inputs)
const dynamicPattern = "ab+c";
const constructorRegex = new RegExp(dynamicPattern, "i");

// Escaping special characters safely using RegExp.escape()
const rawUserInput = "Price: $10.00 (tax included)";
const escapedInput = RegExp.escape ? RegExp.escape(rawUserInput) : rawUserInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const exactMatchRegex = new RegExp(escapedInput);

console.log("Literal test:", literalRegex.test("abbbc")); // true
console.log("Exact escaped match:", exactMatchRegex.test("Price: $10.00 (tax included)")); // true


// ==========================================
// 2. Matching, Capturing Groups & Named Groups
// ==========================================
console.log("\n=== 2. Capturing Groups & Matching ===");

const logLine = "2026-09-01 [ERROR] User 1042 failed authentication";

// Using Named Capturing Groups (?<name>pattern)
const logParser = /(?<date>\d{4}-\d{2}-\d{2})\s+\[(?<level>[A-Z]+)\]\s+(?<message>.+)/;
const matchResult = logParser.exec(logLine);

if (matchResult) {
  console.log("Full match:", matchResult[0]);
  console.log("Captured groups object:", matchResult.groups);
  console.log(`Extracted Level: ${matchResult.groups.level}`);
  console.log(`Extracted Message: ${matchResult.groups.message}`);
}


// ==========================================
// 3. Iterating Global Matches with matchAll()
// ==========================================
console.log("\n=== 3. Global Iteration (matchAll) ===");

const htmlSnippet = `<a href="https://mdn.io">MDN</a> and <a href="https://ecma-international.org">TC39</a>`;
const linkRegex = /<a href="(?<url>[^"]+)">(?<text>[^<]+)<\/a>/g;

// matchAll returns an iterator containing submatches and capture groups
for (const match of htmlSnippet.matchAll(linkRegex)) {
  console.log(`Link Text: "${match.groups.text}" -> URL: ${match.groups.url}`);
}


// ==========================================
// 4. Advanced Searching Flags (g, y, m, s)
// ==========================================
console.log("\n=== 4. Flags: Sticky (y) and Multiline (m) ===");

// Sticky flag (y): Matches exact position indicated by lastIndex
const str = "foo_bar_baz";
const stickyRegex = /\w+/y;

stickyRegex.lastIndex = 4; // Start matching at index 4 ('bar_baz')
const stickyMatch = stickyRegex.exec(str);
console.log(`Sticky match at index 4: "${stickyMatch[0]}"`); // "bar_baz"

// Note: In JavaScript regex, \w (word character) matches letters (A-Z, a-z), digits 
// (0-9), and underscores (_)

// Multiline flag (m): ^ and $ match line boundaries, not just string start/end
const multiLineStr = "First Line\nSecond Line\nThird Line";
const lineStartRegex = /^(\w+)/gm;

const firstWords = Array.from(multiLineStr.matchAll(lineStartRegex), m => m[1]);
console.log("First word of each line:", firstWords); // ["First", "Second", "Third"]


// ==========================================
// 5. Lookahead and Lookbehind Assertions
// ==========================================
console.log("\n=== 5. Assertions (Lookaround) ===");

const priceText = "1 Apple costs $2.50, 1 Orange costs €3.00, and a banana is 50c.";

// Positive Lookbehind (?<=...) and Positive Lookahead (?=...)
// Match numbers only if preceded by $ or €
const currencyAmountRegex = /(?<=[$€])\d+\.\d{2}/g;
console.log("Currency amounts found:", priceText.match(currencyAmountRegex)); // ["2.50", "3.00"]

// Negative Lookahead (?!...)
// Match numbers NOT followed by "c" (cents) or a currency symbol
const plainNumberRegex = /\b\d+\b(?!c)/g;
console.log("Standalone counts:", priceText.match(plainNumberRegex)); // ["1", "1"]


// ==========================================
// 6. Replacement with Replacer Function
// ==========================================
console.log("\n=== 6. Dynamic String Replacement ===");

const rawText = "Contact us at support@example.com or sales@company.org.";
const emailRegex = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

// Obfuscate emails by masking the username
const obfuscatedText = rawText.replace(emailRegex, (match, user, domain) => {
  const maskedUser = user[0] + "***" + user[user.length - 1];
  return `${maskedUser}@${domain}`;
});

console.log("Original:", rawText);
console.log("Obfuscated:", obfuscatedText);
