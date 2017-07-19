import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventList from './containers/EventList'
import Timer from './containers/Timer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Timer />
        <EventList />
      </div>
    );
  }
}

export default App;
