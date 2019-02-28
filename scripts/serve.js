process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const { tools, target } = require('../utils/resolver');

const webpack = tools.require('webpack');
const WebpackDevServer = tools.require('webpack-dev-server');
const chalk = tools.require('chalk');

const log = tools.require('utils/logger');

const packageJson = target.require('package.json');

const configFactory = tools.require('webpack.config');

const devserverConfigCustom = packageJson.devServer || {};

module.exports = () => configFactory(null, { mode: 'development' })
  .then((config) => {
    const devserverConfig = config.devServer || {};

    const host = devserverConfigCustom.host || devserverConfig.host || '0.0.0.0';
    const port = devserverConfigCustom.port || devserverConfig.port || 3000;

    const stats = {
      ...devserverConfig.stats,
      ...devserverConfigCustom.stats,
    };

    const options = {
      host,
      port,
      stats,
      ...devserverConfig,
      ...devserverConfigCustom,
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

      log.info('');
      log._text(chalk.cyan('Development server is started on'), chalk.cyan.bold(`http://${host}:${port}`));

      if (host === '0.0.0.0') {
        log._text(chalk.cyan('Also the server is avaliable on'), chalk.cyan.bold(`http://localhost:${port}`));
      }

      if (host === 'localhost') {
        log._text(chalk.cyan('Also the server is avaliable on'), chalk.cyan.bold(`http://0.0.0.0:${port}`));
      }
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        log._text('');
        log.info(chalk.cyan('terminated by user'));
        devServer.close();
        process.exit();
      });
    });
  });
