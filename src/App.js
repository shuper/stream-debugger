import React, {Component} from 'react';
import logo from './assets/logo.svg';
import './assets/App.css';
import EventList from './containers/EventList';
import Switcher from './containers/Switcher';
import {sendEventToKinesis} from './lib/requester';
import EventsChart from './containers/EventsChart';
import {generateEvents} from './lib/eventGenerator';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    const onClick = () => sendEventToKinesis(generateEvents(1, 'header click')[0])
      .catch(e => console.log('Error sending an event', e));
    // const onMouseMove = (e) => sendEventToKinesis(generateEvents(1, `header mouse move: (${e.screenX}, ${e.screenY})`)[0]);
    const onMouseMove = () => {};
    return (
      <div id="App" className="App">
        <div className="App-header" onClick={onClick} onMouseMove={onMouseMove}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="HeaderTitle">SIH Debugger</h1>
        </div>

        <EventsChart id="chart"/>

        <div className="DebuggerToolbar">
          <Switcher id="switcher" requestEventsAsync={this.props.requestEventsAsync} />
        </div>

        <EventList id="events-list"/>
      </div>
    );
  }
}

App.propTypes = {
  requestEventsAsync: PropTypes.func,
};

export default App;
