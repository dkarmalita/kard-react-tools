#!/usr/bin/env node

// setup the whole global envirament context for all of the scripts used.
require('../lib/context');

const {
  args,
  chalk,
  log,
  script,
  tools,
} = global.context;

const { packageJson } = tools;

log.info(chalk.cyan(`${packageJson.name} [ver. ${packageJson.version}]`));
log.info(`script: '${script}',`, 'args:', args);

const scripts = {
  // _dev: tools.require('scripts/_dev'),
  build: () => tools.require('scripts/build'),
  eslint: () => tools.require('scripts/eslint'),
  init: () => tools.require('scripts/init'),
  jest: () => tools.require('scripts/jest'),
  rimraf: () => tools.require('scripts/rimraf'),
  sass: () => tools.require('scripts/sass'),
  serve: () => tools.require('scripts/serve'),
  stylelint: () => tools.require('scripts/stylelint'),
  transpile: () => tools.require('scripts/transpile'),
  tsc: () => tools.require('scripts/tsc'),
  tslint: () => tools.require('scripts/tslint'),
};

if (!scripts[script]) {
  log.error('Unknown script:', chalk.cyan(`${script}`));
  log.help('Avaliable scripts:');
  log.help(Object.keys(scripts).join(', '));
  process.exit();
}

scripts[script]()({ args });
