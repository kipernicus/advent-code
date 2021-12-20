const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input10.txt')
  const errorData = checkForErrors(input)
  const errorScore = sumErrorScores(errorData)
  console.log('Part 1:', errorScore)
  const middleScore = findMiddleScore(errorData)
  console.log('Part 2:', middleScore)
}

function checkForErrors (input) {
  const SCORES = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }
  return input.map(line => {
    let errorScore = 0, unmatchedScore = 0
    const { failedChar, unmatched } = checkForFailure(line)
    if (failedChar) {
      errorScore = SCORES[failedChar]
    } else {
      unmatchedScore = calculateUnmatchedScore(unmatched)
    }
    return {
      errorScore,
      failedChar,
      unmatchedScore,
      unmatched
    }
  })
}

function checkForFailure (line) {
  let errorChar
  let index = 0
  const matcher = []
  do {
    const next = line[index]
    switch (next) {
      case ')':
        if (matcher.pop() !== '(') {
          errorChar = next
        }
        break
      case ']':
        if (matcher.pop() !== '[') {
          errorChar = next
        }
        break
      case '}':
        if (matcher.pop() !== '{') {
          errorChar = next
        }
        break
      case '>':
        if (matcher.pop() !== '<') {
          errorChar = next
        }
        break
      default:
        matcher.push(next)
    }
    index++
  } while (!errorChar && index < line.length)
  return {
    failedChar: errorChar,
    unmatched: matcher
  }
}

function calculateUnmatchedScore (unmatched) {
  const SCORES = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
  }
  return unmatched.reverse().reduce((sum, e) => {
    return sum*5 + SCORES[e]
  }, 0)
}

function sumErrorScores (errorData) {
  return errorData.reduce((sum, e) => sum + e.errorScore, 0)
}

function findMiddleScore (errorData) {
  const sortedData = errorData.filter(item => item.unmatchedScore).sort((a, b) => {
    return a.unmatchedScore - b.unmatchedScore
  })
  console.log('DATA', sortedData, Math.floor(sortedData.length / 2))
  return sortedData[Math.floor(sortedData.length / 2)].unmatchedScore
}

run()