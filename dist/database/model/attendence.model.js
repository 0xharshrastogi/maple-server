"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _DB = _interopRequireDefault(require("../../config/DB.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.Schema({
  class: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: _DB.default.classrooms.DocumentName,
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: _DB.default.users.DocumentName,
    required: true
  },
  timeOfAttendence: {
    type: Date,
    default: () => new Date()
  }
}); // static method

schema.static('markAttendence', async function markAttendence(user, classroom) {
  const obj = {
    user: user.id,
    class: classroom.id
  };
  if (await this.exists(obj)) return;
  this.create(obj);
});
const AttendenceModel = (0, _mongoose.model)(_DB.default.attendence.DocumentName, schema, _DB.default.attendence.CollectionName);
var _default = AttendenceModel;
exports.default = _default;