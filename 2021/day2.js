const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input2.txt')
  const { position, depth } = calculatePosition(input)
  console.log('Part 1:', position * depth)

  const { position: position2, depth: depth2 } = calculateAimedPosition(input)
  console.log('Part 2:', position2 * depth2)
}

function calculatePosition (input) {
  return input.reduce((accum, instruction) => {
    const [direction, velocity] = instruction.split(' ')
    switch(direction) {
      case 'forward':
        accum.position += parseInt(velocity)
        break
      case 'up':
        accum.depth -= parseInt(velocity)
        break
      case 'down':
        accum.depth += parseInt(velocity)
        break
      default:
        // noop
    }
    return accum
  }, {
    position: 0,
    depth: 0
  })
}

function calculateAimedPosition (input) {
  let aim = 0
  return input.reduce((accum, instruction) => {
    const [direction, velocity] = instruction.split(' ')
    switch(direction) {
      case 'forward':
        accum.position += parseInt(velocity)
        accum.depth += aim * parseInt(velocity)
        break
      case 'up':
        aim -= parseInt(velocity)
        break
      case 'down':
        aim += parseInt(velocity)
        break
      default:
        // noop
    }
    return accum
  }, {
    position: 0,
    depth: 0
  })
}

run()
