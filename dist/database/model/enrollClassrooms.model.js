"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _DB = _interopRequireDefault(require("../../config/DB.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DOCUMENT_NAME = _DB.default.enrolledClassroom.DocumentName;
const COLLECTION_NAME = _DB.default.enrolledClassroom.CollectionName;
const UserSchemaName = _DB.default.users.DocumentName;
const ClassroomSchemaName = _DB.default.classrooms.DocumentName;
const schema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: UserSchemaName,
    required: true
  },
  class: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: ClassroomSchemaName,
    required: true
  }
}); // Static Method

schema.static('enrollUserToClassroom', function (user, classroom) {
  if (!classroom.id) throw new Error('Unable To Find ID in Classroom Object');
  if (!user.id) throw new Error('Unable To Find ID in User Object');
  if (this.exists({
    user: user.id,
    class: classroom.id
  })) throw new Error('Already enrolled to classroom');
  return this.create({
    user: user.id,
    class: classroom.id
  });
});
const EnrolledClassroomModel = (0, _mongoose.model)(DOCUMENT_NAME, schema, COLLECTION_NAME);
var _default = EnrolledClassroomModel;
exports.default = _default;