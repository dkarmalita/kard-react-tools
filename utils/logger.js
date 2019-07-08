const {
  tools, moment, // , script, args, logger, chalk,
} = global.context;

const path = tools.require('path');
const { packageJson } = tools;

/* eslint-disable no-underscore-dangle, max-len */
const color = {
  reset: '\x1b[0m',

  // modificators
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  // Foreground colors
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  // background colors
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};


const _createLogger = () => {
  let logLevel = 400; // default is 400
  const logId = `${color.FgBlue}${packageJson.logid || packageJson.name || path.basename(process.argv[1])}${color.reset}`;
  const result = {
    get logId() { return logId; },
    get logLevel() { return logLevel; },
    setLogLevel(val) { logLevel = val; },
    logMessage(id, ...args) {
      const { config } = this[id];
      if (config.level <= this.logLevel) {
        const pre = `${this.logId} [${moment().format('HH:MM:ss.SSS')} ${config.color}${id}${color.reset}]`;
        // eslint-disable-next-line no-console
        console.log(`${pre}`, ...args);
      }
    },
    addLogLevel(id, level, clr = color.FgBlue) {
      this[id] = (...x) => this.logMessage(id, ...x);
      this[id].config = { level, color: clr };
    },
  };
  result.addLogLevel('debug', 500, color.FgMagenta);
  result.addLogLevel('info', 400, color.FgGreen);
  result.addLogLevel('warn', 300, color.FgYellow);
  result.addLogLevel('error', 200, color.FgRed);
  result.addLogLevel('fatal', 100, color.FgRed + color.Bright);
  return result;
};

const _logger = _createLogger();

/* examples */

// _logger.fatal('fatal');
// _logger.error('error');
// _logger.warn('warn');
// _logger.info('info');
// _logger.debug('debug');

_logger.addLogLevel('help', 450, color.FgBlue);
// _logger.help('help NO OUTPUT');

_logger.setLogLevel(500);
_logger.help('help');
_logger.debug('Fuck!');

/* eslint-disable no-underscore-dangle */
module.exports = _createLogger();
module.exports.createLogger = _createLogger;
