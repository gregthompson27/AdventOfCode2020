const fs = require('fs');

const data = fs.readFileSync('./Day01001/data.txt', 'utf-8').split('\n').map(num => Number(num));

// Part One - The first step of attacking the weakness in the XMAS data is to find the first number in the list (after the preamble) which is not the sum of two of the 25 numbers before it. 

// What is the first number that does not have this property?

const partOne = () => {
  let found = false;
  let index = 25;

  // function to check if previous 25 values can sum to a given value in any combination
  const checkPrevious = (arr, val) => {
    let foundPair = false;
    for (let i = 0; i < arr.length && !foundPair; i++) {
      const current = arr[i];
      const diff = val - current;
      if (arr.includes(diff) && diff !== val) {
        foundPair = true;
      }
    }
    return foundPair;
  }
  while (!found) {
    const lookingFor = data[index]
    const previous25 = data.slice(index - 25, index);
    const check = checkPrevious(previous25, lookingFor);
    // if check comes back false, we have found the index/value that breaks the chain, and can return the value at that index
    if (!check) {
      found = true;
    }
    index++;
  }
  return data[index - 1];
}
const sol = partOne()

// Part Two - To find the encryption weakness, add together (NOT "take the difference between", you big dummy) the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

// What is the encryption weakness in your XMAS-encrypted list of numbers?

const partTwo = () => {
  for (let i = 0; i < data.length; i++) {
    const currentFirst = data[i];
    let sum = currentFirst;
    for (let j = i + 1; j < data.length && sum < sol; j++) {
      sum += data[j];
      if (sum === sol) {
        const solArray = data.slice(i, j + 1);
        return Math.max(...solArray) + Math.min(...solArray);
      }
    }
  }
}

console.log(sol)
console.log(partTwo())