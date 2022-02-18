"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userEnrolledClassrooms = exports.updateUser = exports.searchUser = exports.markAttendence = exports.listAllUser = exports.findClassroomByUserID = exports.enrollToClassroom = exports.deleteUser = exports.createUser = exports.createClassroom = void 0;

var _attendence = _interopRequireDefault(require("../database/model/attendence.model"));

var _classroom = _interopRequireDefault(require("../database/model/classroom.model"));

var _enrollClassrooms = _interopRequireDefault(require("../database/model/enrollClassrooms.model"));

var _user = _interopRequireDefault(require("../database/model/user.model"));

var _middleware = require("../middleware");

var _error = _interopRequireDefault(require("./error.control"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* restrictedField() {
  const resrictedField = ['_id', '__v', 'userID'];

  for (const field of resrictedField) yield field;
}

const createUser = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    body
  } = req;
  const user = await _user.default.create(body);
  res.status(200).json(user);
});
exports.createUser = createUser;
const listAllUser = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    select,
    id
  } = req.query;
  const users = await _user.default.all().customSelect(select, {
    includeID: id
  });
  res.status(200).json(users);
});
exports.listAllUser = listAllUser;
const deleteUser = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    userID
  } = req.params;
  const user = await _user.default.deleteByID({
    userID
  });

  if (!user) {
    throw _error.default.notFound(`User With ID: ${userID} Not Exist`, {
      userID
    });
  }

  return res.status(200).json({
    message: 'User Deleted Succesfully'
  });
});
exports.deleteUser = deleteUser;

const removeRestrictedFieldFrom = body => {
  for (const key of restrictedField()) delete body[key]; // delete body._id;


  delete body.userID;
  return Object.assign({}, body);
};

const updateUser = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    userID
  } = req.params;
  const {
    body
  } = req;
  const user = await _user.default.findByUserID(userID);
  if (!user) throw _error.default.notFound(`User With ID: ${userID} Cannot be updated`, {
    reason: `User With ID: ${userID} Not Exist`
  });
  const dataToUpdate = removeRestrictedFieldFrom(body);
  const newData = await _user.default.findOneAndUpdate({
    userID
  }, dataToUpdate, {
    runValidators: true
  });
  const updatedFields = Object.keys(dataToUpdate).filter(key => key in newData).join(', ');
  res.status(200).json({
    message: 'User Record Successfully',
    field: updatedFields
  });
});
exports.updateUser = updateUser;
const searchUser = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    userID
  } = req.params;
  const user = await _user.default.findByUserID(userID);
  if (!user) throw _error.default.notFound(`User with ID:${userID} Not Found`);
  return res.json({
    message: 'User Data Fetched Succesfully',
    user
  });
});
exports.searchUser = searchUser;
const findClassroomByUserID = (0, _middleware.handleAsync)(async (req, res, next) => {
  const {
    userID
  } = req.params;
  const classrooms = await _classroom.default.findClassroomOfUser(userID);
  res.json({
    message: `${classrooms.length} Records Found`,
    classrooms
  });
});
exports.findClassroomByUserID = findClassroomByUserID;
const createClassroom = (0, _middleware.handleAsync)(async (req, res, next) => {
  const {
    userID
  } = req.params;
  const {
    body
  } = req;
  const user = await _user.default.findByUserID(userID);

  if (!user) {
    throw _error.default.conflict('Failed To Create Classroom', {
      reason: 'Invalid userID'
    });
  }

  const classdata = await user.createClassroom(body);
  res.status(201).json(classdata);
});
exports.createClassroom = createClassroom;
const enrollToClassroom = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    userID,
    classID
  } = req.params;
  const user = await _user.default.findByUserID(userID);
  if (!user) throw _error.default.notFound(`User with ID:${userID} Not Found`);
  const classroom = await _classroom.default.findOne({
    classID
  });
  if (!classroom) throw _error.default.notFound(`Classroom with ID:${classID} Not Found`, {
    message: 'Unable to enroll user to class'
  });
  if (classroom.admin.toString() === user.id) throw _error.default.conflict('User cannot be enrolled to his classroom');
  console.log(user.id, classroom.id);
  const result = await _enrollClassrooms.default.enrollUserToClassroom(user, classroom);
  console.log(result);
  res.json({
    user,
    classroom
  });
});
exports.enrollToClassroom = enrollToClassroom;
const markAttendence = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    userID,
    classID
  } = req.params;
  const user = await _user.default.findByUserID(userID);
  if (!user) throw _error.default.notFound(`User with ID:${userID} Not Found`);
  const classroom = await _classroom.default.findOne({
    classID
  });
  if (!classroom) throw _error.default.notFound(`Classroom with ID:${classID} Not Found`, {
    message: 'Unable to mark attendence'
  });
  await _attendence.default.markAttendence(user, classroom);
  res.send();
});
exports.markAttendence = markAttendence;
const userEnrolledClassrooms = (0, _middleware.handleAsync)(async (req, res) => {
  const {
    userID
  } = req.params;
  const user = await _user.default.findByUserID(userID);
  if (!user) throw _error.default.notFound(`User with ID:${userID} Not Found`);
  const classrooms = await _enrollClassrooms.default.find({
    user: user.id
  }, 'class -_id').populate({
    path: 'class',
    populate: {
      path: 'admin'
    }
  });
  res.json(classrooms.map(data => data.class));
});
exports.userEnrolledClassrooms = userEnrolledClassrooms;