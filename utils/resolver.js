// const fs = require('fs');
const path = require('path');

function createResolver(basePath) {
  return {
    get basePath() { return basePath; },
    fullPath(rPath = '', ...rest) { return path.join(this.basePath, rPath, ...rest); },
    resolve(...params) { return require.resolve(this.fullPath(...params)); },
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(...params) { return require(this.fullPath(...params)); },
    // read: function(...params){ return fs.readFileSync(this.resolve(...params)) },
  };
}

module.exports = {

  // target - is the project which contains the packade in its devDependencies
  target: createResolver(process.cwd()),

  // tools - is this package itself
  tools: createResolver(path.join(__dirname, '..')),
};
