const path = require('path')
const shell = require('shelljs');

const { tools, target } = require('../utils/resolver');

const log = tools.require('utils/logger');
const crossSpawn = tools.require('utils/crossSpawn');

console.log(crossSpawn)
// shell.ln('-s', `${process.cwd()}/dist/apps`, `${process.cwd()}/dist/themes/gmotrading/apps`)

module.exports = function main(args){
  log.info('script got the args:', args)
  log.info('source path',path.join(process.env.PWD, 'templates/default'))
  log.info('destination path',process.env.PWD)
}
