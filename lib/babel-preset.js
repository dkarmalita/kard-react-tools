require('../lib/context');

const {
  tools,
} = global.context;

const createBabelConfig = tools.require('config/babel');

// create babel preset
module.exports = (...params) => createBabelConfig(...params);
