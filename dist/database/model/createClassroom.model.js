"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _DB = _interopRequireDefault(require("../../config/DB.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DOCUMENT_NAME = _DB.default.createdClassroom.DocumentName;
const COLLECTION_NAME = _DB.default.createdClassroom.CollectionName;
const UserSchemaName = _DB.default.users.DocumentName;
const ClassroomSchemaName = _DB.default.classrooms.DocumentName;
const schema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: UserSchemaName
  },
  class: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: ClassroomSchemaName
  }
});
const CreatedClassroomModel = (0, _mongoose.model)(DOCUMENT_NAME, schema, COLLECTION_NAME);
var _default = CreatedClassroomModel;
exports.default = _default;