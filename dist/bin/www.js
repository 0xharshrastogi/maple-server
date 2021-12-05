#!/usr/bin/env node

/* eslint-disable no-console */

/* eslint-disable no-fallthrough */
"use strict";

require("core-js/stable");

var _http = _interopRequireDefault(require("http"));

var _mongoose = require("mongoose");

require("regenerator-runtime/runtime");

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config({});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || "3000");

_app["default"].set("port", port);
/**
 * Create HTTP server.
 */


var server = _http["default"].createServer(_app["default"]);
/**
 * Listen on provided port, on all network interfaces.
 */


function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe ".concat(port) : "Port ".concat(port); // handle specific listen errors with friendly messages

  switch (error.code) {
    case "EACCES":
      console.error("".concat(bind, " requires elevated privileges"));
      process.exit(1);

    case "EADDRINUSE":
      console.error("".concat(bind, " is already in use"));
      process.exit(1);

    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe ".concat(addr) : "port ".concat(addr.port);
  console.log("Listening On ", bind);
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening); // Database Connection

(0, _mongoose.connect)("mongodb://localhost:27017/test").then(function () {
  return console.log("Database Connected");
})["catch"](function () {
  return console.log("Database Connection Failed");
});