const fs = require('fs');
const data = fs.readFileSync('./Day10000/data.txt', 'utf-8').split('\n\n');

const validation = data[0]
  .split('\n')
  .map(line => line
    .slice(line.indexOf(':') + 2)
    .split(' or ')
    .map(range => range
      .split('-')
      .map(n => Number(n))))
  .flat(1);

const myTicket = data[1]
  .slice(data[1]
  .indexOf('\n') + 1)
  .split(',')
  .map(n => Number(n));

const others = data[2]
  .split('\n')
  .slice(1)
  .map(line => line.split(',').map(n => Number(n)));

const valids = [];
validation.forEach(set => {
  for (let n = set[0]; n <= set[1]; n++) {
    valids.push(n);
  }
})
const uniqueValids = Array.from(new Set(valids)).sort((a, b) => a - b);

// Part One - Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?

const partOne = () => {
  const res = [];
  others.forEach(ids => {
    ids.forEach(id => {
      if (!uniqueValids.includes(id)) { res.push(id); }
    })
  });
  return res.reduce((sum, current) => sum + current);
};

console.log(partOne());