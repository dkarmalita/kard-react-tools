process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const npx = require('../utils/npx');
const { tools } = require('../utils/resolver');

const babelPreset = tools.resolve('utils/babel-preset-tools');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('node_modules/.bin/babel');
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
