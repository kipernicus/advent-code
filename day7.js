const fs = require("fs");

function getInput() {
  const filename = process.argv[2];
  const input = fs.readFileSync(`${__dirname}/${filename}`, "utf8");
  const lines = input.trim().split("\n");
  return lines;
}

function run() {
  const input = getInput();
  const graph = buildGraph(input)
  const { stepOrder, totalTime } = findOrder(graph)
  console.log("Part1:", stepOrder);
  console.log("Part2:", totalTime);
}

function buildGraph(input) {
  const steps = input.map(step => {
    const items = step.split(' ')
    return [items[1], items[7]]
  })
  const allSteps = {}
  for(let i = 0; i < steps.length; i++) {
    const step = steps[i]
    const before =  step[0]
    const after = step[1]
    if (!allSteps[before]) {
      allSteps[before] = []
    }
    if (!allSteps[after]) {
      allSteps[after] = [before]
    } else {
      allSteps[after].push(before)
    }
  }

  const ids = Object.keys(allSteps);
  const stepArray = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    stepArray.push({
      id,
      prereqs: allSteps[id]
    });
  }
  return stepArray.sort(compare)
}

function compare(a, b) {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

function findOrder(graph) {
  let stepOrder = ''
  let totalTime = 0
  let workInProgress = []
  while (graph.length || workInProgress.length) {
    const nextStepIndex = graph.findIndex((step) => {
      return step.prereqs.length === 0
    })
    if (nextStepIndex !== -1 && workInProgress.length < 5) {
      const nextStep = graph[nextStepIndex]
      const nextStepId = nextStep.id
      workInProgress.push({
        task: nextStepId,
        timeRemaining: TIMES[nextStepId]
      })
      graph.splice(nextStepIndex, 1)
      stepOrder += nextStepId
    } else {
      workInProgress = workInProgress.sort(timeCompare)
      const time = workInProgress[0].timeRemaining
      const finishedTask = workInProgress[0].task
      totalTime += time
      workInProgress.splice(0,1)
      for(let i = 0; i < workInProgress.length; i++) {
        workInProgress[i].timeRemaining -= time
      }
      purgeIdFromGraph(graph, finishedTask)
    }
  }
  return { stepOrder, totalTime }
}

function purgeIdFromGraph(graph, idToRemove) {
  for (let i = 0; i < graph.length; i++) {
    const node = graph[i]
    const idIndex = node.prereqs.findIndex((id) => {
      return id === idToRemove
    })
    if (idIndex !== -1) {
      node.prereqs.splice(idIndex, 1)
    }
  }
}

const TIMES = {
  'A': 61,
  'B': 62,
  'C': 63,
  'D': 64,
  'E': 65,
  'F': 66,
  'G': 67,
  'H': 68,
  'I': 69,
  'J': 70,
  'K': 71,
  'L': 72,
  'M': 73,
  'N': 74,
  'O': 75,
  'P': 76,
  'Q': 77,
  'R': 78,
  'S': 79,
  'T': 80,
  'U': 81,
  'V': 82,
  'W': 83,
  'X': 84,
  'Y': 85,
  'Z': 86
}

function timeCompare(a, b) {
  if (a.timeRemaining < b.timeRemaining) return -1;
  if (a.timeRemaining > b.timeRemaining) return 1;
  return 0;
}

run();