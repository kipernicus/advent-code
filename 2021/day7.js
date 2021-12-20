const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input7.txt')
  const crabs = input[0].split(',')
  const fuel = calculateFuel(crabs, bruteForceCalculate)
  console.log('Part 1:', fuel)
  const fuel2 = calculateFuel(crabs, bruteForceCalculate2)
  console.log('Part 2:', fuel2)
}

function calculateFuel (crabs, func) {
  let solution
  let newSolution = Number.MAX_SAFE_INTEGER
  let position = 0
  do {
    solution = newSolution
    newSolution = func(crabs, position)
    position++
  } while (newSolution < solution)
  return solution
}

function bruteForceCalculate(crabs, position) {
  return crabs.reduce((total,crab) => total + (Math.abs(crab - position)), 0)
}

function bruteForceCalculate2(crabs, position) {
  return crabs.reduce((total,crab) => total + summation(Math.abs(crab - position)), 0)
}

function summation (number) {
  let total = 0
  for (let i = 1; i <= number; i++) {
    total += i;
  }
  return total
}

run()