// ==========================================
// 1. Currency & Number Formatting (Intl.NumberFormat)
// ==========================================
console.log("=== 1. Number & Currency Formatting ===");

const amount = 1234567.89;

// US Dollar formatting
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
console.log("US (USD):", usdFormatter.format(amount)); // $1,234,567.89

// Euro (German locale) formatting
const eurFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});
console.log("Germany (EUR):", eurFormatter.format(amount)); // 1.234.567,89 €

// Compact unit formatting (e.g., social media counts)
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});
console.log("Compact count:", compactFormatter.format(amount)); // 1.2M


// ==========================================
// 2. Date & Time Formatting (Intl.DateTimeFormat)
// ==========================================
console.log("\n=== 2. Date & Time Formatting ===");

const date = new Date("2026-09-09T16:15:00Z");

// Full date formatting in Japanese (Gregorian with Japanese conventions)
const jpDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "full",
  timeStyle: "medium",
  timeZone: "Asia/Tokyo",
});
console.log("Japan Full Date:", jpDateFormatter.format(date)); 
// 2026年9月10日木曜日 1:15:00

// Formatting date components into parts for custom rendering
const partsFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const parts = partsFormatter.formatToParts(date);
console.log("Date Parts Array:", parts);


// ==========================================
// 3. Relative Time Formatting (Intl.RelativeTimeFormat)
// ==========================================
console.log("\n=== 3. Relative Time Formatting ===");

const rtfEn = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const rtfEs = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

console.log("English (-1 day):", rtfEn.format(-1, "day"));   // "yesterday"
console.log("Spanish (-1 day):", rtfEs.format(-1, "day"));   // "ayer"
console.log("English (+3 hours):", rtfEn.format(3, "hour"));  // "in 3 hours"


// ==========================================
// 4. List Formatting (Intl.ListFormat)
// ==========================================
console.log("\n=== 4. List Formatting ===");

const vehicles = ["cars", "motorcycles", "bicycles"];

// Conjunction ("and") in English
const englishList = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
console.log("English Conjunction:", englishList.format(vehicles)); // "cars, motorcycles, and bicycles"

// Disjunction ("or") in French
const frenchList = new Intl.ListFormat("fr", { style: "long", type: "disjunction" });
console.log("French Disjunction:", frenchList.format(vehicles));  // "cars, motorcycles ou bicycles"


// ==========================================
// 5. String Collation & Sorting (Intl.Collator)
// ==========================================
console.log("\n=== 5. String Collation (Locale-Aware Sorting) ===");

const GermanNames = ["Zoe", "Änne", "Ben", "Ömer"];

// Standard JS sort uses UTF-16 code unit values
console.log("Default Array.sort():", [...GermanNames].sort()); 
// ["Ben", "Zoe", "Änne", "Ömer"] (Incorrect for German alphabetical sorting)

// German collator sorting
const germanCollator = new Intl.Collator("de-DE");
console.log("German Collator sort:", [...GermanNames].sort(germanCollator.compare));
// ["Änne", "Ben", "Ömer", "Zoe"]


// ==========================================
// 6. Text Segmentation (Intl.Segmenter)
// ==========================================
console.log("\n=== 6. Text Segmentation (Graphemes & Words) ===");

// Handles complex emoji grapheme clusters correctly
const text = "Family: 👨‍👩‍👧‍👦!";
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

const graphemes = Array.from(segmenter.segment(text), (s) => s.segment);
console.log("Character length (.length):", text.length); // 20 (UTF-16 code units)
console.log("Grapheme count (Intl.Segmenter):", graphemes.length); // 10
console.log("Extracted graphemes:", graphemes);
