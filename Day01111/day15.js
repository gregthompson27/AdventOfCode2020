const data = [0, 5, 4, 1, 10, 14, 7];

// Part One - Given your starting numbers, what will be the 2020th number spoken?
// Part Two - Given your starting numbers, what will be the 30000000th number spoken?
  // Note - refactored to use part one code and decrease time complexity from original by quite a bit

const partOne = (number) => {
  const oldies = {};
  data.forEach((num, index) => {
    oldies[num] = index;
  })
  const nums = data.slice(0);
  for (let i = 7; i < number; i++) {
    // const prevNum = nums[nums.length - 1]
    if (oldies.hasOwnProperty(nums[nums.length - 1])) {
      nums.push((i - 1) - oldies[nums[nums.length - 1]]);
    } else {
      nums.push(0);
    }
    oldies[nums[nums.length - 2]] = (i - 1);
  }
  return nums[number - 1];
};

console.log(partOne(2020));
console.log(partOne(30000000))