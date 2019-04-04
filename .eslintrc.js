const createConfig = require('./babel.config.js')

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: createConfig(),
  /* babel-eslint config
     ref: https://github.com/babel/babel-eslint#additional-parser-configuration
   */
  env: {
    browser: true,
    node: true
  }
};
