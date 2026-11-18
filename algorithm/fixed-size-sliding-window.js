// Problem Example: Find the maximum sum of any contiguous subarray of size k

function maxSubArraySum(arr, k) {
    if (arr.length < k) {
        return null;
    }

    let maxSum = 0;
    let windowSum = 0;

    // Compute the sum for the first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    // Slide the window forward
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i-k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

console.log(maxSubArraySum([2, 1, 5, 1, 3, 2], 3)); // 9
