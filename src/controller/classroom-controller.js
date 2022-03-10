import ClassModel from '../database/model/classroom.model';
import EnrolledClassroomModel from '../database/model/enrollClassrooms.model';
import { handleAsync } from '../middleware';
import ApiError from './error.control';

const fetchClassroomData = handleAsync(async (req, res) => {
  const { classID } = req.params;
  const classroom = await ClassModel.findClassroomByID(classID);
  if (!classroom) throw ApiError.notFound('Classroom Not Found');
  const users = await EnrolledClassroomModel.find({ class: classroom.id }, 'user').populate('user');
  classroom.enrolledUsers = users;
  res.json(
    Object.assign(
      {},
      classroom._doc,
      { users: users.map((data) => data.user) },
      { _id: undefined, _v: undefined }
    )
  );
});

export { fetchClassroomData };
