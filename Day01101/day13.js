const fs = require('fs');
const data = fs.readFileSync('./Day01101/data.txt', 'utf-8').split('\n');
const earliest = data[0];
const shuttles = data[1]
  .split(',')
  .filter(blah => blah !== 'x')
  .map(n => Number(n));

console.log(data);

const wildShuttles = data[1].split(',').map((shuttle, index) => {
  return { [index]: shuttle };
})
.reduce((total, current, i) => {
  if (current[i] === 'x') {
    return total;
  }
  return Object.assign(total, current);
}, {})
console.log(wildShuttles)
// Part One - What is the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus?

const nextArrival = (currentTime, busID) => {
  const diff = currentTime % busID;
  return currentTime - diff + busID;
}

const partOne = () => {
  const upcomingShuttles = shuttles
  .map(bus => {
    return { [bus]: nextArrival(earliest, bus) }
  })
  .reduce((total, current) => Object.assign(total, current), {})

  const next = Math.min(...Object.values(upcomingShuttles));
  const lowIndex = Object.values(upcomingShuttles).indexOf(next);
  const shuttleNumber = Object.keys(upcomingShuttles)[lowIndex];
  return shuttleNumber * (next - earliest)
};

console.log(partOne());