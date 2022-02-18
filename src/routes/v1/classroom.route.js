import { Router } from 'express';
import { handleAsync } from '../../../dist/middleware';
import ApiError from '../../controller/error.control';
import ClassModel from '../../database/model/classroom.model';
const router = Router();

router.get(
  '/classroom/:classID',
  handleAsync(async (req, res) => {
    const { classID } = req.params;
    const classroom = await ClassModel.findClassroomByID(classID);
    if (!classroom) throw ApiError.notFound('Classroom Not Found');
    res.json(classroom);
  })
);

export default router;
