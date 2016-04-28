'use strict';

const Promise = require('bluebird');
const users = require('../users.json');

class DatabaseLoginStrategy {

  login(username, password) {
    let loginResult = { success: false, strategy: 'database', username: username };
    let user = users.filter(u => { return u.username === username; })[0];
    if (!user) {
      loginResult.error = 'Invalid Credentials';
      return Promise.resolve(loginResult);
    }
    if (user.password !== password) {
      loginResult.error = 'Invalid Credentials';
      return Promise.resolve(loginResult);
    }
    loginResult.id = user.id;
    loginResult.success = true;
    return Promise.resolve(loginResult);
  }

  useStrategy() {
    return process.env['LOGIN_METHOD'] === 'DB';
  }
}

let databaseLoginStrategy = new DatabaseLoginStrategy();
module.exports = databaseLoginStrategy;
