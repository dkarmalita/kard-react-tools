// Refs:
// * https://javascriptplayground.com/react-typescript/
// * https://basarat.gitbooks.io/typescript/
// * https://github.com/DefinitelyTyped/DefinitelyTyped

// Notes:
// * To get happy with react tsx support, these typings have to be added to target project
// npm add -D @types/react @types/react-dom

const fs = require('fs');

const {
  tools, target, config,
} = global.context;

const srcDir = target.path(config.srcPath);
const outDir = target.path(config.distPath);
const tsconfigPath = tools.path('tsconfig.tmp.json');

const tsConfig = {
  compilerOptions: {

    module: 'es6',
    // use ES2015 modules

    target: 'es6',
    // compile to ES2015 (Babel will do the rest)

    allowSyntheticDefaultImports: true,
    // this rule allows you to use ES2015 style default imports even when the code you’re importing doesn’t have an ES2015 default export.
    // this option on because I prefer import React from 'react' over import * as React from 'react'

    baseUrl: srcDir,
    // enables you to import relative to this folder

    sourceMap: process.env.NODE_ENV !== 'production',
    // make TypeScript generate sourcemaps

    outDir,
    // output directory to build to (irrelevant when we use Webpack)

    jsx: 'preserve',
    // enable JSX mode, but "preserve" tells TypeScript to not transform it (we'll use Babel)

    strict: false,
    // When turned on this configures TypeScript’s compiler to be as strict as possible - this might not be what you want if you’re porting some JS to TS, but for new projects it makes sense to be as strict as possible out of the box

    noImplicitAny: false, //true,
    // when you want to add TypeScript to an existing project TypeScript makes it easy by not throwing an error when you don’t declare the types of variables
    // With this setting set to true, you can’t miss any declarations.

    strictNullChecks: false,
    // TypeScript will spot more occasions where you’re referencing a value that might be undefined, it will error at you
    // while it is true, person.age causes an arror if TypeScript thinks that person or person.age might be undefined

    moduleResolution: 'node',
    // It allows to avoide resolving errors while compiling w/o webpack

    removeComments: process.env.NODE_ENV === 'production',
    allowJs: true,
  },
  exclude: [
    'node_modules',
    // '**/*.js',
    '**/*.js',
    '**/*.jsx',
  ],

  // rootDir: '/Users/kard/Desktop/react-tools-tmp-target/test01',
  include: [
    srcDir,
  ],
};

fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(tsConfig, null, ' '),
);

module.exports = () => tsconfigPath;
