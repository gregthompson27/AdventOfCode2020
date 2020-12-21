const fs = require('fs');

const data = fs.readFileSync('./Day01011/data.txt', 'utf-8').split('\n');

// General Function for changing entire seating map at once

const changeMap = map => {
  const newMap = [];
  for (let i = 0; i < map.length; i++) {
    console.log('starting a new row now');
    newMap.push([]);
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '.') { newMap[i].push('.'); }
      else {
        const surrounding = [];
        if (i === 0) {
          surrounding.push('.');
          surrounding.push('.');
          surrounding.push('.');
        } else {
          surrounding.push(map[i - 1][j - 1]);
          surrounding.push(map[i - 1][j]);
          surrounding.push(map[i - 1][j + 1]);
        }
        surrounding.push(map[i][j - 1]);
        surrounding.push(map[i][j + 1]);
        if (i === map.length - 1) {
          surrounding.push('.');
          surrounding.push('.');
          surrounding.push('.');
        } else {
          surrounding.push(map[i + 1][j - 1]);
          surrounding.push(map[i + 1][j]);
          surrounding.push(map[i + 1][j + 1]);
        }
        const empties = surrounding.filter(type => type === 'L' || type === '.' || type === undefined).length
        // empty seat (L) and 8 surrounding empty seats, change to occupied seat (#)
        if (map[i][j] === 'L' && empties === 8) {
          newMap[i].push('#');
        } else if (map[i][j] === '#' && empties <= 4) {
          newMap[i].push('L');
        } else {
          newMap[i].push(map[i][j]);
        }
      }
    } 
  }
  return newMap;
}

const changeMapAdvanced = map => {
  const newMap = [];
  const height = map.length;
  const width = map[0].length;
  for (let i = 0; i < map.length; i++) {
    newMap.push([]);
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '.') { newMap[i].push('.'); }
      else {
        const surrounding = {};
  
        // set right
        const right = map[i].slice(j + 1);
        if (!right || !right.contains('#')) { surrounding.r = '.'; }
        else { surrounding.r = '#'; }
  
        // set left
        const left = map[i].slice(0, j);
        if (!left || !left.contains('#')) { surrounding.l = '.'; }
        else { surrounding.l = '#'; }
  
        // set top
        let above = [];
        for (let x = 0; x < i; x++) {
          above.push(map[x][j])
        }
        if (!above.contains('#')) { surrounding.t = '.'; }
        else { surrounding.t = '#'; }
  
        // set bottom
        let below = [];
        for (let x = i + 1; x < map.length; x++) {
          below.push(map[x][j]);
        }
        if (!below.contains('#')) { surrounding.b = '.'; }
        else { surrounding.b = '#'; }
  
        // set top left
        let topLeft = [];
        for (let x = 1; i - x >= 0 && j - x >= 0; x++) {
          topLeft.push(map[i - x][j - x]);
        }
        if (!topLeft.contains('#')) { surrounding.tl = '.'; }
        else { surrounding.tl = '#'; }
  
        // set top right
        let topRight = [];
        for (let x = 1; i - x >= 0 && j + x < width; x++) {
          topRight.push(map[i - x][j + x]);
        }
        if (!topRight.contains('#')) { surrounding.tr = '.'; }
        else { surrounding.tr = '#'; }
  
        // set bot left
        let botLeft = [];
        for (let x = 1; i + x < height && j - x >= 0; x++) {
          botLeft.push(map[i + x][j - x]);
        }
        if (!botLeft.contains('#')) { surrounding.bl = '.'; }
        else { surrounding.bl = '#'; }
  
        // set bot right
        let botRight = [];
        for (let x = 1; i + x < height && j + x < width; x++) {
          botRight.push(map[i + x][j + x]);
        }
        if (!botRight.contains('#')) { surrounding.br = '.'; }
        else { surrounding.br = '#'; }
  
        const occupiedCount = Object.keys(surrounding).filter(key => key === '#').length;

        if (map[i][j] === 'L' && occupiedCount === 0) {
          newMap[i].push('#');
        } else if (map[i][j] === '#' && occupiedCount )
      }

    }
  }
}

// Part One - Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?

const partOne = () => {
  let equalized = false;
  let currentMap = data.slice(0);
  while (!equalized) {
    // console.log('changing seating chart again');
    const newMap = changeMap(currentMap)
    if (JSON.stringify(newMap) === JSON.stringify(currentMap)) {
      equalized = true;
      // console.log('finally equalized!: ', currentMap);
    }
    currentMap = newMap;
  }
  return currentMap.map(row => row.filter(seat => seat === '#')).reduce((total, current) => total + current.length, 0)
}

console.log(partOne());