process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const { tools } = require('../utils/resolver');

const npx = tools.require('utils/npx');
const babelPreset = tools.resolve('utils/babel-preset-tools');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/babel');
  return npx([
    app,
    '--no-babelrc',
    'src', '-d', 'dist',
    `--presets=${babelPreset}`,
    // '--source-maps', 'inline',
    // '--copy-files',
    // `--config-file ${configFilePath}`,
    ...args,
  ]);
};
