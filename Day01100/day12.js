const { SIGPIPE } = require('constants');
const fs = require('fs');
const data = fs.readFileSync('./Day01100/data.txt', 'utf-8').split('\n')

// Part One - Figure out where the navigation instructions lead. What is the Manhattan distance between that location and the ship's starting position?

const cardinals = ['N', 'E', 'S', 'W'];

const Ship = function() {
  this.direction = 'E';
  this.x = 0;
  this.y = 0;
}

Ship.prototype.move = function(input) {
  const num = Number(input.slice(1));
  if (input[0] === 'W') { this.x -= num; }
  else if (input[0] === 'E') { this.x += num; }
  else if (input[0] === 'N') { this.y += num; }
  else if (input[0] === 'S') { this.y -= num; }
  else if (input[0] === 'F') { this.move(`${this.direction}${num}`); }
  else if (input[0] === 'L') { this.move(`R${360 - num}`); }
  else {
    const twists = num / 90;
    const current = cardinals.indexOf(this.direction);
    this.direction = cardinals[(current + twists) % 4]
  }
}

const partOne = () => {
  const ship = new Ship();
  data.forEach(instruction => {
    ship.move(instruction);
  })
  return Math.abs(ship.x) + Math.abs(ship.y);
};

// Part Two - Figure out where the navigation instructions actually lead. What is the Manhattan distance between that location and the ship's starting position?

class WaywardShip {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.waypointX = 10;
    this.waypointY = 1;
  }

  move(input) {
    const num = Number(input.slice(1));
    const xDiff = this.waypointX - this.x;
    const yDiff = this.waypointY - this.y;
    if (input[0] === 'W') { this.waypointX -= num; }
    else if (input[0] === 'E') { this.waypointX += num; }
    else if (input[0] === 'N') { this.waypointY += num; }
    else if (input[0] === 'S') { this.waypointY -= num; }
    else if (input[0] === 'F') {
      this.x += (this.waypointX * num);
      this.y += (this.waypointY * num);
    }
    else if (input[0] === 'L') { this.move(`R${360 - num}`); }
    else {
      if (num === 90) {
        const newX = this.waypointY;
        const newY = this.waypointX * -1;
        this.waypointY = newY;
        this.waypointX = newX;
      } else if (num === 180) {
        this.move('R90');
        this.move('R90');
      } else {
        this.move('R90');
        this.move('R180') ;
      }
    }
  }
}

const partTwo = () => {
  const waywardVessel = new WaywardShip();
  data.forEach(instruction => {
    waywardVessel.move(instruction);
  })
  return Math.abs(waywardVessel.x) + Math.abs(waywardVessel.y);

}

console.log(partOne())
console.log(partTwo())