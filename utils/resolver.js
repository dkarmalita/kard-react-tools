/* eslint-disable */
const path = require('path');

require.main.paths = [
  path.join(__dirname, '..'),
  ...require.main.paths,
];

function createResolver(basePath) {
  return {
    get basePath() { return basePath; },
    fullPath(rPath = '', ...rest) { return path.join(this.basePath, rPath, ...rest); },
    resolve(...params) { return require.resolve(this.fullPath(...params)); },
    require(...params) { return require(this.fullPath(...params)); },
  };
}

function createResolverA(basePath) {
  return {
    get basePath() { return basePath; },
    fullPath(rPath = '', ...rest) { return path.join(this.basePath, rPath, ...rest); },
    resolve(...params) {
      try {
        return require.resolve(this.fullPath(...params));
      } catch (e) {
        try {
          return require.resolve(params[params.length - 1]);
        } catch (e) {
          console.log('resolve err >>>', params)
          process.exit(0)
        }
      }
      return null
    },
    require(...params) {
      try {
        return require(this.fullPath(...params));
      } catch (e) {
        try {
          return require(params[params.length - 1]);
        } catch (e) {
          console.log('require err >>>', params)
          process.exit(0)
        }
      }
      return null
    },
  };
}

const target = createResolver(process.cwd());
const tools = createResolverA(path.join(__dirname, '..'));

module.exports = {
  target, // is the project which contains the packade in its devDependencies
  tools,  // is this package itself
}
