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

`"start": "react-tools serve"`

`"build": "react-tools build"`

`"eslint": "react-tools eslint"`

`"esfix": "react-tools eslint --fix"`

`"transpile": "react-tools transpile --watch"`

`"test": "react-tools jest"`

`"jest:config": "react-tools jest --showConfig"`

## package.json config fields

`logid` - id string used in the log. While it is not set, `name` will be used instead.
// TO-DO: move to `tools` section


