process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools,
} = global.context;

// const path = require('path');
// const resolve = require('resolve');

// function resolveJestDefaultEnvironment(name) {
//   const jestDir = path.dirname(
//     resolve.sync('jest', {
//       basedir: __dirname,
//     }),
//   );
//   const jestCLIDir = path.dirname(
//     resolve.sync('jest-cli', {
//       basedir: jestDir,
//     }),
//   );
//   const jestConfigDir = path.dirname(
//     resolve.sync('jest-config', {
//       basedir: jestCLIDir,
//     }),
//   );
//   return resolve.sync(name, {
//     basedir: jestConfigDir,
//   });
// }

// console.log('HERE WE ARE', resolveJestDefaultEnvironment('jest-environment-jsdom'));

const npx = tools.require('lib/npx');
const configFilePath = tools.resolve('config/jest');

// eslint-disable-next-line func-names
module.exports = function ({ args } = { args: [] }) {
  const app = tools.resolve('.bin/jest');
  return npx([
    app,
    `--config=${configFilePath}`,
    ...args,
  ]);
};
