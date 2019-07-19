process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools, argv, config,
} = global.context;

const rimraf = tools.require('rimraf');

const distPath = argv.distPath || config.distPath;

// eslint-disable-next-line func-names
module.exports = function () {
  return rimraf.sync(distPath);
};
