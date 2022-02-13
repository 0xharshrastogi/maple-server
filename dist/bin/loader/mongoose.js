"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dubgLogger = require("../../helper/dubgLogger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DBHOST = process.env.DB_URL;
const DBNAME = process.env.DB_NAME;
const url = `${DBHOST}/${DBNAME}`;
console.log(DBHOST, DBNAME);
_mongoose.default.connect(url).then(value => {
  (0, _dubgLogger.dbLog)("Database Connected To", url);
}).catch;