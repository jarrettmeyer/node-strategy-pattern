'use strict';
const Promise = require('bluebird');
const users = require('../users.json');

class TestLoginStrategy {

  login(username, password) {
    let loginResult = { stragegy: 'test', success: false, username: username };

    let user = users.filter(u => { return u.username === username; })[0];
    if (!user) {
      loginResult.error = 'Invalid Credentials';
      return Promise.resolve(loginResult);
    }

    // As long as the password is 'test', this passes.
    if (password === 'test') {
      loginResult.success = true;
      return Promise.resolve(loginResult);
    }
    else {
      loginResult.success = false;
      return Promise.resolve(loginResult);
    }
  }

  useStrategy() {
    return process.env['NODE_ENV'] === 'test';
  }

}

let testLoginStrategy = new TestLoginStrategy();
module.exports = testLoginStrategy;
