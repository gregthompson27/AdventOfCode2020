const fs = require('fs');

const data = fs.readFileSync('./Day00011/data.txt', 'utf-8').split('\n');

let b = data.slice(0);

for (let i = 0; i < 80; i++) {
  b = b.map((str, i) => str + data[i]);
}

let x = 0;
let count = 0;

// "Slope" values can be changed out at end of lines 15 and 16 to find different solutions
for (let i = 0; i < b.length; i += 2) {
  if (b[i][x] === '#') { count += 1 }
  x += 1;
}

console.log(259 * 64 * 65 * 59 * 35)