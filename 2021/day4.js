const { readInput } = require('./utils')

function run () {
  const input = readInput('inputs/input4.txt')
  const { numbers, boards } = getGameParts(input)
  const { lastWinningBoard, lastWinningDraw, winningBoard, winningDraw } = playBingo(numbers, boards)
  const winningScore = calculateScore(winningBoard, winningDraw)
  const lastWinningScore = calculateScore(lastWinningBoard, lastWinningDraw)
  console.log('Part 1:', winningScore)
  console.log('Part 2:', lastWinningScore)
}

function getGameParts(input) {
  const numbers = input[0].split(',')
  const boards = []
  for (let i = 2; i < input.length; i += 6) {
    const board = [
      input[i].split(' ').filter(n => n.length > 0),
      input[i+1].split(' ').filter(n => n.length > 0),
      input[i+2].split(' ').filter(n => n.length > 0),
      input[i+3].split(' ').filter(n => n.length > 0),
      input[i+4].split(' ').filter(n => n.length > 0)
    ]
    boards.push(board)
  }
  return { boards, numbers}
}

function playBingo (numbers, boards) {
  let draw
  const updatedBoards = [].concat(boards)
  const winningBoards = []
  for (let i = 0; i < numbers.length; i++) {
    draw = numbers[i]
    for (let j = 0; j < updatedBoards.length; j++) {
      if (winningBoards.findIndex(b => b.index === j) === -1) {
        const isWinner = applyDrawToBoard(updatedBoards[j], draw)
        if (isWinner) {
          winningBoards.push({
            index: j,
            board: updatedBoards[j],
            draw
          })
        }
      }
    }
  }
  return {
    winningBoard: winningBoards[0].board,
    winningDraw: winningBoards[0].draw,
    lastWinningBoard: winningBoards[winningBoards.length-1].board,
    lastWinningDraw: winningBoards[winningBoards.length-1].draw
  }
}

function applyDrawToBoard(board, draw) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === draw) {
        board[i][j] = 'x'
        return isBoardAWinner(board, i, j)
      }
    }
  }
  return false
}

function isBoardAWinner(board, yCoord, xCoord) {
  if (board[yCoord].filter(sq => sq === 'x').length === 5) {
    return true // Horizontal Bingo
  }
  if (board.filter(row => row[xCoord] === 'x').length === 5) {
    return true // Vertical Bingo
  }
  const diagonal = [0,1,2,3,4].filter(coord => board[coord][coord] === 'x')
  const reverseDiagonal = [0,1,2,3,4].filter(coord => board[coord][Math.abs(coord-4)])
  if (diagonal.length === 5 || reverseDiagonal.lenght === 5) {
    return true // Diagonal Bingo
  }
  return false
}

function calculateScore(board, draw) {
  let sum = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const val = parseInt(board[i][j])
      if (Number.isInteger(val)) {
        sum += val
      }
    }
  }
  return sum*draw
}

run()