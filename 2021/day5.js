const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input5.txt')
  const lines = getLines(input)
  const grid = drawLines(lines)
  const dangerSpots = calculateDangerSpots(grid)
  console.log('Part 1:', dangerSpots)
  const grid2 = drawLines(lines, true)
  const dangerSpots2 = calculateDangerSpots(grid2)
  console.log('Part 2:', dangerSpots2)
}

function getLines(input) {
  return input.map(i => {
    const [coord1, coord2] = i.split(" -> ")
    const [x1, y1] = coord1.split(',')
    const [x2, y2] = coord2.split(',')
    return {
      x1: parseInt(x1),
      y1: parseInt(y1),
      x2: parseInt(x2),
      y2: parseInt(y2)
    }
  })
}

function drawLines(lines, includeDiagonals = false) {
  const grid = []
  for (let i = 0; i < 1000; i++) {
    grid.push(Array(1000).fill(0))
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.x1 === line.x2) {
      // vertical line
      const start = Math.min(line.y1, line.y2)
      const end = Math.max(line.y1, line.y2)
      for (let j = start; j <= end; j++) {
        grid[line.x1][j] += 1
        // console.log('COORD', line.x1, j, grid[line.x1][j])
      }
    } else if (line.y1 === line.y2) {
      // horizontal line
      const start = Math.min(line.x1, line.x2)
      const end = Math.max(line.x1, line.x2)
      for (let j = start; j <= end; j++) {
        grid[j][line.y1] += 1
        // console.log('COORD', line.y1, j, grid[j][line.y1])
      }
    } else if (includeDiagonals) {
      // diagonal line
      const xModifier = line.x1 < line.x2 ? 1 : -1
      const yModifier = line.y1 < line.y2 ? 1 : -1
      const length = Math.abs(line.x1 - line.x2)
      for (let j = 0; j <= length; j++) {
        grid[line.x1+(j*xModifier)][line.y1+(j*yModifier)] += 1
      }
    }
  }
  return grid
}

function calculateDangerSpots (grid) {
  let count = 0
  for (let i = 0; i<grid.length; i++) {
    const row = grid[i]
    for (let j = 0; j<row.length; j++) {
      if (row[j] > 1) {
        count++
      }
    }
  }
  return count
}

run()