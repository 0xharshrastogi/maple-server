"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _error = require("./middleware/error");

var _v = _interopRequireDefault(require("./routes/v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const logger = require("morgan");
var app = (0, _express["default"])(); // view engine setup

app.use((0, _morgan["default"])("short"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])()); // Routes

app.use("/v1", _v["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(new _error.NotFoundError("Invalid Path"));
}); // error handler
// eslint-disable-next-line no-unused-vars

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.statusCode || 500);
  res.json({
    code: err.statusCode || 500,
    name: err.name || "InternalServerError",
    message: err.message || "Internal Server Error"
  });
});
var _default = app;
exports["default"] = _default;