const path = require('path')
// const shell = require('shelljs');
// shell.ln('-s', `${process.cwd()}/dist/apps`, `${process.cwd()}/dist/themes/gmotrading/apps`)

module.exports = function main(args){
  log.d('script got the args:', args)
  log.d('source path',path.join(process.env.PWD, 'templates/dev2'))
  log.d('destination path',process.env.PWD)
}
