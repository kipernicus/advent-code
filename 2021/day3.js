const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input3.txt')
  const { gamma, epsilon } = calculateRates(input)
  console.log('Part 1:', gamma * epsilon)

  const oxygenRating = calculateOxygenRating(input)
  const co2Rating = calculateCO2Rating(input)
  console.log('Part 2:', oxygenRating * co2Rating)
}

function calculateRates (input) {
  let onesTally = []
  let zeroesTally = []
  for (let i = 0; i < input.length; i++) {
    const item = input[i]
    for (let j = 0; j < item.length; j++) {
      const val = parseInt(item[j])
      if (val === 0) {
        zeroesTally[j] = zeroesTally[j] ? zeroesTally[j]+1 : 1 // initialize it to 1 when empty
      } else {
        onesTally[j] = onesTally[j] ? onesTally[j]+1 : 1 // initialize it to 1 when empty
      }
    }
  }
  let gammaBinary = ''
  let epsilonBinary = ''
  for (let i = 0; i < onesTally.length; i++) {
    const moreZeroes = (zeroesTally[i] || 0) > (onesTally[i] || 0)
    gammaBinary += moreZeroes ? 0 : 1
    epsilonBinary += moreZeroes ? 1 : 0
  }
  console.log('BINARY:', gammaBinary, epsilonBinary)
  return {
    gammaBinary,
    gamma: parseInt(gammaBinary, 2),
    epsilonBinary,
    epsilon: parseInt(epsilonBinary, 2)
  }
}

function calculateOxygenRating (inputs, index = 0) {
  if (inputs.length === 0) {
    return console.log('UH OH')
  }
  if (inputs.length === 1) {
    return parseInt(inputs[0], 2)
  } else {
    const { gammaBinary } = calculateRates(inputs)
    const filteredInputs = inputs.filter(input => input[index] === gammaBinary[index])
    return calculateOxygenRating(filteredInputs, index+1)
  }
}

function calculateCO2Rating (inputs, index = 0) {
  if (inputs.length === 0) {
    return console.log('UH OH')
  }
  if (inputs.length === 1) {
    return parseInt(inputs[0], 2)
  } else {
    const { epsilonBinary } = calculateRates(inputs)
    const filteredInputs = inputs.filter(input => input[index] === epsilonBinary[index])
    return calculateCO2Rating(filteredInputs, index+1)
  }
}

run()
