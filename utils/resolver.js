// const fs = require('fs');
const path = require('path');

function createResolver(basePath){
  return {
    get basePath(){ return basePath },
    fullPath: function(rPath='', ...rest){ return path.join(this.basePath, rPath, ...rest) },
    resolve: function(...params){ return require.resolve(this.fullPath(...params)) },
    require: function(...params){ return require(this.fullPath(...params)) },
    // read: function(...params){ return fs.readFileSync(this.resolve(...params)) },
  }
}

module.exports = exports = { // eslint-disable-line no-undef

  // target - is the project which contains the packade in its devDependencies
  target: createResolver(process.cwd()),

  // tools - is this package itself
  tools: createResolver(path.join(__dirname, '..')),
}
