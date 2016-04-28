// As with all strategy registries, order matters. Once we find a strategy to use,
// we will not keep looking for more strategies. For this reason, I put the test
// strategy first and the default strategy last.

module.exports = {
  testLoginStrategy: require('./testLoginStrategy'),
  activeDirectoryLoginStrategy: require('./activeDirectoryLoginStrategy'),
  databaseLoginStrategy: require('./databaseLoginStrategy'),
  defaultLoginStrategy: require('./defaultLoginStrategy')
};
