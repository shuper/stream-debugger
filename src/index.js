import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';
import requestEventsAsync from './lib/requester';

ReactDOM.render(
  <Provider store={store}>
    <App requestEventsAsync={requestEventsAsync} />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
