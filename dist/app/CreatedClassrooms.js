"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClassroom = _interopRequireDefault(require("../database/model/createClassroom.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatedClassrooms {
  static async insert(userObjectID, classObjectID) {
    _createClassroom.default.create({
      user: userObjectID,
      class: classObjectID
    });
  }

  static async findUserClassrooms(userID) {
    const result = await _createClassroom.default.find({
      userID
    }).select("class").populate({
      path: "class",
      select: {
        _id: 0,
        __v: 0
      }
    });
    return result.map(val => val.class);
  }

  static async findClassroomStudents(classID) {
    const result = await _createClassroom.default.find({
      classID
    });
  }

}

var _default = CreatedClassrooms;
exports.default = _default;