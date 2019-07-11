process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const {
  tools,
} = global.context;

const fs = tools.require('fs');
const path = tools.require('path');
const webpack = tools.require('webpack');
