const fs = require("fs");

function getInput() {
  const filename = process.argv[2];
  const input = fs.readFileSync(`${__dirname}/${filename}`, "utf8");
  const lines = input.trim().split("\n");
  return lines[0];
}

function run() {
  const input = getInput();
  const data = input.split(' ').map(num => parseInt(num))
  const metaDataSum = doSum(data, 0)
  console.log("Part1:", metaDataSum);
  const data2 = input.split(' ').map(num => parseInt(num))
  console.log("Part2:", doSum2(data2));
}

function doSum(data, metaDataSum) {
  const children = data.splice(0, 1)[0]
  const metaEntries = data.splice(0,1)[0]
  if (children === 0) {
    const metaSum = sum(data.splice(0,metaEntries))
    return metaSum
  } else {
    let total = metaDataSum
    for (let i = 0; i < children; i++) {
      const result = doSum(data, metaDataSum)
      total += result
    }
    total += sum(data.splice(0,metaEntries))
    return total
  }


}

function doSum2(data) {
  const children = data.splice(0, 1)[0]
  const metaEntries = data.splice(0,1)[0]
  if (children === 0) {
    const metaSum = sum(data.splice(0,metaEntries))
    return metaSum
  } else {
    let total = 0
    let childSums = []
    for (let i = 0; i < children; i++) {
      const result = doSum2(data)
      childSums.push(result)
    }
    const metaIndexes = data.splice(0,metaEntries)
    for (let j = 0; j < metaEntries; j++) {
      const index = metaIndexes[j] -1
      const val = childSums[index] || 0
      total += val
    }
    return total
  }
}

function sum(vals) {
  return vals.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0)
}

run()
