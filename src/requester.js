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
  // get(url,
  //     onSuccess: function(data) {
  //       dispatch({ type: 'ADD_CHUNK', payload: data});
  //       callback();
  //     }
  // )
}


export { requestEventsAsync, requestEventsSync };
