'use strict';

import jsdom from 'jsdom';

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;
global.FormData = window.FormData;
global.btoa = window.btoa;
global.atob = window.atob;

// It's common practice includging this, however I'm not sure where it is helpfull:
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = window[property];
//   }
// });

function noop() {
  return {};
}

// prevent mocha tests from breaking when trying to require a css file
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
require('isomorphic-fetch');
