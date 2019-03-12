const path = require('path')
const log = require('../utils/logger');
// const shell = require('shelljs');
// shell.ln('-s', `${process.cwd()}/dist/apps`, `${process.cwd()}/dist/themes/gmotrading/apps`)

module.exports = function main(args){
  log.info('script got the args:', args)
  log.info('source path',path.join(process.env.PWD, 'templates/default'))
  log.info('destination path',process.env.PWD)
}
