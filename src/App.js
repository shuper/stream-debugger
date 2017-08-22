import React, {Component} from 'react';
import './assets/App.css';
import EventList from './containers/EventList';
import Switcher from './containers/Switcher';
import EventsChart from './containers/EventsChart';
import ReceivedCounter from './containers/ReceivedCounter';
import SentCounter from './containers/SentCounter';
import EventSender from './containers/EventSender';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <div id="App" className="App">
        <EventSender />

        <EventsChart id="chart"/>

        <div className="DebuggerToolbar">
          <Switcher id="switcher" requestEventsAsync={this.props.requestEventsAsync} />
          <ReceivedCounter id="ReceivedCounter" />
          <SentCounter id="SentCounter" />
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
