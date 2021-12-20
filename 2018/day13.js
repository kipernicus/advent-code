const fs = require("fs");

function getInput() {
  const filename = process.argv[2];
  const input = fs.readFileSync(`${__dirname}/${filename}`, "utf8");
  const lines = input.split("\n");
  return lines;
}

function run() {
  const input = getInput();
  console.log("Part1:", findCrash(input));
  // console.log("Part2:", findLargestRegion(coords));
}

function findCrash(input) {
  let crash = false
  let crashLoc
  const { carts, tracks } = findAndRemoveCarts(input)
  while (!crash) {
    console.log('CARTS!!', carts)
    for (let i = 0; i < carts.length; i++) {
      let cart = carts[i]
      cart = moveCart(cart, tracks)
      carts[i] = cart
      if (detectCollision(carts)) {
        crash = true
        crashLoc = { x: cart.x, y: cart.y }
        break
      }
    }
    carts.sort(compare)
  }
  return crashLoc
}

function compare(a, b) {
  if (a.y < b.y) return -1;
  if (a.y === b.y) {
    if (a.x < b.x) return -1
    if (a.y < b.y) return 1
    return 0
  }
  return 1;
}

function moveCart(cart, tracks) {
  let nextLoc
  switch(cart.dir) {
    case 'v':
      cart.y += 1
      nextLoc = tracks[cart.y][cart.x]
      cart.dir = determineNewDir(nextLoc, cart)
      return cart
    case '>':
      cart.x += 1
      nextLoc = tracks[cart.y][cart.x]
      cart.dir = determineNewDir(nextLoc, cart)
      return cart
    case '<':
      cart.x -= 1
      nextLoc = tracks[cart.y][cart.x]
      cart.dir = determineNewDir(nextLoc, cart)
      return cart
    case '^':
      cart.y -= 1
      nextLoc = tracks[cart.y][cart.x]
      cart.dir = determineNewDir(nextLoc, cart)
      return cart
    default:
      console.log('UH OH', cart)
  }
}

function determineNewDir(nextLoc, cart) {
  switch(nextLoc) {
    case '-':
      return cart.dir
    case '|':
      return cart.dir
    case '+' :
      return handleIntersection(cart)
    case '/' :
      if (cart.dir === '>') return '^'
      else if (cart.dir === '^') return '>'
      else if (cart.dir === 'v') return '<'
      else return 'v'
    case '\\' :
      if (cart.dir === '>') return 'v'
      if (cart.dir === 'v') return '>'
      if (cart.dir === '<') return '^'
      else return '<'
    default:
      console.log('CRAP!', { nextLoc, cart })
  }
}

const INTERSECTOR = {
  left: { next: 'straight', '^': '<', '<': 'v', '>': '^', 'v': '>' },
  straight: { next: 'right', '^': '^', '<': '<', '>': '>', 'v': 'v' },
  right: { next: 'left', '^': '>', '<': '^', '>': 'v', 'v': '<' },
}
function handleIntersection(cart) {
  const next = INTERSECTOR[cart.lastTurn]
  cart.lastTurn = next.next
  return INTERSECTOR[cart.lastTurn][cart.dir]
}

function detectCollision(carts) {
  let collision = false
  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i]
    const futureCarts = carts.slice(i+1, 50)
    const crashSite = futureCarts.find(c => c.x === cart.x && c.y === cart.y)
    if (crashSite !== undefined) {
      collision = true
      break
    }
  }
  return collision
}

function findAndRemoveCarts(input) {
  const carts = []
  let cartId = 0
  const tracks = input.map((row, column) => {
    for (let i = 0; i < row.length; i++) {
      const val = row[i]
      let cart = {}
      if (val === 'v') {
        cart.id = cartId++
        cart.x = i
        cart.y = column
        cart.dir = val
        cart.lastTurn = 'right'
        carts.push(cart)
        row[i] = '|'
      } else if (val === '>') {
        cart.id = cartId++
        cart.x = i
        cart.y = column
        cart.dir = val
        cart.lastTurn = 'right'
        carts.push(cart)
        row[i] = '-'
      } else if (val === '<') {
        cart.id = cartId++
        cart.x = i
        cart.y = column
        cart.dir = val
        cart.lastTurn = 'right'
        carts.push(cart)
        row[i] = '-'
      } else if (val === '^') {
        cart.id = cartId++
        cart.x = i
        cart.y = column
        cart.dir = val
        cart.lastTurn = 'right'
        carts.push(cart)
        row[i] = '|'
      }
    }
    return row
  })
  return { carts, tracks }
}

run()
