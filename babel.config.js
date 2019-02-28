const { tools } = require('./utils/resolver');

const resolve = moduleName => tools.resolve('node_modules', moduleName);

module.exports = (api) => {
  if (!!api && api.cache) { api.cache(true); }
  // api.version
  // Returns Babel's core version.
  // api.env()
  // Returns Babel's environement, you can configure it using the BABEL_ENV environement variable.
  return {
    presets: [
      [resolve('@babel/preset-env'),
        {
          loose: true,
        },
      ],
      resolve('@babel/preset-react'),
    ],
    plugins: [
      [resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      resolve('@babel/plugin-proposal-object-rest-spread'),
    ],
    env: {
      test: {
        plugins: [
          resolve('@babel/plugin-transform-modules-commonjs'),
        ],
      },
    },
  };
};
