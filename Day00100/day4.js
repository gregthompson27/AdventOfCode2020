const fs = require('fs');
const { connected } = require('process');


const passportData = fs.readFileSync('./Day4/data.txt', 'utf-8')
  .split('\n\n')
  .map(doc => {
    return doc
      .split('\n')
      .join(' ')
      .split(' ');
  });

// console.log(passportData)

const parsedData = passportData
  .map(doc => {
    return doc.map(info => info.slice(0, info.indexOf(':')));
  })
  .filter(doc => doc.length === 8 || (doc.length === 7 && !doc.includes('cid')))

const goodData = passportData.map(doc => {
  return doc.map(line => {
    return { [line.slice(0, line.indexOf(':'))]: line.slice(line.indexOf(':') + 1)}
  })
  .reduce((result, current) => {
    return Object.assign(result, current);
  }, {})
})

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const pg = goodData.filter(doc => {
  return (doc.hasOwnProperty('byr') && (doc.byr >= 1920 && doc.byr <= 2002))
    && (doc.hasOwnProperty('iyr') && (doc.iyr >= 2010 && doc.iyr <= 2020))
    && (doc.hasOwnProperty('eyr') && (doc.eyr >= 2020 && doc.eyr <= 2030))
    && (doc.hasOwnProperty('hgt') &&
      ((doc.hgt.slice(-2) === 'cm' && doc.hgt.slice(0, -2) >= 150 && doc.hgt.slice(0, -2) <= 193)
      || (doc.hgt.slice(-2) === 'in' && doc.hgt.slice(0, -2) >= 59 && doc.hgt.slice(0, -2) <= 76)))
    && (doc.hasOwnProperty('ecl') && eyeColors.includes(doc.ecl))
    && (doc.hasOwnProperty('pid') && doc.pid.length === 9)
    && (doc.hasOwnProperty('hcl') && doc.hcl.length === 7 && doc.hcl[0] === '#');
})
