const { readInput } = require('./utils')

function run() {
  const input = readInput('inputs/input1.txt')
  const increases = calculateIncreases(input)
  console.log('Part 1:', increases)

  const slidingWindowIncreases = calculateSWIncreases(input)
  console.log('Part 2:', slidingWindowIncreases)
}

function calculateIncreases (input) {
  let increases = 0
  for (let i = 1; i < input.length; i++) {
    if (parseInt(input[i-1]) < parseInt(input[i])) {
      increases++
    }
  }
  return increases
}

function calculateSWIncreases (input) {
  let increases = 0
  for (let i = 2; i < input.length-1; i++) {
    const windowA = parseInt(input[i-2]) + parseInt(input[i-1]) + parseInt(input[i])
    const windowB = parseInt(input[i-1]) + parseInt(input[i]) + parseInt(input[i+1])
    if (windowA < windowB) {
      increases++
    }
  }
  return increases
}

run()