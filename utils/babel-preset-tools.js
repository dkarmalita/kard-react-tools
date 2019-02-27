const { tools } = require('../utils/resolver');

const resolveNM = pkgName => tools.resolve('node_modules', pkgName);

const createBabelConfig = tools.require('config/babel.config');

// createBabelPreset
module.exports = () => createBabelConfig(resolveNM);
