const {
  tools,
} = global.context;

const CleanWebpackPlugin = tools.require('clean-webpack-plugin');
const CompressionPlugin = tools.require('compression-webpack-plugin');
const CopyWebpackPlugin = tools.require('copy-webpack-plugin');
const HtmlWebpackPlugin = tools.require('html-webpack-plugin');
const MiniCssExtractPlugin = tools.require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = tools.require('optimize-css-assets-webpack-plugin');
const TerserPlugin = tools.require('terser-webpack-plugin');

module.exports = {
  CleanWebpackPlugin,
  CompressionPlugin,
  CopyWebpackPlugin,
  HtmlWebpackPlugin,
  MiniCssExtractPlugin,
  OptimizeCSSAssetsPlugin,
  TerserPlugin,
};
