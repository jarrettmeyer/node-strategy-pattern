'use strict';

const login = require('./login');

let username = process.argv[2];
let password = process.argv[3];

return login(username, password);
