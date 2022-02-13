"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _validator = _interopRequireDefault(require("validator"));

var _DB = _interopRequireDefault(require("../../config/DB.json"));

var _classroom = _interopRequireDefault(require("./classroom.model"));

var _createClassroom = _interopRequireDefault(require("./createClassroom.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DOCUMENT_NAME = _DB.default.users.DocumentName;
const COLLECTION_NAME = _DB.default.users.CollectionName;
const DEFAULT_IMAGE_URL = _DB.default.users.default.imageurl;
const schema = new _mongoose.Schema({
  userID: {
    type: String,
    required: [true, 'userID: Required'],
    unique: [true, 'userID: must be unique']
  },
  firstname: {
    type: String,
    required: [true, 'firstname: Required'],
    minlength: [2, 'Minimum length must be 2'],
    maxlength: [100, 'firstname: length should be more than 100'],
    trim: true
  },
  imageURL: {
    type: String,
    trim: true,
    default: DEFAULT_IMAGE_URL
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'email: Required'],
    unique: [true, 'Must Be Unique'],
    validate: {
      validator: email => _validator.default.isEmail(email),
      message: function ({
        value
      }) {
        return `"${value}" Not a valid Email`;
      }
    }
  },
  familyname: {
    type: String,
    required: [true, 'familyname: Required'],
    maxlength: [100, 'familyname: length should be more than 100'],
    trim: true
  },
  givenname: {
    type: String,
    required: [true, 'givenname: Required'],
    maxlength: [100, 'givenname: length should be more than 100'],
    trim: true
  }
}); // *NOTE ---------INSTANCE METHODS ------------- //

schema.method('createClassroom', async function createClassroom(classData) {
  const userID = this.id;
  const classroom = await _classroom.default.create({ ...classData,
    admin: userID
  });
  const classID = classroom.id;
  await _createClassroom.default.create({
    user: userID,
    class: classID
  });
  return classroom;
});
schema.method('enrollClassroom', function enrollClassroom() {}); // *NOTE ---------STATIC METHODS ------------- //

schema.static('findByEmail', function (email) {
  return this.findOne({
    email
  });
});
schema.static('findByUserID', function (userID) {
  return this.findOne({
    userID
  });
});
schema.static('all', function () {
  return this.find();
});
schema.static('deleteByID', function ({
  userID
}) {
  return this.deleteOne({
    userID
  });
}); // *NOTE ---------QUERY METHODS ------------- //

schema.query.customSelect = function (selectors, options) {
  const {
    includeID,
    includeVersion
  } = Object.assign({
    includeID: true,
    includeVersion: true
  }, options);
  let selected = [selectors, !includeID ? '-_id' : '', !includeVersion ? '-__v' : ''].join(' ');
  return this.select(selected);
}; // *NOTE --------- END ------------- //


const UserModel = (0, _mongoose.model)(DOCUMENT_NAME, schema, COLLECTION_NAME);
var _default = UserModel;
exports.default = _default;