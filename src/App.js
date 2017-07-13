import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux'

function reducer(state = [], action){
  switch (action.type) {
    case 'ADD_CHUNK':
      return [...action.payload, ...state].slice(0, 11)
    default:
      return state
  }
}

const store = createStore(reducer);

function events(){
  const uid = Number(new Date());
  return [
    { id: uid, type: 'track', event: `Video Heartbeat ${uid}`, source: 'android' },
    { id: uid + 1, type: 'track', event: `Video Heartbeat ${uid + 1}`, source: 'android' },
    { id: uid + 2 , type: 'track', event: `Video Heartbeat ${uid + 2}`, source: 'android' }
  ];
}


class List extends Component {
  rerender(){
    console.log('rerender');
    this.forceUpdate();
  }
  componentDidMount(){
    store.subscribe(() => this.rerender());
  }

  render() {
    const listItems = store.getState().map((event) =>
     <li key={event.id.toString()}>
       {event.event}
     </li>)

     console.log(listItems);
     return (
       <ul>{listItems}</ul>
     );
  }
}

function requestNewChunk(){
  console.log('new request');

  store.dispatch({
    type: 'ADD_CHUNK',
    payload: events()
  });

  console.log(store.getState());
}

requestNewChunk();

class App extends Component {
  render() {
    return (
      <div className="App" onClick={ requestNewChunk }>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <List />
      </div>
    );
  }
}

export default App;
