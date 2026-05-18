/**
 * ====================================================================
 * 🚀 JAVASCRIPT UNICODE
 * ====================================================================
 * 
 * PURPOSE:
 * This script is a proof-of-concept designed to test:
 * 1. JavaScript's native support for Unicode (specifically Chinese characters)
 *    in variable and function names.
 * 
 * WHAT THIS SCRIPT DOES:
 * - Runs basic math operations using purely Chinese identifiers.
 * 
 * ====================================================================
 */

// 定义一个加法函数 (Define an addition function)
function 加法(数字一, 数字二) {
    let 结果 = 数字一 + 数字二;
    return 结果;
}

// 声明变量并赋值 (Declare variables and assign values)
let 第一个数 = 15;
let 第二个数 = 27;

// 调用函数计算结果 (Call the function to calculate the result)
let 总和 = 加法(第一个数, 第二个数);

// 输出结果到控制台 (Output the result to the console)
console.log(第一个数 + " 加 " + 第二个数 + " 等于: " + 总和); 
// 输出: 15 加 27 等于: 42
