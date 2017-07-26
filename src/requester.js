function events() {
  const uid = Number(new Date());
  return [
    { id: uid, type: 'track', event: `Video Heartbeat ${uid}`, source: 'android' },
    { id: uid + 1, type: 'track', event: `Video Heartbeat ${uid + 1}`, source: 'android' },
    { id: uid + 2 , type: 'track', event: `Video Heartbeat ${uid + 2}`, source: 'android' }
  ];
}

function requestEventsSync(dispatch, callback){
  dispatch({ type: 'ADD_CHUNK', payload: events() });
  callback();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function requestEventsAsync(dispatch, callback) {
  fetch(`http://127.0.0.1:8881/?events_count=${getRandomInt(2, 100)}`)
  .then(response => response.json())
  .then(json => {
    dispatch({ type: 'ADD_CHUNK', payload: json.events });
    callback();
  })
  .catch(error => {
    console.log(error);
    callback();
  });
}

function requestKinesis(dispatch, callback) {
  requestShardIterator((shardIteratorID) => {
    const url = "https://dsfuupgo82.execute-api.eu-west-1.amazonaws.com/Test/streams/myStream/records";
    fetch(url, {mode: "cors", headers: new Headers({"Shard-Iterator": shardIteratorID})})
      .then(response => response.json())
      .then(json => {
        const records = json.Records.map(e => atob(e.Data));
        console.log(records);
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


export { requestEventsAsync, requestEventsSync, requestKinesis };
