require('../lib/context');

const {
  tools,
} = global.context;

const path = tools.require('path');

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
