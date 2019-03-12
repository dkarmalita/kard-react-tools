const spawn = require('cross-spawn');
const log = require('./logger');

module.exports = function crossSpawn(app, args=[]) {
  const result = spawn.sync(
    app,
    args,
    { stdio: 'inherit' },
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      log.warn(
        'The build failed because the process exited too early. '
            + 'This probably means the system ran out of memory or someone called '
            + '`kill -9` on the process.',
      );
    } else if (result.signal === 'SIGTERM') {
      log.warn(
        'The build failed because the process exited too early. '
            + 'Someone might have called `kill` or `killall`, or the system could '
            + 'be shutting down.',
      );
    }
    return 1;
  }
  return result.status;
};
