const fs = require('fs');

const data = fs.readFileSync('./Day2/data.txt', 'utf-8').split('\n');

const test1 = data.map(a => {
  const min = a.slice(0, a.indexOf('-'));
  const max = a.slice(a.indexOf('-') + 1, a.indexOf(' '));
  const ref = a.slice(a.indexOf(' ') + 1, a.indexOf(' ') + 2)
  const str = a.slice(a.indexOf(':') +2)
    .split('')
    .filter(letter => letter === ref)
    .join('');
  return { min, max, ref, str };
})
.filter(p => p.str.length >= p.min && p.str.length <= p.max);

const test2 = data.map(a => {
  const first = a.slice(0, a.indexOf('-')) - 1;
  const second = a.slice(a.indexOf('-') + 1, a.indexOf(' ')) - 1;
  const ref = a.slice(a.indexOf(' ') + 1, a.indexOf(' ') + 2)
  const str = a.slice(a.indexOf(':') + 2);
  return { first, second, ref, str };
})
.filter(p => !((p.str[p.first] === p.ref && p.str[p.second] === p.ref) || (p.str[p.first] !== p.ref && p.str[p.second] !== p.ref)))

console.log(test1.length)
console.log(test2.length)
