const fs = require("fs");

function getInput() {
  const filename = process.argv[2];
  const input = fs.readFileSync(`${__dirname}/${filename}`, "utf8");
  const lines = input.trim().split("\n");
  return lines;
}

function run() {
  const input = getInput();
  const coords = parseInput(input)
  console.log("Part1:", findLargestLocation(coords));
  console.log("Part2:", findLargestRegion(coords));
}

function parseInput(input) {
  return input.map(coords => {
    const xy = coords.split(', ')
    return { x: xy[0], y: xy[1], size: 0, infinite: false }
  })
}

function findLargestLocation(coords) {
  for (let i = -500; i < 500; i++) {
    for (let j = -500; j < 500; j++) {
      let closest = -1
      let closestDist = 999999
      let isEquidistant = false
      for (let k = 0; k < coords.length; k++) {
        const coord = coords[k]
        const distance = Math.abs(i - coord.x) + Math.abs(j - coord.y)
        if (distance < closestDist) {
          closestDist = distance
          closest = k
          isEquidistant = false
        } else if (distance === closestDist) {
          isEquidistant = true
        }
      }
      if (!isEquidistant) {
        coords[closest].size++
      }
    }
  }
  for (let i = 0; i < 1100; i++) {
    for (let j = 1000; j < 1200; j++) {
      let closest = -1
      let closestDist = 999999
      for (let k = 0; k < coords.length; k++) {
        const coord = coords[k]
        const distance = Math.abs(i - coord.x) + Math.abs(j - coord.y)
        if (distance < closestDist) {
          closestDist = distance
          closest = k
        }
      }
      coords[closest].infinite = true
    }
  }
  for (let i = 1000; i < 1200; i++) {
    for (let j = 0; j < 1100; j++) {
      let closest = -1
      let closestDist = 999999
      for (let k = 0; k < coords.length; k++) {
        const coord = coords[k]
        const distance = Math.abs(i - coord.x) + Math.abs(j - coord.y)
        if (distance < closestDist) {
          closestDist = distance
          closest = k
        }
      }
      coords[closest].infinite = true
    }
  }
  for (let i = -1000; i < -800; i++) {
    for (let j = -1100; j < 0; j++) {
      let closest = -1
      let closestDist = 999999
      for (let k = 0; k < coords.length; k++) {
        const coord = coords[k]
        const distance = Math.abs(i - coord.x) + Math.abs(j - coord.y)
        if (distance < closestDist) {
          closestDist = distance
          closest = k
        }
      }
      coords[closest].infinite = true
    }
  }
  for (let i = -1100; i < 0; i++) {
    for (let j = -1000; j < -800; j++) {
      let closest = -1
      let closestDist = 999999
      for (let k = 0; k < coords.length; k++) {
        const coord = coords[k]
        const distance = Math.abs(i - coord.x) + Math.abs(j - coord.y)
        if (distance < closestDist) {
          closestDist = distance
          closest = k
        }
      }
      coords[closest].infinite = true
    }
  }
  const filteredCoords = coords.filter(coord => !coord.infinite)
  return filteredCoords.sort(compare)
}

function compare(a, b) {
  if (a.size < b.size) return -1;
  if (a.size > b.size) return 1;
  return 0;
}

function findLargestRegion(coords) {
  let safeSpots = 0
  for (let i = -500; i < 500; i++) {
    for (let j = -500; j < 500; j++) {
      let totalDist = 0
      for (let k = 0; k < coords.length; k++) {
        const coord = coords[k]
        const distance = Math.abs(i - coord.x) + Math.abs(j - coord.y)
        totalDist += distance
      }
      if (totalDist < 10000) {
        safeSpots++
      }
    }
  }
  return safeSpots
}

run();
