"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dubgLogger = require("../../helper/dubgLogger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DBHOST = process.env.DB_URL;
const DBNAME = process.env.DB_NAME;
var url;
if (process.env.NODE_ENV === 'PROD') url = DBHOST;
if (process.env.NODE_ENV === 'DEV') url = `${DBHOST}/${DBNAME}`;

_mongoose.default.connect(url).then(value => {
  const {
    name,
    port,
    host
  } = value.connection;
  console.log({
    name,
    port,
    host
  });
  (0, _dubgLogger.dbLog)('Database Connected To', {
    name,
    port,
    host
  });
}).catch(console.log);