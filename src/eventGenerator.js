function events(events_count, event_name) {
  events_count = events_count || getRandomInt(2, 1000);
  const uid = Date.now();
  return Array.from({length: events_count}, (_, i) => (
      {
        messageId: uid + i, type: 'track', event: event_name || `Video Heartbeat ${uid + i}`,
        source: 'android'
      }
    )
  )
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export {events};