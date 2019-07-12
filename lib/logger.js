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

const logIdDefault = packageJson.logid || packageJson.name || path.basename(process.argv[1]);

const createLogger = ({
  logId = logIdDefault, // default log id to use
  logIdColor = color.FgBlue, // defaukt log id color to use
  logLevel = 400, // default logLevel to set at the start
} = {}) => {
  /**
   * logLevel - private variable keeps the currently set logLevel
   * @type {Number}
   */
  let _logLevel = logLevel; // default is 400

  /**
   * logId - private variable contains the currently used log id (clause before data/type breckets)
   * @type {String}
   */
  let _logId = logId;

  /**
   * logMessage - private function which actually performs the real console output.
   * Called in context of the created logger
   * @param  {String}   id   - id og the logger to use
   * @param  {...Any}   args - arguments to put to console
   * @return {Void}
   */
  function logMessage(id, ...args) {
    const { config } = this[id];
    const logIdString = `${logIdColor}${this.logId}${color.reset}`;
    if (config.level <= this.logLevel) {
      const pre = `${logIdString} [${moment().format('HH:MM:ss.SSS')} ${config.color}${id}${color.reset}]`;
      // eslint-disable-next-line no-console
      console.log(`${pre}`, ...args);
    }
  }

  /**
   * logger - the base of the creating logger
   * @type {Object}
   */
  const logger = {

    /**
     * logId - getter which return the curently used logger id
     * @return {String} - the curently used logger id
     */
    get logId() { return _logId; },
    set logId(val) { _logId = val; },

    /**
     * logLevel - getter returns the currently set logLevel (max level of log output)
     * Default is 400
     * @return {Number} [description]
     */
    get logLevel() { return _logLevel; },

    /**
     * setLogLevel - logLevel setter
     * @param {Number} val - new logLevel to set
     */
    set logLevel(val) { _logLevel = val; },

    /**
     * getColor - getter returns the color string by it's id
     * @param  {String} id - color id (Bright, FgRed, BgGreen, etc.)
     * @return {String} color prefix value
     */
    getColor(id) { return color[id]; },

    /**
     * addLogLevel - public method which allows to add custom levels to the logger
     * @param {String} id    - id of the custom level
     * @param {Numbet} level - level value
     * @param {String} clr   - colos string acceptable inthe console output
     */
    addLogLevel(id, level, clr = color.FgBlue) {
      this[id] = (...x) => logMessage.call(this, id, ...x);
      this[id].config = { level, color: clr };
    },
  };

  /**
   * Standard logger methods initialization
   */
  logger.addLogLevel('debug', 500, color.FgMagenta);
  logger.addLogLevel('info', 400, color.FgGreen);
  logger.addLogLevel('warn', 300, color.FgYellow);
  logger.addLogLevel('error', 200, color.FgRed);
  logger.addLogLevel('fatal', 100, color.FgRed + color.Bright);

  return logger;
};


/* examples */

// const _logger = createLogger();
// console.log(_logger);

// _logger.fatal('fatal');
// _logger.error('error');
// _logger.warn('warn');
// _logger.info('info');
// _logger.debug('debug');

// _logger.addLogLevel('help', 450, color.FgBlue);
// _logger.help('help NO OUTPUT');

// _logger.logLevel = 500;
// _logger.help('help');
// _logger.debug('Fuck!');

/* eslint-disable no-underscore-dangle */
module.exports = createLogger;
