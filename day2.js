const fs = require('fs')

const INPUT = {}

function getInput() {
  const filename = process.argv[2]
  const input = fs.readFileSync(`${__dirname}/${filename}`, 'utf8')
  const lines = input.trim().split('\n')
  return lines
}

function run() {
  const input = getInput()
  console.log('Checksum:', getChecksum(input))
  console.log('Matches: ', findMatches(input))
}

function getChecksum(input) {
  let doubles = 0
  let triples = 0
  for (let i = 0; i < input.length; i++) {
    const id = input[i]
    const letters = {}
    for (let j = 0; j < id.length; j++) {
      const letter = id[j]
      if (letters[letter]) {
        letters[letter] += 1
      } else {
        letters[letter] = 1
      }
    }
    const counts = Object.values(letters)
    if (counts.indexOf(2) !== -1) {
      doubles++
    }
    if (counts.indexOf(3) !== -1) {
      triples++
    }
  }
  return doubles * triples
}

function findMatches(input) {
  let match
  for (let i = 0; i < input.length; i++) {
    const id = input[i]
    for (let j = i; j < input.length; j++) {
      let deviations = 0
      let nextId = input[j]
      for (let k = 0; k < id.length; k++) {
        if (id[k] !== nextId[k]) {
          deviations++
        }
        if (deviations > 1) {
          break;
        }
      }
      if (deviations === 1) {
        match = [id, nextId]
        break
      }
    }
  }
  return match
}

run()