const {
  target, config,
} = global.context;

const { plugins } = require('./lib');
const baseConfig = require('./base');

baseConfig.plugins = [
  new plugins.CompressionPlugin({
    // asset: "[path].gz[query]",
    algorithm: 'gzip',
    test: /\.js$/,
    threshold: 10240,
    minRatio: 0.8,
  }),

  new plugins.CleanWebpackPlugin([config.distPath], {
    root: target.path('./'), //  Useful when relative references are used in array
    verbose: true,
    dry: false,
  }),

  new plugins.CopyWebpackPlugin([
    { from: target.path(config.staticContentBase), to: target.path(config.distPath) },
  ],
  {
    ignore: [
      '.*',
      '_*',
      '*.bak',
    ],
    // By default, we only copy modified files during
    // a watch or webpack-dev-server build. Setting this
    // to `true` copies all files.
    copyUnmodified: true,
  }),
].concat(baseConfig.plugins);

baseConfig.optimization = {
  minimizer: [
    new plugins.TerserPlugin(),
    new plugins.OptimizeCSSAssetsPlugin({}),
  ],
};

module.exports = () => new Promise(resolve => resolve(baseConfig));
