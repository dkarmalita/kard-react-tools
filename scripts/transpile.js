'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const npx = require('../utils/npx');
const { tools } = require('../utils/resolver');
const configFilePath = tools.resolve('config/babel.config')
const babelPreset = tools.resolve('utils/babel-preset-tools')

// babel src -d dist  --source-maps inline --copy-files
// npx babel src -d dist  --source-maps inline --copy-files --config-file ./config/babel.config.js
// https://github.com/babel/babel/issues/8919
module.exports = function({ args }={ args:[] }){
  const app = tools.resolve('node_modules/.bin/babel')
  return npx([
    app,
    '--no-babelrc',
    'src', '-d', 'dist',
    `--presets=${babelPreset}`,
    // '--source-maps', 'inline',
    // '--copy-files',
    // `--config-file ${configFilePath}`,
    ...args,
  ])
}
