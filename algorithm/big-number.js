
function addLargeNumbers(num1, num2) {
    let i = num1.length - 1;
    let j = num2.length - 1;
    let carry = 0;
    const result = [];

    while (i > 0 || j > 0 || carry > 0) {
        const digit1 = i >= 0? parseInt(num1[i], 10): 0;
        const digit2 = j >= 0? parseInt(num2[j], 10): 0;
        
        const sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);
        result.push(sum % 10);

        i--;
        j--;
    }

    return result.reverse().join('');
}

// Example usage:
const numA = "123456789012345678901234567890";
const numB = "987654321098765432109876543210";

console.log(addLargeNumbers(numA, numB)); 
// Output: "1111111110111111111011111111100"
