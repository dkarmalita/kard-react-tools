require('../lib/context');

const {
  tools, target,
} = global.context;

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
  rootDir: target.fullPath(''),
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
    '^.+\\.(js|jsx|ts|tsx)$': tools.resolve('lib/babelTransform.js'),
    '^.+\\.(css|scss)$': tools.resolve('lib/cssTransform.js'),
    '^(?!.*\\.(js|jsx|mjs|css|scss|json)$)': tools.resolve('lib/fileTransform.js'),
  },
  verbose: true,
};
