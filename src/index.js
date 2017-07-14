import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

function events(){
  const uid = Number(new Date());
  return [
    { id: uid, type: 'track', event: `Video Heartbeat ${uid}`, source: 'android' },
    { id: uid + 1, type: 'track', event: `Video Heartbeat ${uid + 1}`, source: 'android' },
    { id: uid + 2 , type: 'track', event: `Video Heartbeat ${uid + 2}`, source: 'android' }
  ];
}

function requestNewChunk(){
  console.log('new request');

  store.dispatch({
    type: 'ADD_CHUNK',
    payload: events()
  });

  console.log(store.getState());
}



function reducer(state = [], action){
  switch (action.type) {
    case 'ADD_CHUNK':
      return [...action.payload, ...state].slice(0, 11)
    default:
      return state
  }
}

const store = createStore(reducer);

requestNewChunk();

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
   document.getElementById('root'));
registerServiceWorker();
