const {
  tools,
} = global.context;

const babelLoader = tools.resolve('babel-loader');
const fileLoader = tools.resolve('file-loader');
const tsLoader = tools.resolve('ts-loader');
const urlLoader = tools.resolve('url-loader');

const scssLoader = require('./scss-loader');

module.exports = {
  babelLoader,
  fileLoader,
  scssLoader,
  tsLoader,
  urlLoader,
};