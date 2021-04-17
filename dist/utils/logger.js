"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, label, prettyPrint } = winston_1.format;
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["error"] = "error";
    LoggerLevel["warn"] = "warn";
    LoggerLevel["info"] = "info";
    LoggerLevel["verbose"] = "verbose";
    LoggerLevel["debug"] = "debug";
    LoggerLevel["silly"] = "silly";
})(LoggerLevel || (LoggerLevel = {}));
const PROD_LOG_LEVEL = LoggerLevel.error;
const DEV_LOG_LEVEL = LoggerLevel.debug;
const LOG_FILE = LoggerLevel.error;
exports.logger = winston_1.createLogger({
    format: combine(winston_1.format.colorize(), winston_1.format.splat(), winston_1.format.simple(), winston_1.format.timestamp()),
    transports: [
        new winston_1.transports.Console({
            level: process.env.NODE_ENV === 'production'
                ? PROD_LOG_LEVEL
                : DEV_LOG_LEVEL,
        }),
        new winston_1.transports.File({
            filename: 'logs/error.log',
            level: LOG_FILE,
        }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    exports.logger.debug('Logging initialized at debug level');
}
//# sourceMappingURL=logger.js.map