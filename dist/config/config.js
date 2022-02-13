"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  NODE_ENV
} = process.env;

const resolvedPath = _path.default.resolve(__dirname, NODE_ENV === "DEV" ? "dev.env" : "prod.env");

_dotenv.default.config({
  path: resolvedPath
});