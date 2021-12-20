const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input9.txt')
  const map = buildMap(input)
  const { lowPoints, basins } = calculateLowPointsAndBasins(map)
  const riskSum = sumRiskLevels(lowPoints)
  console.log('Part 1:', riskSum)
  const sortedBasins = basins.sort()
  const length = sortedBasins.length
  const basinScore = sortedBasins[length-1] * sortedBasins[length-2] * sortedBasins[length-3]
  console.log('Part 2:', basinScore)
}

function buildMap (input) {
  return input.map(i => {
    return i.split('')
  })
}
function calculateLowPointsAndBasins (map) {
  const lowPoints = []
  let basins = []
  for (let i = 0; i < map.length; i++) {
    const row = map[i]
    for (let j = 0; j < row.length; j++) {
      const leftHigher = row[j-1] === undefined || row[j-1] > row[j]
      const rightHigher = row[j+1] === undefined || row[j+1] > row[j]
      const topHigher = map[i-1] === undefined || map[i-1][j] > row[j]
      const bottomHigher = map[i+1] === undefined || map[i+1][j] > row[j]
      if (leftHigher && rightHigher && topHigher && bottomHigher) {
        lowPoints.push(row[j])
        const basin = calculateBasinSize(map, i, j)
        basins.push(basin)
      }
    }
  }
  return { lowPoints, basins }
}

function calculateBasinSize (map, i, j) {
  if (map[i] !== undefined && map[i][j] !== undefined && parseInt(map[i][j]) !== 9 && map[i][j] !== 'x') {
    map[i][j] = 'x'

    const above = calculateBasinSize(map, i+1, j)
    const below = calculateBasinSize(map, i-1, j)
    const right = calculateBasinSize(map, i, j+1)
    const left = calculateBasinSize(map, i, j-1)
    return 1 + above + below + right + left
  }
  return 0
}

function sumRiskLevels (lowPoints) {
  return lowPoints.reduce((sum, point) => sum + parseInt(point) + 1, 0)
}

run()