const fs = require('fs');

const data = fs.readFileSync('./Day01000/data.txt', 'utf-8').split('\n');
// console.log(data);

const partOne = () => {
  const indices = [];
  let acc = 0;
  let currentLine = 0;

  while (!indices.includes(currentLine)) {
    indices.push(currentLine);
    const line = data[currentLine];
    const type = line.slice(0, line.indexOf(' '));
    const op = line.slice(line.indexOf(' ') + 1, line.indexOf(' ') + 2);
    const num = line.slice(line.indexOf(' ') + 2);
    if (type === 'acc') {
      if (op === '+') {
        acc += Number(num);
      } else {
        acc -= Number(num);
      }
      currentLine++;
    } else if (type === 'jmp') {
      if (op === '+') {
        currentLine += Number(num);
      } else {
        currentLine -= Number(num);
      }
    } else {
      currentLine++;
    }
  }
  return acc;
}

console.log(partOne())

const partTwo = () => {
  const len = data.length - 1;
  console.log(len)
  const indicesChecked = [];
  let solved = false;

  const checkData = () => {
    const newData = data.slice(0);
    let switched = false;
    const indices = [];
    let acc = 0;
    let currentLine = 0;

    const determineStep = (lineNumber) => {
      const line = newData[lineNumber];
      const type = line.slice(0, line.indexOf(' '));
      const op = line.slice(line.indexOf(' ') + 1, line.indexOf(' ') + 2);
      const num = line.slice(line.indexOf(' ') + 2);
      if (type === 'acc') {
        if (op === '+') { acc += Number(num); }
        else { acc -= Number(num); }
        currentLine++;
      }
      else if (type === 'jmp') {
        if (op === '+') { currentLine += Number(num); }
        else { currentLine -= Number(num); }
      }
      else if (type === 'nop') {
        currentLine++;
      }
    }

    while (!indices.includes(currentLine) && currentLine !== len) {
      indices.push(currentLine);
      if (!switched && !indicesChecked.includes(currentLine) && newData[currentLine].slice(0, 3) !== 'acc') {
        switched = true;
        indicesChecked.push(currentLine)
        if (newData[currentLine].slice(0, 3) === 'nop') {
          newData[currentLine] = 'jmp' + newData[currentLine].slice(3);
        } else {
          newData[currentLine] = 'nop' + newData[currentLine].slice(3);
        }
      }
      determineStep(currentLine);
    }

    if (currentLine === len) {
      console.log('FOUND SOLUTION');
      console.log(acc)
      solved = true;
    } else {
      return false;
    }
  }
  while (!solved) {
    checkData();
  }
}
partTwo()