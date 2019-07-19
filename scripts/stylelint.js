process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools, config, argv,
} = global.context;

const npx = tools.require('utils/npx');
const configFilePath = tools.resolve('config/stylelint');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/stylelint');

  // base eslint args to use
  const baseArgs = [
    `${argv.lintSource || config.lintSource}/**/*.css`,
    `${argv.lintSource || config.lintSource}/**/*.scss`,
    `${argv.lintSource || config.lintSource}/**/*.html`,
    '--config', configFilePath,
  ];

  return npx([
    app,
    ...baseArgs,
    ...args,
  ]);
};
