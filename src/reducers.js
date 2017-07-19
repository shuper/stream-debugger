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
        events: [...action.payload, ...state.events].slice(0, 11)
      };
    case 'TOGGLE_TIMER':
      return {
        ...state,
        timer: state.timer.isStarted ? stopTimer() : startTimer(),
      };
    case 'TICK':
      return {
        ...state,
        timer: { ...state.timer, id: action.payload.id },
      };
    default:
      return state
  }
}

export default reducer;
