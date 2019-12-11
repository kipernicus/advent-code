const fs = require("fs");

function getInput() {
  const filename = process.argv[2];
  const input = fs.readFileSync(`${__dirname}/${filename}`, "utf8");
  const lines = input.trim().split("\n");
  return lines;
}

function run() {
  const input = getInput();
  const coords = parseInput(input)
  console.log("Part1:", findLargestLocation(coords));
  console.log("Part2:", findLargestRegion(coords));
}

function parseInput(input) {
  return input.map(coords => {
    const xy = coords.split(', ')
    return { x: xy[0], y: xy[1], size: 0, infinite: false }
  })
}