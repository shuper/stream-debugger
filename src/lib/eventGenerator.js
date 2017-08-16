function generateEvents(eventsCount, eventName) {
  const count = eventsCount || getRandomInt({
    from: 2,
    to: 500});
  const uid = Date.now();
  return Array.from({length: count}, (_, i) => ({
    messageId: uid + i,
    type: 'track',
    event: eventName || `Video Heartbeat ${uid + i}`,
    source: 'android',
  }));
}

function getRandomInt({from, to}) {
  return Math.floor(Math.random() * (to - from)) + from;
}

export {generateEvents};
