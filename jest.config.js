const { target, tools } = require('./utils/resolver');

// testMatch: **/__tests__/**/*.[jt]s?(x),**/?(*.)+(spec|test).[tj]s?(x)
// testPathIgnorePatterns: /node_modules/

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'lcov',
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/src/',
    tools.fullPath('node_modules'),
  ],
  rootDir: target.fullPath(),
  roots: [
    '<rootDir>',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/*.bak/',
    '/*.bak.js/',
    '/*.draft.*/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': tools.resolve('utils/babelTransform.js'),
    '^.+\\.(css|scss)$': tools.resolve('utils/cssTransform.js'),
    // '^(?!.*\\.(js|jsx|mjs|css|json)$)': tools.resolve(
    //   'utils/fileTransform.js'
    // ),
  },
  verbose: true,
};
