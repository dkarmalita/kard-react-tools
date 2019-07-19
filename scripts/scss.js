process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools, argv, config,
} = global.context;

const npx = tools.require('lib/npx');

const srcPath = argv.srcPath || config.srcPath;
const distPath = argv.distPath || config.distPath;

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/sass');
  return npx([
    app,
    `${srcPath}:${distPath}`,
    // '-p', tools.require('config/tsc.config.js')(),
    ...args,
  ]);
};
