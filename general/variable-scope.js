/*
 *  🚀 JAVASCRIPT VARIABLE SCOPE
 * 
 *  PURPOSE:
 *    This script is a proof-of-concept designed to test: The behavioral differences 
 *    between 'let' (block-scoped) and 'var' (function-scoped) variables during execution
 * 
 *  WHAT THIS SCRIPT DOES:
 *  - Intentionally triggers block-level scope boundaries to demonstrate 
 *    how 'let' protects variables from leaking, while 'var' does not
 * 
 *  - Uses try/catch blocks to gracefully catch and display scoping errors
 *    without crashing the entire program
 * 
 */

function testScope() {

    console.log("--- 1. Hoisting Behavior ---");

    try {
        console.log("var x before assignment:", x); // Outputs: undefined (hoisted)

    } catch (e) {
        console.log("var x error:", e.message);
    }

    try {
        // This will throw an error because let is not initialized (Temporal Dead Zone)
        console.log("let y before assignment:", y); 

    } catch (e) {
        console.log("let y error:", e.message); // Outputs: Cannot access 'y' before initialization
    }

    var x = "I am a var variable";
    let y = "I am a let variable";

    console.log("\n--- 2. Block Scope Behavior ---");
    if (true) {
        var blockVar = "Visible outside this block";
        let blockLet = "Hidden outside this block";
        
        console.log("Inside block (var):", blockVar);
        console.log("Inside block (let):", blockLet);
    }

    // Testing visibility outside the block
    console.log("Outside block (var):", blockVar); // Works! var is function-scoped
    
    try {
        console.log("Outside block (let):", blockLet); 
        
    } catch (e) {
        console.log("Outside block (let) error:", e.message); // ReferenceError: blockLet is not defined
    }
}

testScope();
