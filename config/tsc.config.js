// tsconfig for tsc (ts compile / transpile)

const fs = require('fs');

const {
  tools, target, config,
} = global.context;

const srcDir = target.path(config.srcPath);
const outDir = target.path(config.distPath);
const tsconfigPath = tools.path('tsconfig.tmp.json');

const tsConfig = {
  compilerOptions: {
    // outDir: './dist/',
    sourceMap: process.env.NODE_ENV !== 'production',
    noImplicitAny: false, //true,
    // module: 'commonjs',
    // module: 'es6',
    // target: 'es5',
    module: 'es6',
    target: 'es6',
    jsx: 'react',
    removeComments: process.env.NODE_ENV === 'production',
    allowJs: true,
    allowSyntheticDefaultImports: true,
    // moduleResolution: 'node',
    outDir,
  },
  exclude: [
    'node_modules',
    // '**/*.js',
    // '**/*.js',
    // '**/*.jsx',
  ],
  rootDir: '/Users/kard/Desktop/react-tools-tmp-target/test01',
  include: [
    srcDir,
  ],
};

fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(tsConfig, null, ' '),
);

module.exports = () => tsconfigPath;
