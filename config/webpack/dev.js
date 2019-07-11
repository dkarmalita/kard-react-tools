process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const {
  tools,
} = global.context;

// const fs = tools.require('fs');
// const path = tools.require('path');
// const webpack = tools.require('webpack');

const baseConfig = require('./base');
// const loaders = require('./lib/loaders');

// console.log(baseConfig);

process.exit(0);
