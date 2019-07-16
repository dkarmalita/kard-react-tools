const fs = require('fs');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools, target, config,
} = global.context;

const npx = tools.require('utils/npx');
const configFilePath = tools.resolve('config/eslint');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/eslint');

  // base eslint args to use
  const baseArgs = [
    '--config', configFilePath,
    'src',
    // '--ignore-path', '.gitignore',
    '-f', 'table',
    '--ext', '.js', '--ext', '.jsx',
  ];

  // if lintIgnore array exist, select the latest existiong
  // file of it and take it as '--ignore-path' value
  // NOTE: we can't use several files here, so the latest
  // is the best option avaliable
  let ignoreFileSelected = null;
  if (Array.isArray(config.lintIgnore)) {
    config.lintIgnore.forEach(((targetFileName) => {
      if (fs.existsSync(target.path(targetFileName))) {
        ignoreFileSelected = targetFileName;
      }
    }));
  }

  if (ignoreFileSelected) {
    baseArgs.push('--ignore-path');
    baseArgs.push(ignoreFileSelected);
  }

  // run eslint
  return npx([
    app,
    ...baseArgs,
    ...args,
  ]);
};
