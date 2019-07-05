const {
  tools, moment, // , script, args, logger, chalk,
} = global.context;

const path = tools.require('path');
const { packageJson } = tools;

/* eslint-disable no-underscore-dangle */

const createLogger = () => ({
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
});

/* eslint-disable no-underscore-dangle */
module.exports = createLogger();
module.exports.createLogger = createLogger;

/* eslint-disable no-unused-vars */
const level = {
  all: 'ALL', // All levels including custom levels.
  debug: 'DEBUG', // Designates fine-grained informational events that are most useful to debug an application.
  info: 'INFO', //  Designates informational messages that highlight the progress of the application at coarse-grained level.
  warn: 'WARN', //  Designates potentially harmful situations.
  errror: 'ERROR', // Designates error events that might still allow the application to continue running.
  fatal: 'FATAL', // Designates very severe error events that will presumably lead the application to abort.
  off: 'OFF', // The highest possible rank and is intended to turn off logging.
};
let _currentLevel = level.all;
const setLevel = (lvl) => { _currentLevel = lvl; };
const log = {};
