const fs = require('fs');
const data = fs.readFileSync('./Day10/data.txt', 'utf-8')
  .split('\n')
  .sort((a, b) => a - b)
  .map(num => Number(num));

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
  return [oneCount, threeCount + 1];
}



console.log(partOne()[0] * partOne()[1])