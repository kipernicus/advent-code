const fs = require('fs')

const INPUT = {}

function getInput() {
  const filename = process.argv[2]
  const input = fs.readFileSync(`${__dirname}/${filename}`, 'utf8')
  const lines = input.trim().split('\n')
  return lines
}

const FABRIC = []
let overlaps = 0

function run() {
  const input = getInput()
  console.log('Overlapping squares:', countOverlaps(input))
  console.log('Winning Claim:', findWinningClaim(input))
}

function countOverlaps(input) {
  for(let i = 0; i < input.length; i++) {
    const data = input[i]
    const parsedData = parseData(data)
    addClaimToFabric(parsedData)
  }
  doCounting()
  return overlaps
}

function parseData(data) {
  const values = data.split(' ')
  const coords = values[2].split(',')
  const dimensions = values[3].split('x')
  return {
    id: values[0],
    xCord: parseInt(coords[0]),
    yCord: parseInt(coords[1].replace(':', '')),
    width: parseInt(dimensions[0]),
    height: parseInt(dimensions[1])
  }
}

function addClaimToFabric(claimData) {
  for (let i = 0; i < claimData.width; i++) {
    for (let j = 0; j < claimData.height; j++) {
      const xCoord = claimData.xCord + i
      const yCoord = claimData.yCord + j
      if (!FABRIC[xCoord]) {
        FABRIC[xCoord] = []
      }
      const current = FABRIC[xCoord][yCoord]
      if (!current) {
        FABRIC[xCoord][yCoord] = 0
      }
      FABRIC[xCoord][yCoord] += 1
    }
  }
}

function doCounting() {
  for(let i = 0; i < FABRIC.length; i++) {
    const row = FABRIC[i] || []
    for(let j = 0; j < row.length; j++) {
      const count = row[j]
      if (count && (count > 1)) {
        overlaps++
      }
    }
  }
}

function findWinningClaim(input) {
  for(let i = 0; i < input.length; i++) {
    const data = input[i]
    const parsedData = parseData(data)
    if(checkForWinner(parsedData)) {
      return parsedData
    }
  }
}

function checkForWinner(claimData) {
  for (let i = 0; i < claimData.width; i++) {
    for (let j = 0; j < claimData.height; j++) {
      const xCoord = claimData.xCord + i
      const yCoord = claimData.yCord + j
      if (FABRIC[xCoord][yCoord] > 1) {
        claimData.tainted = true
      }
    }
  }
  return !claimData.tainted
}

run()