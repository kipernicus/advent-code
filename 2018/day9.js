
function run() {
  console.log("Part1:", playMarbleGameEfficiently(464, 70918));
  // console.log("Part1:", playMarbleGameEfficiently(10, 1618));
  // console.log("Part2:", playMarbleGameEfficiently(464, 7091800));
}

function playMarbleGame(players, marbles) {
  let playerScores = []
  for (let i = 0; i < players; i++) {
    playerScores.push(0)
  }
  let currentPlayer = 0
  let currentMarble = 0
  let playedMarbles = []
  for(let i = 0; i < marbles; i++) {
    if (playedMarbles.length === 0 || playedMarbles.length === 1) {
      playedMarbles.push(i)
      currentMarble = playedMarbles.indexOf(i)
    } else if ((i % 23) === 0) {
      playerScores[currentPlayer] += i
      const bonusLoc = (currentMarble + playedMarbles.length - 7) % playedMarbles.length
      const bonusPoints = playedMarbles.splice(bonusLoc, 1)
      playerScores[currentPlayer] += bonusPoints[0]
      currentMarble = bonusLoc
    } else {
      const nextLoc = (currentMarble + 2) % playedMarbles.length
      playedMarbles.splice(nextLoc, 0, i)
      currentMarble = playedMarbles.indexOf(i)
    }
    currentPlayer = (currentPlayer + 1) % players
  }
  let maxScore = 0
  for (let i = 0; i < playerScores.length; i++) {
    if (playerScores[i] > maxScore) {
      maxScore = playerScores[i]
    }
  }
  return maxScore
}

function playMarbleGameEfficiently(players, marbles) {
  let playerScores = []
  for (let i = 0; i < players; i++) {
    playerScores.push(0)
  }
  let currentPlayer = 0
  let currentMarble = 0
  let playedMarblesArray = []
  playedMarblesArray.push([])
  let playedMarblesIndex = 0
  for(let i = 0; i < marbles; i++) {
    let playedMarbles = playedMarblesArray[playedMarblesIndex]
    if (i === 0 || i === 1) {
      playedMarbles.push(i)
      currentMarble = playedMarbles.indexOf(i)
    } else if ((i % 23) === 0) {
      playerScores[currentPlayer] += i
      const locMinus7 = currentMarble - 7
      if (locMinus7 < 0) {
        // console.log('MINUS', currentMarble)
        playedMarblesIndex = playedMarblesArray.length - 1
        playedMarbles = playedMarblesArray[playedMarblesIndex]
      }
      const bonusLoc = (locMinus7 + playedMarbles.length) % playedMarbles.length
      const bonusPoints = playedMarbles.splice(bonusLoc, 1)
      playerScores[currentPlayer] += bonusPoints[0]
      // console.log('SCORING', { score: i + bonusPoints[0], bonusLoc, i, currentMarble })
      currentMarble = bonusLoc
    } else {
      let nextLoc = (currentMarble + 2)
      if ((nextLoc) > playedMarbles.length) {
        // console.log('GREATER', { nextLoc, currentMarble, playedMarblesIndex })
        nextLoc = nextLoc % playedMarbles.length
        // console.log('GREATER', { nextLoc, currentMarble, playedMarblesIndex })
        playedMarblesIndex = (playedMarblesIndex + 1) % playedMarblesArray.length
        playedMarbles = playedMarblesArray[playedMarblesIndex]
        playedMarbles.splice(nextLoc, 0, i)
      } else if (nextLoc === playedMarbles.length) {
        playedMarbles.push(i)
      } else {
        playedMarbles.splice(nextLoc, 0, i)
      }
      currentMarble = playedMarbles.indexOf(i)
      // console.log({ nextLoc, currentMarble, i, len: playedMarbles.length })
    }
    currentPlayer = (currentPlayer + 1) % players
    const splitsize = 5000
    if (playedMarbles.length === (splitsize * 2)) {
      // console.log('SPLITTING!!')
      const newPlayedMarbles = playedMarbles.splice(splitsize, splitsize)
      playedMarblesArray.push(newPlayedMarbles)
      if (currentMarble >= splitsize) {
        currentMarble = currentMarble % splitsize
        playedMarblesIndex++
        playedMarbles = playedMarblesArray[playedMarblesIndex]
      }
    }
    // console.log({ currentMarble, playedMarbles, playedMarblesIndex })
  }
  let maxScore = 0
  for (let i = 0; i < playerScores.length; i++) {
    if (playerScores[i] > maxScore) {
      maxScore = playerScores[i]
    }
  }
  return maxScore
}

run()
