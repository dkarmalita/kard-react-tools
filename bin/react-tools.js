#!/usr/bin/env node

'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const chalk = require('chalk')

const { tools } = require('../utils/resolver');
const packageJson = tools.require('package.json');

const log = require('../utils/logger');
log.info(chalk.cyan(`${packageJson.name} [ver. ${packageJson.version}]`))

const script = process.argv[2]
const args = process.argv.slice(3);
log.info(`script: '${script}',`, `args:`, args)

const scripts = {
  build: require('../scripts/build'),
  eslint: require('../scripts/eslint'),
  jest: require('../scripts/jest'),
  serve: require('../scripts/serve'),
  transpile: require('../scripts/transpile'),
}

if(!scripts[script]){
  log.error('Unknown script:', chalk.cyan(`${script}`))
  process.exit()
}

scripts[script]({args})

