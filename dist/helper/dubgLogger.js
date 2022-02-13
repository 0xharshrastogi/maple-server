"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewareLog = exports.errorType = exports.errorLog = exports.default = exports.dbLog = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefix = "maple-server:";
const dbLog = (0, _debug.default)(prefix + "Database");
exports.dbLog = dbLog;
const errorLog = (0, _debug.default)(prefix + "Error");
exports.errorLog = errorLog;
const errorType = (0, _debug.default)(prefix + "ErrorType");
exports.errorType = errorType;
const middlewareLogger = (0, _debug.default)(prefix + "MiddleWare");

const middlewareLog = (middlewareName, ...message) => {
  middlewareLogger(middlewareName, ...message);
};

exports.middlewareLog = middlewareLog;
const memorize = {};

class Debuglog {
  static for(key) {
    const log = (0, _debug.default)(prefix + key);
    return message => log(message);
  }

}

var _default = Debuglog;
exports.default = _default;