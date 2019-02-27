process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const npx = require('../utils/npx');
const { tools } = require('../utils/resolver');

const configFilePath = tools.resolve('config/jest.config');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('node_modules/.bin/jest');
  return npx([
    app,
    `--config=${configFilePath}`,
    ...args,
  ]);
};
