process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools,
} = global.context;

const npx = tools.require('utils/npx');
const configFilePath = tools.resolve('config/eslint');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/eslint');
  return npx([
    app,
    '--config', configFilePath,
    'src',
    // '--ignore-path', '.gitignore',
    '-f', 'table',
    '--ext', '.js', '--ext', '.jsx',
    // '--mode=production',
    ...args,
  ]);
};
