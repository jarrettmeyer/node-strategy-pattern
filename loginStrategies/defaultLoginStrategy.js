'use strict';
const Promise = require('bluebird');

class DefaultLoginStrategy {

  // The default strategy always fails.
  login() {
    return Promise.resolve({ strategy: 'default', success: false });
  }

  // This always returns true. It must be registered last.
  useStrategy() {
    return true;
  }

}

let defaultLoginStrategy = new DefaultLoginStrategy();
module.exports = defaultLoginStrategy;
