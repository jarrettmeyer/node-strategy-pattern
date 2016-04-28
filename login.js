'use strict';
const loginStrategies = require('./loginStrategies');

function selectLoginStrategy() {
  let strategies = Object.keys(loginStrategies);
  for (let i = 0; i < strategies.length; i++) {
    let strategy = loginStrategies[strategies[i]];
    if (strategy.useStrategy()) {
      return strategy;
    }
  }
}

function login(username, clearPassword) {
  let loginStrategy = selectLoginStrategy();
  return loginStrategy.login(username, clearPassword)
    .then(loginResult => {
      console.log(JSON.stringify(loginResult, null, 2));
      return loginResult;
    });
}


module.exports = login;
