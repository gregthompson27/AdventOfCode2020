const fs = require('fs');
const data = fs.readFileSync('./Day10110/data.txt', 'utf-8').split('\n\n').map(deck => deck.split('\n').slice(1).map(n => Number(n)));
const [deck1, deck2] = data;

// Part One - Play the small crab in a game of Combat using the two decks you just dealt. What is the winning player's score?

const partOne = (a1, a2) => {
  const compareTop = (d1, d2) => {
    if (d1[0] > d2[0]) {
      d1.push(d1.shift());
      d1.push(d2.shift());
    } else if (d2[0] > d1[0]) {
      d2.push(d2.shift());
      d2.push(d1.shift());
    } else { console.log('found two equal cards!!!!!!!!'); }
  }
  while (a1.length && a2.length) {
    compareTop(a1, a2);
  }
  const getScore = deck => {
    return deck.reverse().reduce((total, current, index) => {
      return total + (current * (index + 1));
    }, 0) 
  }
  return getScore(a1) + getScore(a2); // one of the decks will score 0 points
}

console.log(partOne(deck1, deck2));