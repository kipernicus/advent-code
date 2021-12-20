const fs = require('fs')

module.exports.readInput = function (filename) {
  const input = fs.readFileSync(`${__dirname}/${filename}`, 'utf8')
  const lines = input.trim().split('\n')
  return lines
}