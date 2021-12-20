const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input6.txt')
  const fish = input[0].split(',')
  const newFish = spawnFish(fish, 80)
  console.log('Part 1:', newFish.length)
  const part2 = spawnFish2(fish, 256)
  console.log('Part 2:', part2)
}

function spawnFish (startingFish, days) {
  let newFish = startingFish
  for (let i = 0; i < days; i++) {
    const babies = []
    newFish = newFish.map((fish) => {
      if (fish === 0) {
        babies.push(8)
        return 6
      }
      return fish-1
    })
    newFish = newFish.concat(babies)
  }
  return newFish
}

function spawnFish2 (startingFish, days) {
  const collapsedFish = [0,0,0,0,0,0,0,0,0]
  startingFish.forEach((fish) => {
    collapsedFish[fish] += 1
  })
  for (let i = 0; i < days; i++) {
    const parents = collapsedFish.shift()
    collapsedFish[6] += parents
    collapsedFish.push(parents)
  }
  return collapsedFish.reduce((sum,count) => sum+count)
}

run()