const winston = require('winston');
const path = require('path');
const getCallerFile = require('get-caller-file');

const getComponent = (filenameWithPath) => {
  return {
    component: path.basename(filenameWithPath),
  };
};

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

winstonLogger.info('Logger started...');

module.exports.logger = () => {
  winstonLogger.defaultMeta = getComponent(getCallerFile());
  return winstonLogger;
};
