import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  events:[],
  timer: { buttonText:'start', isStarted: false }
};

function startTimer(){
  return { buttonText:'stop', isStarted: true  };
}

function stopTimer(){
  return { buttonText:'start', isStarted: false};
}


function reducer(state = initialState, action){
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

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
   document.getElementById('root'));
registerServiceWorker();
