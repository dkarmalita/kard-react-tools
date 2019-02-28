#!/usr/bin/env node

process.on('unhandledRejection', (err) => {
  throw err;
});

const chalk = require('chalk');

const { tools } = require('../utils/resolver');

const packageJson = tools.require('package.json');

const log = require('../utils/logger');

log.info(chalk.cyan(`${packageJson.name} [ver. ${packageJson.version}]`));

const script = process.argv[2];
const args = process.argv.slice(3);
log.info(`script: '${script}',`, 'args:', args);

const scripts = {
  _dev: tools.require('scripts/_dev'),
  build: tools.require('scripts/build'),
  eslint: tools.require('scripts/eslint'),
  jest: tools.require('scripts/jest'),
  serve: tools.require('scripts/serve'),
  transpile: tools.require('scripts/transpile'),
};

if (!scripts[script]) {
  log.error('Unknown script:', chalk.cyan(`${script}`));
  process.exit();
}

scripts[script]({ args });
