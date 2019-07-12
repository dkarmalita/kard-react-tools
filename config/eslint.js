require('../lib/context');

const {
  tools,
} = global.context;

const createConfig = require('./babel.js');

module.exports = {
  extends: tools.resolve('eslint-config-airbnb'),
  parser: tools.resolve('babel-eslint'),
  parserOptions: createConfig(),
  /* babel-eslint config
     ref: https://github.com/babel/babel-eslint#additional-parser-configuration
   */
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.scss',
      '.css',
      // '.ts',
    ],
  },
};
