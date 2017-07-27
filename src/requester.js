function events(events_count) {
  events_count = events_count || getRandomInt(2, 100);
  const uid = Date.now();
  return Array.from({length: events_count}, (_, i) => (
      {messageId: uid + i, type: 'track', event: `Video Heartbeat ${uid + i}`, source: 'android'}
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
  return records ? records.map(e => JSON.parse(atob(e.Data))) : [];
}

function requestKinesis(dispatch, callback) {
  requestShardIterator((shardIteratorID) => {
    const url = "https://dsfuupgo82.execute-api.eu-west-1.amazonaws.com/Test/streams/myStream/records";
    fetch(url, {mode: "cors", headers: new Headers({"Shard-Iterator": shardIteratorID})})
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const records = parseRecords(json.Records);
        dispatch({type: 'ADD_CHUNK', payload: records});
        callback();
      })
  })
}

function requestShardIterator(callback) {
  const url = "https://dsfuupgo82.execute-api.eu-west-1.amazonaws.com/Test/streams/myStream/sharditerator?shard-id=shardId-000000000000";
  fetch(url)
    .then(response => response.json())
    .then(json => callback(json.ShardIterator))
    .catch(error => {
      console.log("requestShardIterator", error)
    })
}


export {requestEventsAsync, requestEventsSync, requestKinesis};
