const fs = require('fs');

const data = fs.readFileSync('./Day00110/data.txt', 'utf-8')
  .split('\n\n')
  .map(group => group.split('\n'))


// Part One - For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?
const sumCount = data.map(group => {
  return new Set(group.reduce((total, current) => total + current).split('')).size
})
.reduce((total, current) => total + current)

console.log(sumCount)

// Part Two - For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

const newCount = data.map(group => {
  if (group.length === 1) { return group[0].length; }
  const container = [];
  const seed = group[0];
  const others = group.slice(1);
  for (let i = 0; i < seed.length; i++) {
    const currentChar = seed[i];
    let foundInAll = true;
    others.forEach(str => {
      if (str.indexOf(currentChar) === -1) {
        foundInAll = false
      }
    })
    if (foundInAll === true) { container.push(currentChar); }
  }
  return container.length;
})
.reduce((total, current) => total + current)

console.log(newCount)