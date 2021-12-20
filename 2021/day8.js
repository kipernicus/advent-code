const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input8.txt')
  const data = parseInput(input)
  const uniqueDigits = calculateUniqueDigits(data)
  console.log('Part 1:', uniqueDigits)
  const outputSum = calculateOutputSum(data)
  console.log('Part 2:', outputSum)
}

function parseInput (input) {
  return input.map(line => {
    const [rawPatterns, rawOutput] = line.split(' | ')
    const patterns = rawPatterns.split(' ')
    const outputs = rawOutput.split(' ')
    const decodedPatterns = decodePatterns(patterns)
    const decodedOutputs = decodeOutputs(outputs, decodedPatterns)
    return {
      patterns,
      outputs,
      decodedPatterns,
      decodedOutputs
    }
  })
}

function decodePatterns (patterns) {
  const decodedPatterns = []
  for (let i = 0; i < 10; i++) {
    decodedPatterns.push({})
  }
  const sortedPatterns = patterns.map(p => sortPattern(p))
  let remainingPatterns = [], altRemainingPatterns = []
  // find 1, 4, 7, and 8
  sortedPatterns.forEach(p => {
    switch (p.length) {
      case 2:
        decodedPatterns[1] = p
        break
      case 3:
        decodedPatterns[7] = p
        break
      case 4:
        decodedPatterns[4] = p
        break
      case 7:
        decodedPatterns[8] = p
        break
      default:
        remainingPatterns.push(p)
        break
    }
  })
  // Find the 3 and the 6
  const seven = decodedPatterns[7]
  remainingPatterns.forEach(p => {
    const reducedPattern = p
      .replace(seven[0], '')
      .replace(seven[1], '')
      .replace(seven[2], '')
    switch (reducedPattern.length) {
      case 2:
        decodedPatterns[3] = p
        break
      case 4:
        decodedPatterns[6] = p
        break
      default:
        altRemainingPatterns.push(p)
        break
    }
  })
  // Find the 0
  const three = decodedPatterns[3]
  remainingPatterns = []
  altRemainingPatterns.forEach(p => {
    const reducedPattern = p
      .replace(three[0], '')
      .replace(three[1], '')
      .replace(three[2], '')
      .replace(three[3], '')
      .replace(three[4], '')
    switch (reducedPattern.length) {
      case 2:
        decodedPatterns[0] = p
        break
      default:
        remainingPatterns.push(p)
        break
    }
  })
  // Find the 9
  const nineIndex = remainingPatterns.findIndex(p => p.length === 6)
  decodedPatterns[9] = remainingPatterns[nineIndex]
  remainingPatterns.splice(nineIndex,1)
  // Find the 2 and 5
  const four = decodedPatterns[4]
  remainingPatterns.forEach(p => {
    const reducedPattern = p
      .replace(four[0], '')
      .replace(four[1], '')
      .replace(four[2], '')
      .replace(four[3], '')
    switch (reducedPattern.length) {
      case 2:
        decodedPatterns[5] = p
        break
      case 3:
        decodedPatterns[2] = p
        break
      default:
        break
    }
  })
  return decodedPatterns
}

function decodeOutputs (outputs, decodedPatterns) {
  const sortedOutput = outputs.map(o => sortPattern(o))
  const thousands = decodedPatterns.findIndex(dp => dp === sortedOutput[0])
  const hundreds = decodedPatterns.findIndex(dp => dp === sortedOutput[1])
  const tens = decodedPatterns.findIndex(dp => dp === sortedOutput[2])
  const ones = decodedPatterns.findIndex(dp => dp === sortedOutput[3])
  return (thousands * 1000) + (hundreds * 100) + (tens * 10) + ones
}

function sortPattern (pattern) {
  return pattern
    .split('')
    .sort()
    .join('')
}

function calculateUniqueDigits (data) {
  let count = 0
  data.forEach(val => {
    val.outputs.forEach(p => {
      if ([2, 3, 4, 7].includes(p.length)) {
        count++
      }
    })
  })
  return count
}

function calculateOutputSum (data) {
  let sum = 0
  data.forEach(val => {
    sum += val.decodedOutputs
  })
  return sum
}

run()
