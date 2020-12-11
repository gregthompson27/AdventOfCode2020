const fs = require('fs');

const data = fs.readFileSync('./Day00101/data.txt', 'utf-8').split('\n');

console.log(data[0].slice(0, -2));

// slice(0, -2) to get F/B
// slice(-3) to get L/R

const getTicket = (str) => {
  const rowInfo = str.slice(0, -2);
  const colInfo = str.slice(-3);
  let rVal = 64;
  let r = 0;
  for (let i = 0; i < rowInfo.length; i++) {
    if (rowInfo[i] === 'B') {
      r += rVal;
    }
    rVal /= 2;
  }
  let cVal = 4;
  let c = 0;
  for (let i = 0; i < colInfo.length; i++) {
    if (colInfo[i] === 'R') {
      c += cVal;
    }
    cVal /= 2;
  }
  return [r, c];
};

const ticketData = data.map(ticket => getTicket(ticket));

const seatIDs = ticketData.map(ticket => ticket[0] * 8 + ticket[1]).sort((a, b) => a - b);

console.log(seatIDs[seatIDs.length - 1])

// console.log(seatIDs)


for (let i = 0; i < seatIDs.length - 1; i++) {
  if (seatIDs[i + 1] !== seatIDs[i] + 1) {
    console.log(seatIDs[i] + 1)
  }
}