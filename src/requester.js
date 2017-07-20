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

function requestEventsAsync(dispatch, callback) {
  fetch('http://127.0.0.1:8881/')
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


export { requestEventsAsync, requestEventsSync };
