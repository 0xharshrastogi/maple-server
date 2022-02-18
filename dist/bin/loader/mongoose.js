"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../../config/config"));

var _dubgLogger = require("../../helper/dubgLogger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_config.default.DBConnectionUri).then(value => {
  const {
    name,
    port,
    host
  } = value.connection;
  (0, _dubgLogger.dbLog)('Database Connected To', {
    name,
    port,
    host
  });
}).catch(console.log);