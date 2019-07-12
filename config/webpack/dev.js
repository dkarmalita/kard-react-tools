const {
  tools, config,
} = global.context;

const webpack = tools.require('webpack');

const baseConfig = require('./base');

baseConfig.mode = 'development';

baseConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
);

baseConfig.devServer = {
  contentBase: config.staticContentBase,
  historyApiFallback: true,
  hot: true,
  compress: true,
};

module.exports = () => new Promise(resolve => resolve(baseConfig));
