const fs = require('fs');
const data = fs.readFileSync('./Day01010/data.txt', 'utf-8')
  .split('\n')
  .map(num => Number(num))
  .sort((a, b) => a - b);

// Part One - What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?

const partOne = () => {
  let oneCount = 0;
  let threeCount = 0;
  if (data[0] === 1) { oneCount++; }
  if (data[0] === 3) { threeCount++; }
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i + 1] - data[i] === 1) { oneCount++; }
    if (data[i + 1] - data[i] === 3) { threeCount++; }
  }
  return oneCount * (threeCount + 1);
}

console.log(partOne())

// Part Two - What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?

const partTwo = () => {
  const diffsFunc = (accumulator, num, i, all) => (!i ? [num] : [...accumulator, num - all[i - 1]]);
  const tribonacciSequence = [1, 2, 4, 7];
  const results = data
    .reduce(diffsFunc, [])
    .join('')
    .match(/1+/g)
    .reduce((a, { length }) => a * tribonacciSequence[length - 1], 1)
    return results;
}

console.log(partTwo())