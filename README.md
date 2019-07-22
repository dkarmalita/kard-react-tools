## Tips

Look into the `package.json` to get ideas about local (in-project) config.

## backlog

`#kard-react-tools #backlog` in nvAlt

## Links

* [npm](https://www.npmjs.com/package/@kard/react-tools)
* [github](https://github.com/dkarmalita/kard-react-tools/tree/master)
* [github releases](https://github.com/dkarmalita/kard-react-tools/releases)

## development

in react-tools source directory run once
`npm link`

in test app folder
`npm link @kard/react-tools` - run once
`nodemon --watch ./node_modules/@kard/react-tools ./node_modules/.bin/react-tools _dev`

`nodemon --watch /Users/kard/Desktop/react-tools-tmp-target/test01/node_modules/@kard/react-tools ./node_modules/.bin/react-tools _dev`

## Install

`npm add -D @kard/react-tools@latest`

## CLI commands

`react-tools init`

## NPM scripts

    "build": "react-tools build",
    "esfix": "react-tools eslint --fix",
    "eslint": "react-tools eslint",
    "jest:config": "react-tools jest --showConfig",
    "rimraf": "react-tools rimraf",
    "sass": "react-tools sass --watch",
    "start": "react-tools serve",
    "stylelint": "react-tools stylelint --fix",
    "test": "react-tools jest",
    "transpile": "react-tools transpile --watch",
    "tsc": "react-tools tsc --allowJs --watch",
    "tsfix": "react-tools tslint --fix",
    "tslint": "react-tools tslint"

## Features

* js (webpack/transpile/airbnb eslint)
* css/scss/sass (webpack/transpile/stylelint)
* typescript (webpack/transpile/airbnb tslint)

## package.json config fields

`logid` - id string used in the log. While it is not set, `name` will be used instead.
// TO-DO: move to `tools` section


