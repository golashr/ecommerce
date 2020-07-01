'use strict';

const {
  createLogger,
  format,
  transports
} = require('winston');

const packageJson = require('../../package.json');

const {
  combine,
  timestamp,
  label,
  printf,
  colorize
} = format;
const defaultFormat = printf((_ref) => {
  let {
    level,
    message,
    label,
    timestamp
  } = _ref;
  return "[".concat(label, "]  <  ").concat(level, " >  ").concat(timestamp, " |  ").concat(message);
});
const logger = createLogger({
  format: combine(label({
    label: packageJson.name
  }), timestamp(), defaultFormat, colorize()),
  transports: [// eslint-disable-next-line lines-around-comment

  /* {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  } */
  // eslint-disable-next-line no-inline-comments
  new transports.Console({
    level: 'debug'
  }), // warnings and errors
  new transports.File({
    filename: "./logs/".concat(packageJson.name, "/").concat(packageJson.name, "_combined.log"),
    level: 'debug'
  }), new transports.File({
    filename: "./logs/".concat(packageJson.name, "/").concat(packageJson.name, "_error.log"),
    level: 'error'
  })]
});
logger.add(new transports.Console({
  format: format.simple(),
  level: 'error'
}));
module.exports = logger;
//# sourceMappingURL=logger.js.map