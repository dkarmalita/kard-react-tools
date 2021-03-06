const path = require('path');
const moment = require('moment');

const packageJson = require('../package.json');

/* eslint-disable no-underscore-dangle */
module.exports = {
  get _color() {
    // cheatsheet: https://stackoverflow.com/a/41407246
    return {
      reset: '\x1b[0m',
      fgBlue: '\x1b[34m',
      fgGreen: '\x1b[32m',
      fgRed: '\x1b[31m',
      fgYellow: '\x1b[33m',
    };
  },
  get _logid() { return packageJson.logid || packageJson.name || path.basename(process.argv[1]); },
  _log(id, ...args) { this._text(`${this._color.fgBlue}${this._logid}${this._color.reset} [${moment().format('HH:MM:ss.SSS')} ${id}]`, ...args); },
  _text(...args) { console.log(...args); }, // eslint-disable-line no-console
  error(...args) { this._log(`${this._color.fgRed}ERR${this._color.reset}`, ...args); },
  help(...args) { this._log(`${this._color.fgGreen}HELP${this._color.reset}`, ...args); },
  info(...args) { this._log(`${this._color.fgBlue}INF${this._color.reset}`, ...args); },
  warn(...args) { this._log(`${this._color.fgYellow}WARN${this._color.reset}`, ...args); },
};
