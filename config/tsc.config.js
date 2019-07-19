// tsconfig for tsc (ts compile / transpile)

const fs = require('fs');
const rimraf = require('rimraf');

const {
  tools, target,
} = global.context;

const srcDir = target.path('src');
const outDir = target.path('lib');
const tsconfigPath = tools.path('tsconfig.tmp.json');

const tsConfig = {
  compilerOptions: {
    // outDir: './dist/',
    sourceMap: process.env.NODE_ENV !== 'production',
    noImplicitAny: true,
    module: 'commonjs',
    target: 'es5',
    jsx: 'react',
    removeComments: process.env.NODE_ENV === 'production',
    allowJs: true,
    outDir,
  },
  exclude: [
    'node_modules',
    // '**/*.js',
    // '**/*.js',
    // '**/*.jsx',
  ],
  // rootDir: srcDir,
  include: [
    srcDir,
  ],
};

rimraf.sync(outDir);

fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(tsConfig, null, ' '),
);

module.exports = () => tsconfigPath;
