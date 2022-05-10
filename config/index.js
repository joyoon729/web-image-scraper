const defaultConfig = require('./defaultConfig');
const handleArgv = require('./handleArgv');
const getTestConfig = require('./getTestConfig');

if (process.env.NODE_ENV === 'test') {
  config = getTestConfig();
  module.exports = config;
} else {
  config = handleArgv(defaultConfig);
  module.exports = config;
}