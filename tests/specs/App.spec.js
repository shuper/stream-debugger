import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import App from  '../../src/App';
import store from '../../src/store';

async function requestEventsAsync() {
  const id = Math.random().toString();
  return {events: [{
    id,
    messageId: id,
    type: 'track',
    event: 'Video Heartbeat 1'}],
  };
}

describe('App', () => {
  function app() {
    return mount(<Provider store={store}><App requestEventsAsync={requestEventsAsync}/></Provider>);
  }

  it('renders self and subcomponents', () => {
    const appWrapper = app();
    expect(appWrapper.find('#App')).to.have.lengthOf(1);
    expect(appWrapper.find('#chart')).to.have.lengthOf(1);
    expect(appWrapper.find('#events-list')).to.have.lengthOf(1);
    expect(appWrapper.find('#switcher')).to.have.lengthOf(1);
  });


  it.skip('populates list', () => {
    const appWrapper = app();
    const switcher = appWrapper.find('#switcher');
    expect(appWrapper.find('#events-list').find('.DebuggerListItem')).to.have.lengthOf(0);
    expect(switcher.simulate('click'));
    expect(async () => appWrapper.find('#events-list').find('.DebuggerListItem'))
      .to.not.have.lengthOf(0);
  });
});
