"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var classSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  instructor: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  students: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users"
  }]
}, {
  timestamps: true
});
var ClassModel = (0, _mongoose.model)("class", classSchema);
var _default = ClassModel;
exports["default"] = _default;