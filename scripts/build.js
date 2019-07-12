process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools, log,
} = global.context;

const webpack = tools.require('webpack');
const configFactory = tools.require('config/webpack/prod');

module.exports = () => configFactory(null, { mode: 'development' })
  .then((config) => {
    const compiler = webpack(config);
    compiler.run((err, stats) => { // Stats Object
      if (err) {
        log.error(err);
        return;
      }

      log.info(stats.toString(config.stats));
    });
  });
