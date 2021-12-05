"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _classroom = require("../../middleware/classroom");

var route = (0, _express.Router)();
route.get("/:classId", _classroom.putClassroom, function (req, res) {
  var classroom = req.classroom;
  res.json(classroom);
});
var _default = route;
exports["default"] = _default;