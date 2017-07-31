function startTimer(){
  return { buttonText:'stop', isStarted: true  };
}

function stopTimer(){
  return { buttonText:'start', isStarted: false};
}

function reducer(state, action){
  switch (action.type) {
    case 'ADD_CHUNK':
      return {
        ...state,
        events: [...action.payload.events, ...state.events].slice(0, 11),
        eventCounts: [...state.eventCounts, action.payload.events.length],
        shardIterator: action.payload.shardIterator
      };
    case 'TOGGLE_TIMER':
      return {
        ...state,
        timer: state.timer.isStarted ? stopTimer() : startTimer(),
        shardIterator: null
      };
    default:
      return state
  }
}

export default reducer;
