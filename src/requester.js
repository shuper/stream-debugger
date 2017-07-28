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

function requestEventsSync(dispatch, callback) {
  dispatch({type: 'ADD_CHUNK', payload: events()});
  callback();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function requestEventsAsync(dispatch, callback) {
  const data = new FormData();
  data.append("json", JSON.stringify(events()));
  fetch(`http://127.0.0.1:8881/`, {
    method: "POST",
    body: JSON.stringify(events())
  }).then(response => response.json())
    .then(json => {
      dispatch({type: 'ADD_CHUNK', payload: parseRecords(json.Records)});
      callback();
    })
    .catch(error => {
      console.log(error);
      callback();
    });
}

function parseRecords(records) {
  return records ? records.map(e => {
      const j = JSON.parse(atob(e.Data));
      return {...j, id: e.SequenceNumber}
    }
  ) : [];
}

function requestKinesis(dispatch, callback, options) {
  requestShardIterator((shardIteratorID) => {
    const url = streamUrl() + "records";
    fetch(url, {mode: "cors", headers: new Headers({"Shard-Iterator": shardIteratorID})})
      .then(response => response.json())
      .then(json => {
        try {
          console.log(json);
          const records = parseRecords(json.Records);
          dispatch({type: 'ADD_CHUNK', payload: records});
          callback({nextShardIterator: json.NextShardIterator});
        } catch (e) {
          console.log("requestKinesis>then" + e)
        }
      })
      .catch(error => {
        console.log("requestKinesis" + error);
        callback();
      });
  }, options)
}

function requestShardIterator(callback, options) {
  if (options && options.nextShardIterator) {
    return callback(options.nextShardIterator)
  }
  const url = streamUrl() +
    "sharditerator?" +
    "shard-id=shardId-000000000000" +
    "&type=LATEST";
  fetch(url)
    .then(response => response.json())
    .then(json => callback(json.ShardIterator))
    .catch(error => {
      console.log("requestShardIterator", error)
    })
}

function streamUrl() {
  return "https://dsfuupgo82.execute-api.eu-west-1.amazonaws.com/Test/streams/myStream/";
}

function sendEventToKinesis(eventName) {
  fetch(streamUrl() + 't', {
    method: "POST",
    body: JSON.stringify(events(1, eventName)[0] )
  }).then(response => response.json())
    .then(json => console.log("An event has been sent", json))
    .catch(e => console.log("Error sending an event", e))
}

export {requestEventsAsync, requestEventsSync, requestKinesis, sendEventToKinesis};
