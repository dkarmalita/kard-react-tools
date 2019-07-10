process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const {
  tools, target, log, argv,
} = global.context;

const chalk = tools.require('chalk');
const webpack = tools.require('webpack');
const WebpackDevServer = tools.require('webpack-dev-server');

const configFactory = tools.require('webpack.config');

module.exports = () => configFactory(null, { mode: 'development' })
  .then((config) => {
    const devserverConfig = config.devServer || {};
    const targetConfig = target.packageJson.devServer || {};

    const host = argv.host || targetConfig.host || devserverConfig.host || '0.0.0.0';
    const port = argv.port || targetConfig.port || devserverConfig.port || 3000;

    const stats = {
      ...devserverConfig.stats,
      ...targetConfig.stats,
    };

    const options = {
      host,
      port,
      stats,
      ...devserverConfig,
      ...targetConfig,
    };

    // Note: addDevServerEntrypoints should be called before webpack and new WebpackDevServer both.
    // ref: https://webpack.js.org/guides/hot-module-replacement/#via-the-nodejs-api
    WebpackDevServer.addDevServerEntrypoints(config, options);

    const compiler = webpack(config);

    const devServer = new WebpackDevServer(compiler, options);

    /* eslint-disable no-underscore-dangle */
    devServer.listen(port, host, (err) => {
      if (err) {
        log.error(err);
        return;
      }

      log.info(chalk.cyan('Development server is started on'), chalk.cyan.bold(`http://${host}:${port}`));

      if (host === '0.0.0.0') {
        log.info(chalk.cyan('Also the server is avaliable on'), chalk.cyan.bold(`http://localhost:${port}`));
      }

      if (host === 'localhost') {
        log.info(chalk.cyan('Also the server is avaliable on'), chalk.cyan.bold(`http://0.0.0.0:${port}`));
      }
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        log.info(chalk.cyan('terminated by user'));
        devServer.close();
        process.exit();
      });
    });
  });
