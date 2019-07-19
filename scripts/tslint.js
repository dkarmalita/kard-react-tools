const fs = require('fs');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools, target, config, argv,
} = global.context;

const npx = tools.require('utils/npx');
const configFilePath = tools.resolve('config/tslint');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/tslint');

  // base eslint args to use
  const baseArgs = [
    '--config', configFilePath,
    `${argv.lintSource || config.lintSource}/**/*.ts`,
    `${argv.lintSource || config.lintSource}/**/*.tsx`,
    '--format', 'stylish', // codeFrame
    // argv.lintSource || config.lintSource,
    // // '-f', 'table',
    // '--ext', '.ts',
    // '--ext', '.tsx',
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
    baseArgs.push('--exclude');
    baseArgs.push(ignoreFileSelected);
  }

  // const lsIndex = args.indexOf('--lintSource');
  // if (lsIndex > -1) {
  //   args.splice(lsIndex, 2);
  // }

  // console.log(args)

  // run eslint
  return npx([
    app,
    ...baseArgs,
    ...args,
  ]);
};
