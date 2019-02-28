process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const npx = require('../utils/npx');
const { tools } = require('../utils/resolver');

const configFilePath = require.resolve('../config/webpack.config');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/webpack');
  return npx([
    app,
    '--config', configFilePath,
    '--mode=production',
    ...args,
  ]);
};
