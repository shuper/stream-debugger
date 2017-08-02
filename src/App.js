import React, {Component} from 'react';
import logo from './assets/logo.svg';
import './assets/App.css';
import EventList from './containers/EventList'
import Switcher from './containers/Switcher'
import {sendEventToKinesis} from './lib/requester'
import EventsChart from './containers/EventsChart'


class App extends Component {
  render() {
    // const onMouseMove = (e) => sendEventToKinesis(`header mouse move: (${e.screenX}, ${e.screenY})`);
    const onMouseMove = (e) => {};
    return (
      <div className="App">
        <div className="App-header" onClick={() => sendEventToKinesis("header click")} onMouseMove={onMouseMove}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="HeaderTitle">SIH Debugger</h1>
        </div>

        <EventsChart id="chart"/>

        <div className="DebuggerToolbar">
          <Switcher id="switcher" />
        </div>

        <EventList id="events-list"/>
      </div>
    );
  }
}

export default App;
