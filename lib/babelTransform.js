require('../lib/context');

const {
  tools,
} = global.context;

const babelJest = tools.require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [tools.resolve('lib/babel-preset')],
  babelrc: false,
});
