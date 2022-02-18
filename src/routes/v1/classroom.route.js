import { Router } from 'express';
import { handleAsync } from '../../../dist/middleware';
import ClassModel from '../../database/model/classroom.model';
const router = Router();

router.get(
  '/classroom/:classID',
  handleAsync(async (req, res) => {
    const { classID } = req.params;
    const classroom = await ClassModel.findClassroomByID(classID);
    res.json(classroom);
  })
);

export default router;
