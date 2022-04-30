import { Router } from 'express';
import fs from 'fs/promises';
import { fetchClassroomData } from '../../controller/classroom-controller';
import ApiError from '../../controller/error.control';
import ClassModel from '../../database/model/classroom.model';
import { fileupload } from '../../middleware/imageupload';
import { handleAsync } from '../../middleware/index';

const router = Router();

router.get('/classroom/:classID', fetchClassroomData);

router.post('/class/:classID/upload-resource', fileupload.single('study-resource'), (req, res) => {
  res.status(201).json();
});

router.get(
  '/class/:classID/resource',
  handleAsync(async (req, res) => {
    const { classID } = req.params;
    const isExist = await ClassModel.exists({ classID });

    if (!isExist) throw ApiError.badRequest('Invalid ClassId', { classID });

    const result = await fs.readdir('public/uploads/study-resource/');
    const regex = new RegExp(classID);
    const data = result
      .filter((value) => regex.exec(value))
      .map((path) => {
        const [, dateStr, filename] = path.split('-');
        const date = new Date(
          `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
        );
        return { path, date, filename };
      });
    res.json({ classID, files: data });
  })
);

export default router;
