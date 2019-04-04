const createConfig = require('./babel.config.js')

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: createConfig(),
};

console.log(require('eslint-config-airbnb'))
