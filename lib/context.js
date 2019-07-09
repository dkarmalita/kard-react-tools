process.on('unhandledRejection', (err) => {
  throw err;
});

// resolvers
const { tools, target } = require('../utils/resolver');

// extend target and tools contexts with package.json of each
target.packageJson = target.require('package.json');
tools.packageJson = tools.require('package.json');

global.context = {};
global.context.tools = tools; // tools require, resolve, packageJson
global.context.target = target; // target require, resolve, packageJson
global.context.chalk = tools.require('chalk');
global.context.moment = tools.require('moment');

// name of the script called
// eslint-disable-next-line prefer-destructuring
global.context.script = process.argv[2];

// array of cl args (legacy) // FIXME: shoul be ramoved after refactor
global.context.args = process.argv.slice(3);

// cl args (of MINIMISTJS)
global.context.argv = tools.require('minimist')(process.argv.slice(3));

// combine tools config
// used priority: CL arg || target package.json || tools projectJson || hardcoded default
global.context.config = {
};

// logger factory -> logger, // FIXME: replace the name with logger after refactoring
const createLogger = tools.require('utils/logger');
global.context.log = createLogger(); // default logger to use
global.context.log.createLogger = createLogger; // logger creator
