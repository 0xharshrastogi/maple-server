"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _nanoid = _interopRequireDefault(require("nanoid"));

var _DB = _interopRequireDefault(require("../../config/DB.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DOCUMENT_NAME = _DB.default.classrooms.DocumentName;
const COLLECTION_NAME = _DB.default.classrooms.CollectionName;

const newClassID = () => {
  const alphabet = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return _nanoid.default.customAlphabet(alphabet, 7)();
};

const schema = new _mongoose.Schema({
  classID: {
    type: String,
    required: [true, 'Classroom ID is required'],
    unique: [true, 'Classroom ID must be unique'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Classroom name required'],
    maxlength: [100, 'Classroom must be lesst than 100 characters'],
    trim: true
  },
  subjectName: {
    type: String,
    maxlength: [100, 'Classroom must be lesst than 100 characters'],
    trim: true,
    default: ''
  },
  headerImgUrl: {
    type: String,
    trim: true,
    default: _DB.default.classrooms.default.headerImageUrl
  },
  description: {
    type: String,
    maxlength: [2000, 'Classroom must be lesst than 100 characters'],
    default: '',
    trim: true
  },
  admin: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: _DB.default.users.DocumentName,
    required: [true, 'Classroom Admin User ID Required']
  }
}, {
  timestamps: true
}); // statics

schema.static('findClassroomOfUser', async function findClassroomOfUser(userID) {
  return ClassModel.find({}).populate({
    path: 'admin',
    match: {
      userID
    }
  });
}); // Middlewares

schema.pre('validate', function (next) {
  this['classID'] = newClassID();
  next();
});
const ClassModel = (0, _mongoose.model)(DOCUMENT_NAME, schema, COLLECTION_NAME);
var _default = ClassModel;
exports.default = _default;