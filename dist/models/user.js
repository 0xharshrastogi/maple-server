"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  firstname: {
    type: String,
    trim: true
  },
  imageURL: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  familyname: {
    type: String,
    trim: true
  },
  givenName: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  "class": [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "class"
  }],
  enrolledClass: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "class"
  }]
});
var User = (0, _mongoose.model)("users", userSchema);
var _default = User;
exports["default"] = _default;