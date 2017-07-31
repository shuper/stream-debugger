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
        events: [...action.payload, ...state.events].slice(0, 11),
        eventCounts: [...state.eventCounts, action.payload.length]
      };
    case 'TOGGLE_TIMER':
      return {
        ...state,
        timer: state.timer.isStarted ? stopTimer() : startTimer(),
      };
    default:
      return state
  }
}

export default reducer;
