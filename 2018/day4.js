const fs = require("fs");

function getInput() {
  const filename = process.argv[2];
  const input = fs.readFileSync(`${__dirname}/${filename}`, "utf8");
  const lines = input.trim().split("\n");
  return lines;
}

function run() {
  const input = getInput();
  const parsedInput = input.map(parseData);
  const sortedInput = parsedInput.sort(compare);
  const guardData = buildGuardData(sortedInput);
  console.log("Sleepiest Guard (total):", determineSleepiestGuardByTotal(guardData));
  console.log("Sleepiest Guard (minute):", determineSleepiestGuardByMinute(guardData));
}

function compare(a, b) {
  if (a.time < b.time) return -1;
  if (a.time > b.time) return 1;
  return 0;
}

function buildGuardData(sortedInput) {
  const guardData = {};
  let currentGuard = "????";
  for (let i = 0; i < sortedInput.length; i++) {
    const data = sortedInput[i];
    const { action, guardId, time } = data;

    if (guardId) {
      currentGuard = guardId;
      if (!guardData[guardId]) {
        const sleepByMinute = [];
        for (let num = 0; num < 60; num++) {
          sleepByMinute[num] = 0;
        }
        guardData[guardId] = { totalSleep: 0, sleepByMinute };
      }
    } else if (action === "sleep") {
      console.log(`${currentGuard} fell asleep at ${time.getMinutes()}`);
      const currentMinutes = time.getMinutes();
      const next = sortedInput[i + 1];
      const nextMinutes = next.time.getMinutes();
      const end = nextMinutes > currentMinutes ? nextMinutes : 60;
      for (let minute = currentMinutes; minute < end; minute++) {
        guardData[currentGuard].sleepByMinute[minute] += 1;
      }
      guardData[currentGuard].totalSleep += nextMinutes - currentMinutes;
    }
  }
  return guardData;
}

function parseData(data) {
  const values = data.split(" ");
  const timestamp = [
    values[0].replace("[", ""),
    values[1].replace("]", "")
  ].join(" ");
  const time = new Date(timestamp);
  let action, guardId;
  if (values.indexOf("begins") !== -1) {
    action = "start";
    guardId = values[3];
  } else if (values.indexOf("asleep") !== -1) {
    action = "sleep";
  } else if (values.indexOf("wakes") !== -1) {
    action = "wake";
  }
  return {
    time,
    guardId,
    action
  };
}

function determineSleepiestGuardByTotal(guardData) {
  const ids = Object.keys(guardData);
  const guardDataArray = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    guardDataArray.push({
      id,
      totalSleep: guardData[id].totalSleep,
      sleepByMinute: guardData[id].sleepByMinute
    });
  }
  const sortedGuardData = guardDataArray.sort(guardCompare);
  const sleepiest = sortedGuardData[0];
  const sleepiestMinute = sleepiest.sleepByMinute.indexOf(
    Math.max(...sleepiest.sleepByMinute)
  );
  return { guardId: sleepiest.id, sleepiestMinute };
}

function guardCompare(a, b) {
  if (a.totalSleep > b.totalSleep) return -1;
  if (a.totalSleep < b.totalSleep) return 1;
  return 0;
}

function determineSleepiestGuardByMinute(guardData) {
  const ids = Object.keys(guardData);
  const guardDataArray = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    guardDataArray.push({
      id,
      totalSleep: guardData[id].totalSleep,
      sleepByMinute: guardData[id].sleepByMinute
    });
  }
  const sortedGuardData = guardDataArray.sort(guardCompareByMinute);
  const sleepiest = sortedGuardData[0];
  const sleepiestMinute = sleepiest.sleepByMinute.indexOf(
    Math.max(...sleepiest.sleepByMinute)
  );
  return { guardId: sleepiest.id, sleepiestMinute };

}

function guardCompareByMinute(a, b) {
  const sleepiestMinuteA = Math.max(...a.sleepByMinute)
  const sleepiestMinuteB = Math.max(...b.sleepByMinute)
  if (sleepiestMinuteA > sleepiestMinuteB) return -1;
  if (sleepiestMinuteA < sleepiestMinuteB) return 1;
  return 0;
}

run();
