const { tools } = require('../utils/resolver');

const createBabelConfig = tools.require('babel.config');

// create babel preset
module.exports = (...params) => createBabelConfig(...params);
