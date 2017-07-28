import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import EventList from './containers/EventList'
import Timer from './containers/Timer'
import {requestEventsAsync, sendEventToKinesis} from './requester'
import EventsChart from './containers/EventsChart'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header" onClick={() => sendEventToKinesis("header click")}
             onMouseMove={(e) => sendEventToKinesis(`header mouse move: (${e.screenX}, ${e.screenY})`)}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="HeaderTitle">SIH Debugger</h1>
        </div>

        <EventsChart />

        <div className="DebuggerToolbar">
          <Timer onTick={requestEventsAsync} />
        </div>

        <EventList />
      </div>
    );
  }
}

export default App;
