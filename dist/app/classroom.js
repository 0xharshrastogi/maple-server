"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classroom = _interopRequireDefault(require("../database/model/classroom.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Classroom {
  constructor(data) {
    const classroom = data?._doc;
    const keys = Object.keys(classroom);

    for (const key of keys) {
      this[key] = classroom[key];
    }
  }

  _sanitize() {
    const data = Object.assign({}, this);
    delete this._id;
    delete this.__v;
    return data;
  }

  toJSON() {
    return this._sanitize();
  }

  static async create(body) {
    const data = await _classroom.default.create(body);
    return new Classroom(data);
  }

  static async findClassroomsByUserID(userID, select = {
    admin: 0
  }) {
    const result = await _classroom.default.find({}, select).populate({
      path: "admin",
      match: {
        userID
      }
    });
    return result;
  }

}

var _default = Classroom;
exports.default = _default;