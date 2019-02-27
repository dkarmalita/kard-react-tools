const { tools } = require('../utils/resolver');

const babelJest = tools.require('node_modules', 'babel-jest');

module.exports = babelJest.createTransformer({
  presets: [tools.resolve('utils/babel-preset-tools')],
  babelrc: false,
});
