const fs = require('fs')

const INPUT = {}

function getInput() {
  const filename = process.argv[2]
  const input = fs.readFileSync(`${__dirname}/${filename}`, 'utf8')
  const lines = input.trim().split('\n')
  return lines
}

const FREQUENCIES = [0]

function run() {
  const input = getInput()
  let { total, match } = calibrate(0, input)
  console.log('Part 1:', total)
  while (match === undefined) {
    let results = calibrate(total, input)
    total = results.total
    match = results.match
  }
  console.log('Part 2:', match)
}

function calibrate(start, input) {

  let count = start
  let match
  for(let i = 0; i < input.length; i++) {
    const val = input[i]
    switch(val[0]) {
      case '+':
        count += parseInt(val.substring(1))
        break;
      case '-':
        count -= parseInt(val.substring(1))
        break;
      default:
        console.log('ERROR')
    }
    // search for match
    if (FREQUENCIES.indexOf(count) !== -1) {
      match = count
      break;
    } else {
      FREQUENCIES.push(count)
    }
  }
  return { match, total: count}
}

run()