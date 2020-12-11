const fs = require('fs');

const allData = fs.readFileSync('./Day7/data.txt', 'utf-8').split('\n');

const data = fs.readFileSync('./Day7/data.txt', 'utf-8')
  .split('\n')
  .map(rule => rule.split(' bags contain '))

// data looks good
// console.log(data.slice(0, 6));

// Part One - How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)
const colorData = data
  .map(rule => {
    const newRule = [rule[0]];
    newRule[1] = rule[1]
      .split(', ')
      .map(bit => {
        return bit.slice(2, bit.indexOf(' bag'))
      });
    return newRule;
  })

const findAllBags = () => {
  const results = [];

  let level = 0;

  const findOuter = (bagType) => {
    const p = colorData.filter(rule => rule[1].includes(bagType))
    let res = [];
    res = p.map(rule => rule[0]);
    results.push(...res)
    if (res.length > 0) {

      res.forEach(color => findOuter(color))
    }
    return res;
  }

  findOuter('shiny gold');
  return results
}

console.log(new Set(findAllBags()).size)

// Part 2 - How many individual bags are required inside your single shiny gold bag?

// console.log(data)

const countableData = data.map(rule => {
  if (rule[1] === 'no other bags.') {
    return rule[0]
  } else {
    const rules = rule[1];
    r = rules.split(', ').map(a => {
      // console.log(a)
      b = [a.slice(0, 1), a.slice(2, a.indexOf('bag'))]
      // console.log(b)
      // k = b.slice(2);
      // console.log(k)
      // v = Number(b.slice(0, 1));
      return { [b[1]]: b[0] };
    })
    .reduce((total, current) => {
      return Object.assign(total, current);
    }, {})
    // console.log(rule[1])
    return [rule[0], r]
  }

})

console.log(countableData)

const countAllBags = () => {

}

// // const fs = require('fs')
// const BAG = 'shiny gold'

// fs.readFile('./Day7/data.txt', 'utf8', function(err, data) {
//     const regex = new RegExp(/(\w+ \w+) bags contain (.*)/)
//     const childRegex = new RegExp(/(\d+) (\w+ \w+) bag/)
//     // console.log(childRegex)
//     const hash = {}
//     data = data
//         .split(require('os').EOL)
//         .map(item => {
//           console.log(item);
//             const [a, type, children] = item.match(regex);
//             return {
//                 type,
//                 children: children === 'no other bags.' ? [] : children.split(', ').map(item => {
//                     const [a, count, type] = item.match(childRegex) || []
//                     if (!a) {
//                         return null
//                     }
//                     return {
//                         count: parseInt(count),
//                         type,
//                     }
//                 })
//             }
//         }).forEach(item => {
//             hash[item.type] = item
//         })
//     console.log(partOne(hash));
//     console.log(partTwo(hash));
//     console.log(partTwoB(hash));
// });

// function partOne(hash) {
//     const containingBags = new Set([BAG]);
//     let addedABag = true
//     while (addedABag) {
//         addedABag = false
//         for (let type in hash) {
//             const checkBag = hash[type]
//             if (containingBags.has(type)) {
//                 continue
//             }
//             if (checkBag.children.some(bag => containingBags.has(bag.type))) {
//                 containingBags.add(checkBag.type);
//                 addedABag = true
//             }
//         }
//     }
//     return containingBags.size - 1
// }

// function partTwo(hash) {
//     function bagCounter (activeBag) {
//         let hashBag = hash[activeBag.type]
//         if (!hashBag.children.length) {
//             return activeBag.count || 1
//         }
//         return (hashBag.children.reduce((carry, bag) => {
//             return carry + bagCounter(bag)
//         }, 0) + 1) * (activeBag.count || 1)
//     }
//     return bagCounter(hash[BAG]) - 1
// }

// function partTwoB(hash) {
//     return (bagCounter = (activeBag, count = 1) => (activeBag.children.reduce((carry, bag) => carry + bagCounter(hash[bag.type], bag.count), 0) + 1) * count)(hash[BAG], 1) - 1
// }

// console.log(partTwo())


class Luggage {
  constructor(raw_rules) {
      this.bags_lookup = this.parseToBagsLookup(raw_rules);
      this.rules = this.parseToRulesLookup(raw_rules);
  }

  parseToBagsLookup(raw_rules) {
      let bags_lookup = {};
      for (let rule of raw_rules) {
          let [parent, children] = rule.split(' bags contain ');
          if (!bags_lookup[parent]) {
              bags_lookup[parent] = new Bag({ name: parent });
          }
          if (children.includes('no other')) {
              continue;
          }
          children =children.split(', ');
          for (let child of children) {
              let [, count, name] = /(\d+) (\w+ \w+) bag/.exec(child);
              count = parseInt(count, 10);
              let bag = bags_lookup[name];
              if (!bag) {
                  bag = new Bag({ name });
                  bags_lookup[name] = bag;
              }
              bag.addParent(bags_lookup[parent]);
          }
      }

      return bags_lookup;
  }

  parseToRulesLookup(raw_rules) {
      let bags_lookup = {};
      for (let rule of raw_rules) {
          let [parent, children] = rule.split(' bags contain ');
          if (!bags_lookup[parent]) {
              bags_lookup[parent] = [];
          }
          if (children.includes('no other')) {
              continue;
          }
          children =children.split(', ');
          for (let child of children) {
              let [, count, name] = /(\d+) (\w+ \w+) bag/.exec(child);
              count = parseInt(count, 10);
              bags_lookup[parent].push(new Bag({ name, count }));
          }
      }

      return bags_lookup;
  }

  countChildrenInside(bag_name) {
      if (!this.rules[bag_name]) {
          throw new Error(`Invalid bag name: "${bag_name}"`);
      }

      let rules = this.rules[bag_name];

      // Early escape, technically isn't necessary but provides base-case clarity on the recursion
      if (!rules.length) {
          return 0;
      }

      let children_count = 0;
      for (let bag of rules) {
          let { name, count } = bag;
          // Add the one bag we are looking at now
          children_count += count;

          // Plus its children (will be 0 if the child contains no bags itself)
          children_count += count * this.countChildrenInside(name);
      }

      return children_count;
  }
}

class Bag {
  constructor({ name, count }) {
      this.name = name;
      this.count = count;
      this.parent_bags = [];
  }

  addParent(parent_bag) {
      this.parent_bags.push(parent_bag);
  }

  countUniqueParents() {
      let lookup = this._getUniqueAncestorsLookup({});
      return Object.keys(lookup).length;
  }

  _getUniqueAncestorsLookup(lookup) {
      for (let parent of this.parent_bags) {
          lookup[parent.name] = parent;
          if (parent.parent_bags.length) {
              parent._getUniqueAncestorsLookup(lookup);
          }
      }

      return lookup;
  }
}

let luggage = new Luggage(allData);
let shiny_gold = luggage.bags_lookup['shiny gold'];
console.log('Part One: ', shiny_gold.countUniqueParents());

let shiny_child_count = luggage.countChildrenInside('shiny gold');
console.log('Part Two: ', shiny_child_count);