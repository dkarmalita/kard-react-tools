/* eslint-disable global-require, import/no-dynamic-require, react/no-this-in-sfc */
const path = require('path');

/* eslint-disable-next-line no-console */
const log = { error: console.log }; // log = ()=>{}//require('./logger');

// Add tools root directory to resolver
require.main.paths = [
  path.join(__dirname, '..'),
  ...require.main.paths,
];

function createResolver(basePath) {
  return {
    get basePath() {
      return basePath;
    },

    // FIXME: remove the lagacy
    fullPath(rPath = '', ...rest) {
      return path.join(this.basePath, rPath, ...rest);
    },

    path(rPath = '', ...rest) {
      return path.join(this.basePath, rPath, ...rest);
    },

    resolve(...params) {
      try {
        return require.resolve(this.fullPath(...params));
      } catch (e) {
        try {
          return require.resolve(params[params.length - 1]);
        } catch (ex) {
          log.error('Unable to resolve:', params);
        }
      }
      return process.exit(0);
    },

    require(...params) {
      try {
        return require(this.fullPath(...params));
      } catch (e) {
        try {
          return require(params[params.length - 1]);
        } catch (ex) {
          log.error('[resolver] Unable to require:', params);
        }
      }
      return process.exit(0);
    },
  };
}

const target = createResolver(process.cwd()); //  path.resolve('./')
const tools = createResolver(path.join(__dirname, '..'));

module.exports = {
  target, // is the project which contains the packade in its devDependencies
  tools, // is this package itself
};
