const path = require('path');

const { tools, target } = require('../utils/resolver');

const log = tools.require('utils/logger');

const shell = tools.require('shelljs');
const pathExists = tools.require('path-exists');

module.exports = function main({ args }) {
  log.info('script got the args:', args);
  log.info('source path', path.join(process.env.PWD, 'templates/default'));
  log.info('destination path', process.env.PWD);

  const targetFolderName = args[0];
  const templateName = args[1] || 'default';

  if (!targetFolderName) {
    log.error('projsct folder is not defined');
    log.help('usage example:');
    log.help('  react-tools init projectFolder [template]');
    process.exit(0);
  }
  const src = tools.fullPath(`templates/${templateName}`);
  const dst = target.fullPath(targetFolderName);

  pathExists(src)
    .then((exist) => {
      if (!exist) {
        log.error(`template '${templateName}' doesn't exist`);
        log.help('use an existing template or give no template name to use the default one');
        process.exit(0);
      }
      return pathExists(dst);
    })
    .then((exists) => {
      if (exists) {
        log.error('unable create project');
        log.error(`folder ${dst} exists!`);
        process.exit(0);
      } else {
        shell.cp('-R', `${src}/`, dst);
      }
    });
};
