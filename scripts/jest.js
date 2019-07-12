process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools,
} = global.context;

const npx = tools.require('lib/npx');
const configFilePath = tools.resolve('config/jest');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/jest');
  return npx([
    app,
    `--config=${configFilePath}`,
    ...args,
  ]);
};
