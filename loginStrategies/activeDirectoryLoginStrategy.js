'use strict';
const ldap = require('ldapjs');
const Promise = require('bluebird');

// Get AD variables - host, port, and bind variables - from the environment settings.
const host = process.env['AD_HOST'] || 'ldap.forumsys.com';
const port = process.env['AD_PORT'] || 389;
const additionalLdapBindVars = process.env['AD_LDAP_BIND_VARS'] || ',dc=example,dc=com';

// Create an LDAP client.
const connectionUrl = `ldap://${host}:${port}`;
const client = ldap.createClient({ url: connectionUrl });

class ActiveDirectoryLoginStrategy {

  login(username, password) {
    var _this = this;
    let dn = `uid=${username}${additionalLdapBindVars}`;
    let loginResult = { dn: dn, host: host, port: port, success: false, strategy: 'active directory' };
    return new Promise(resolve => {
      client.bind(dn, password, function (error) {
        if (error) {
          _this._onError(loginResult, error, resolve);
        }
        client.search(dn, { }, function (error, search) {
          if (error) {
            _this._onError(loginResult, error, resolve);
          }
          search.on('searchEntry', function (entry) {
            _this._onSearchEntry(loginResult, entry, resolve);
          });
          search.on('error', function (error) {
            _this._onError(loginResult, error, resolve);
          });
          search.on('end', function() {
            _this._onSearchEnd(loginResult, resolve);
          });
        });
      });
    });
  }

  useStrategy() {
    return process.env['LOGIN_METHOD'] === 'AD';
  }

  _onError(loginResult, error, resolve) {
    loginResult.success = false;
    loginResult.error = error;
    client.unbind();
    return resolve(loginResult);
  }

  _onSearchEnd(loginResult, resolve) {
    client.unbind();
    return resolve(loginResult);
  }

  _onSearchEntry(loginResult, entry, resolve) {
    loginResult.success = true;
    loginResult.objectName = entry.objectName;
    loginResult.entry = entry.object;
    return resolve(loginResult);
  }

}

let activeDirectoryLoginStrategy = new ActiveDirectoryLoginStrategy();
module.exports = activeDirectoryLoginStrategy;
