"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const setDatabaseUri = () => {
  if (!process.env.MODE) throw new Error('MODE Required');
  console.log('DATABASE_NAME' in process.env);
  const {
    DATABASE_NAME
  } = process.env;
  if (!DATABASE_NAME) throw new Error('Database Name Not Found In Process.Env');

  if (process.env.MODE === 'production') {
    const {
      DATABASE_USERNAME,
      DATABASE_PASSWORD
    } = process.env;
    return `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@mappledb.rj6u6.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
  }

  if (process.env.MODE === 'development') {
    return `mongodb://localhost:27017/${DATABASE_NAME}`;
  }
};

console.log('DEVELOPMENT_MODE = ', process.env.MODE);
const config = {
  PORT: 8080,
  MODE: process.env.MODE,
  DBConnectionUri: setDatabaseUri()
};
var _default = config;
exports.default = _default;