"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var enrolledSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  "class": {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "class"
  }
});
var EnrollModel = (0, _mongoose.model)("enrolled", enrolledSchema);
var _default = EnrollModel;
exports["default"] = _default;