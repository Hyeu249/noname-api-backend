const Winston = require("winston");

const { createLogger, format } = Winston;
const { combine, timestamp, json, splat, colorize, printf } = format;

const DebugLevel = "debug";
const disable = "disable";

const transports = {
  File: new Winston.transports.File({
    filename: "winston.log",
    format: combine(timestamp(), json(), splat()),
  }),
  Console: new Winston.transports.Console({
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), colorize(), customFormat()),
  }),
};

const logger = createLogger({
  levels: customLevels(),
});

// logger.add(transports.File);
logger.add(transports.Console);

transports.File.level = disable;
transports.Console.level = disable;

Winston.addColors({
  info: "bold greenBG",
  error: "bold redBG",
  service: "bold cyanBG",
  repo: "bold magentaBG",
  http: "bold yellowBG",
});

module.exports = { SetLevel, Http, Info, Service, Repo, Error, Debug, DebugLevel };

function customFormat() {
  return printf(({ level, message, timestamp }) => {
    return `${level}: ${message} [${timestamp}]`;
  });
}

function SetLevel(level) {
  for (const Transport of Object.values(transports)) {
    Transport.level = level;
  }
  return level;
}

function Info(message, meta) {
  logger.info(message, meta);
}
function Error(message, meta) {
  logger.error(message, meta);
}

function Service(message, meta) {
  logger.service(message, meta);
}
function Repo(message, meta) {
  logger.repo(message, meta);
}

function Http(message, meta) {
  logger.http(message, meta);
}

function Debug(message, meta) {
  logger.debug(message, meta);
}
function customLevels() {
  return {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    service: 4,
    repo: 5,
    debug: 6,
    silly: 7,
  };
}
