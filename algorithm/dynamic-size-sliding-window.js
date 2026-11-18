// Problem Example: Find the length of the smallest contiguous subarray whose sum 
// is greater than or equal to a given target

function minSubArrayLen(arr, target) {
    let left = 0;
    let currentSum = 0;
    let minLength = Infinity;

    for (let right = 0; right < arr.length; right++) {
        currentSum += arr[right];

        while (currentSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            currentSum -= arr[left];
            left++;
        }
    }

    return minLength === Infinity? 0: minLength;
}

console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // Output: 2 (subarray [4, 3])
