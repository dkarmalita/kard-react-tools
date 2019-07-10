process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools,
} = global.context;

const npx = tools.require('utils/npx');
const configFilePath = tools.resolve('jest.config');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/jest');
  return npx([
    app,
    `--config=${configFilePath}`,
    ...args,
  ]);
};
