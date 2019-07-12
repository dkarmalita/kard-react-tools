require('../lib/context');

const {
  tools, log,
} = global.context;

module.exports = (api) => {
  if (!!api && api.cache) { api.cache(true); }
  // api.version
  // Returns Babel's core version.
  // api.env()
  // Returns Babel's environement, you can configure it using the BABEL_ENV environement variable.
  return {
    presets: [
      [tools.resolve('@babel/preset-env'),
        {
          loose: true,
        },
      ],
      tools.resolve('@babel/preset-react'),
      tools.resolve('@babel/preset-typescript'),
    ],
    plugins: [
      [tools.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [tools.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      tools.resolve('@babel/plugin-proposal-object-rest-spread'),
    ],
    env: {
      test: {
        plugins: [
          tools.resolve('@babel/plugin-transform-modules-commonjs'),
        ],
      },
    },
  };
};
