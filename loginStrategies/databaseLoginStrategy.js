'use strict';

const Promise = require('bluebird');

const users = [
  // Always store hashed passwords in your database. This is just a
  // demo. That's why the users array is stored in memory.
  { id: 1, username: 'alice', password: 's3cr3t' },
  { id: 2, username: 'betty', password: 'b@c0n' },
  { id: 3, username: 'claire', password: 'p@ssw0rd' },
  { id: 4, username: 'diane', password: 'c0ff33' },
  { id: 5, username: 'eleanor', password: 'h@sh1ng' }
];

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
