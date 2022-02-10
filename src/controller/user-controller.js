import Classroom from '../app/classroom';
import User from '../app/user';
import UserModel from '../database/model/user.model';
import { handleAsync } from '../middleware';
import ApiError from './error.control';

function* restrictedField() {
  const resrictedField = ['_id', '__v', 'userID'];
  for (const field of resrictedField) yield field;
}

export const createUser = handleAsync(async (req, res) => {
  const { body } = req;
  const user = await User.create(body);
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

  return res.status(200);
});

export const updateUser = handleAsync(async (req, res) => {
  const { userID } = req.params;
  const { body } = req;

  for (const key of restrictedField()) delete body[key];
  // delete body._id;
  delete body.userID;

  const user = await UserModel.findByID(userID);
  if (!user)
    throw ApiError.notFound(`User With ID: ${userID} Cannot be updated`, {
      reason: `User With ID: ${userID} Not Exist`,
    });
  // todo
  Object.assign(user, body);
  const updateData = await User.update({ userID }, body, { runValidators: true });
  const updatedFields = Object.keys(body)
    .filter((key) => key in updateData)
    .join(', ');

  res.status(200).json({ message: 'User Record Successfully', field: updatedFields });
});

export const searchUser = handleAsync(async (req, res) => {
  const { userID } = req.params;
  const { select } = req.query;

  console.log(userID);
  const user = await User.find({ userID }, select);
  if (!user) throw ApiError.notFound(`User with ID:${userID} Not Found`);

  return res.json({ message: 'User Data Fetched Succesfully', ...user });
});

export const findClassroomByUserID = handleAsync(async (req, res, next) => {
  const { userID } = req.params;
  const classrooms = await Classroom.findClassroomsByUserID(userID);
  res.json({ message: `${classrooms.length} Records Found`, classrooms });
});

export const createClassroom = handleAsync(async (req, res, next) => {
  const { userID } = req.params;
  const { body } = req;
  const user = await UserModel.find({ userID });

  if (!user) throw ApiError.conflict('Failed To Create Classroom', { reason: 'Invalid userID' });
  const classData = await user.createClassroom(body);

  res.json(classData);
});
