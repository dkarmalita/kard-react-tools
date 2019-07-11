const {
  tools,
} = global.context;

const HtmlWebpackPlugin = tools.require('html-webpack-plugin');
const CopyWebpackPlugin = tools.require('copy-webpack-plugin');
const CleanWebpackPlugin = tools.require('clean-webpack-plugin');

module.exports = {
  HtmlWebpackPlugin,
  CopyWebpackPlugin,
  CleanWebpackPlugin,
};
