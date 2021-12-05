"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _classroom = _interopRequireDefault(require("./classroom"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = (0, _express.Router)();
route.use("/user", _user["default"]);
route.use("/class", _classroom["default"]);
var _default = route;
exports["default"] = _default;