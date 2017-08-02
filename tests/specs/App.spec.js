import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from  '../../src/App'


describe('App', () => {
  function app() {
    return shallow(<App  />);
  }

  it('should render self and subcomponents', () => {
    const appWrapper = app();
    expect(appWrapper).to.have.lengthOf(1);
    expect(appWrapper.find('#chart')).to.have.lengthOf(1);
    expect(appWrapper.find('#events-list')).to.have.lengthOf(1);
    expect(appWrapper.find('#switcher')).to.have.lengthOf(1);
  });

});
