const path = require('path');

const { tools, target } = require('../utils/resolver');

const log = tools.require('utils/logger');

const shell = tools.require('shelljs');

module.exports = function main({ args }) {
  log.info('script got the args:', args);
  log.info('source path', path.join(process.env.PWD, 'templates/default'));
  log.info('destination path', process.env.PWD);

  const targetFolderName = args[0];

  if (!targetFolderName) {
    log.error('projsct folder is not defined');
    log.help('usage example:');
    log.help('  react-tools init projectFolder [template]');
    process.exit(0);
  }
  const src = tools.fullPath('templates/default');
  const dst = target.fullPath(targetFolderName);

  shell.cp('-R', `${src}/`, dst);
};
