export function generateUniqueId() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const random = Math.floor(Math.random() * 10000); // Generate a random number
  return `${timestamp}-${random}`;
}
export function newTimer(attrs = {}) {
  const timer = {
    title: attrs.title || "Timer",
    project: attrs.project || "Project",
    // id: generateUniqueId(), // eslint-disable-line no-undef
    elapsed: 0
  };

  return timer;
}

export function findById(array, id, cb) {
  array.forEach((el) => {
    if (el.id === id) {
      cb(el);
      return;
    }
  });
}

export function renderElapsedString(elapsed, runningSince) {
  let totalElapsed = elapsed;
  if (runningSince) {
    totalElapsed += Date.now() - runningSince;
  }
  return millisecondsToHuman(totalElapsed);
}

export function millisecondsToHuman(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2)
  ].join(":");

  return humanized;
}

export function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}

// return {
//   millisecondsToHuman,
//   newTimer,
//   findById,
//   renderElapsedString
// };
