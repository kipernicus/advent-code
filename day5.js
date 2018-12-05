const fs = require("fs");

const INPUT = {};

function getInput() {
  const filename = process.argv[2];
  const input = fs.readFileSync(`${__dirname}/${filename}`, "utf8");
  const lines = input.trim().split("\n");
  return lines[0];
}

function run() {
  const input = getInput();
  console.log("Part1:", determinePolymer(input).length);
  console.log("Part2:", determineShortestPolymer(input));
}

function determinePolymer(polymer) {
  const A = []
  const B = polymer.split('')
  while (B.length) {
    const next = B[0]
    if (checkForReaction(next, A[A.length - 1])) {
      A.pop()
    } else {
      A.push(B[0])
    }
    B.splice(0,1)
  }
  return A
}

function checkForReaction(a, b = '') {
  if (a.toUpperCase() !== a && b.toLowerCase() !== b) {
    return a.toUpperCase() === b
  } if (b.toUpperCase() !== b && a.toLowerCase() !== a) {
    return b.toUpperCase() === a
  }
}

function determineShortestPolymer(input) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  let min = 999999
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]
    const modifiedInput = input.replace(new RegExp(letter, 'g'), '').replace(new RegExp(letter.toUpperCase(), 'g'), '')
    const length =  determinePolymer(modifiedInput).length
    min = Math.min(min, length)
  }
  return min
}

run();
