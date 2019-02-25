'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const npx = require('../utils/npx');
const { tools } = require('../utils/resolver');
const configFilePath = require.resolve('../config/eslint.config')

// eslint src --ext .js --ext .jsx
// eslint -c ~/my-eslint.json file.js
module.exports = function({ args }={ args:[] }){
  const app = tools.resolve('node_modules/.bin/eslint')
  return npx([
    app,
    '--config', configFilePath,
    'src',
    '-f', 'table',
    '--ext', '.js', '--ext', '.jsx',
    // '--mode=production',
    ...args,
  ])
}
