import path from 'path';
import AttendenceModel from '../database/model/attendence.model';
import ClassModel from '../database/model/classroom.model';
import EnrolledClassroomModel from '../database/model/enrollClassrooms.model';
import UserModel from '../database/model/user.model';
import FaceMatcher from '../helper/faceMatch';
import { handleAsync } from '../middleware';
import ApiError from './error.control';

function* restrictedField() {
  const resrictedField = ['_id', '__v', 'userID'];
  for (const field of resrictedField) yield field;
}

export const createUser = handleAsync(async (req, res) => {
  const { body } = req;
  const user = await UserModel.create(body);
  res.status(200).json(user);
});

export const listAllUser = handleAsync(async (req, res) => {
  const { select, id } = req.query;
  const users = await UserModel.all().customSelect(select, { includeID: id });
  res.status(200).json(users);
});

export const deleteUser = handleAsync(async (req, res) => {
  const { userID } = req.params;
  const user = await UserModel.deleteByID({ userID });

  if (!user) {
    throw ApiError.notFound(`User With ID: ${userID} Not Exist`, { userID });
  }

  return res.status(200).json({ message: 'User Deleted Succesfully' });
});

const removeRestrictedFieldFrom = (body) => {
  for (const key of restrictedField()) delete body[key];
  // delete body._id;
  delete body.userID;

  return Object.assign({}, body);
};

export const updateUser = handleAsync(async (req, res) => {
  const { userID } = req.params;
  const { body } = req;

  const user = await UserModel.findByUserID(userID);
  if (!user)
    throw ApiError.notFound(`User With ID: ${userID} Cannot be updated`, {
      reason: `User With ID: ${userID} Not Exist`,
    });
  const dataToUpdate = removeRestrictedFieldFrom(body);

  const newData = await UserModel.findOneAndUpdate({ userID }, dataToUpdate, {
    runValidators: true,
  });

  const updatedFields = Object.keys(dataToUpdate)
    .filter((key) => key in newData)
    .join(', ');

  res.status(200).json({ message: 'User Record Successfully', field: updatedFields });
});

export const searchUser = handleAsync(async (req, res) => {
  const { userID } = req.params;

  const user = await UserModel.findByUserID(userID);
  if (!user) throw ApiError.notFound(`User with ID:${userID} Not Found`);

  return res.json({ message: 'User Data Fetched Succesfully', user });
});

export const findClassroomByUserID = handleAsync(async (req, res, next) => {
  const { userID } = req.params;
  const classrooms = await ClassModel.findClassroomOfUser(userID);
  res.json({ message: `${classrooms.length} Records Found`, classrooms });
});

export const createClassroom = handleAsync(async (req, res, next) => {
  const { userID } = req.params;
  const { body } = req;
  const user = await UserModel.findByUserID(userID);
  if (!user) {
    throw ApiError.conflict('Failed To Create Classroom', { reason: 'Invalid userID' });
  }

  const classdata = await user.createClassroom(body);
  res.status(201).json(classdata);
});

export const enrollToClassroom = handleAsync(async (req, res) => {
  const { userID, classID } = req.params;

  const user = await UserModel.findByUserID(userID);
  if (!user) throw ApiError.notFound(`User with ID:${userID} Not Found`);

  const classroom = await ClassModel.findOne({ classID });
  if (!classroom)
    throw ApiError.notFound(`Classroom with ID:${classID} Not Found`, {
      message: 'Unable to enroll user to class',
    });

  if (classroom.admin.toString() === user.id)
    throw ApiError.conflict('User cannot be enrolled to his classroom');

  console.log(user.id, classroom.id);
  const result = await EnrolledClassroomModel.enrollUserToClassroom(user, classroom);
  console.log(result);
  res.json({ user, classroom });
});

export const markAttendence = handleAsync(async (req, res) => {
  const { userID, classID } = req.params;

  const user = await UserModel.findByUserID(userID);
  if (!user) throw ApiError.notFound(`User with ID:${userID} Not Found`);

  const classroom = await ClassModel.findOne({ classID });
  if (!classroom)
    throw ApiError.notFound(`Classroom with ID:${classID} Not Found`, {
      message: 'Unable to mark attendence',
    });

  await AttendenceModel.markAttendence(user, classroom);

  res.send();
});

export const userEnrolledClassrooms = handleAsync(async (req, res) => {
  const { userID } = req.params;

  const user = await UserModel.findByUserID(userID);
  if (!user) throw ApiError.notFound(`User with ID:${userID} Not Found`);

  const classrooms = await EnrolledClassroomModel.find({ user: user.id }, 'class -_id').populate({
    path: 'class',
    populate: {
      path: 'admin',
    },
  });

  res.json(classrooms.map((data) => data.class));
});

export const identityImageUpload = handleAsync((req, res, next) => {
  res.json({ message: 'File Uploaded Succesfully' });
});

export const markAttendencev2 = handleAsync(async (req, res, next) => {
  const { file } = req;
  const { userID } = req.params;
  const identityFace = path.join(path.resolve(), 'public/uploads/identity', `${userID}.jpeg`);
  const matcher = new FaceMatcher(file.buffer, identityFace);

  try {
    const result = await matcher.compare();
    res.json({ result });
  } catch (error) {
    switch (error.type) {
      case 'Face Not Found':
        return res.status(400).json({ message: 'Unable to detect face' });
    }
    throw error;
  }
});
