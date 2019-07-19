process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools,
} = global.context;

const npx = tools.require('lib/npx');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/tsc');
  return npx([
    app,
    '-p', tools.require('config/tsc.config.js')(),
    ...args,
  ]);
};
