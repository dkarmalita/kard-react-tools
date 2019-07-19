process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools,
} = global.context;

const npx = tools.require('lib/npx');
const babelPreset = tools.resolve('lib/babel-preset');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/babel');
  return npx([
    app,
    '--no-babelrc',
    'src',
    '-d', 'dist',
    `--presets=${babelPreset}`,
    // '--source-maps', 'inline',
    // '--copy-files',
    // `--config-file ${configFilePath}`,
    ...args,
  ]);
};
