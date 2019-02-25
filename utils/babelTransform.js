'use strict';
const babelJest = require('babel-jest');
const { target, tools } = require('../utils/resolver');

module.exports = babelJest.createTransformer({
  presets: [ tools.resolve('utils/babel-preset-tools') ],
  babelrc: false,
});
