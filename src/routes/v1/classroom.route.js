import { Router } from 'express';
import { fetchClassroomData } from '../../controller/classroom-controller';
import { fileupload } from '../../middleware/imageupload';

const router = Router();

router.get('/classroom/:classID', fetchClassroomData);

router.post('/class/:classID/upload-resource', fileupload.single('study-resource'), (req, res) => {
  console.log(req.file);
  console.log(req.files);
  res.status(201).json();
});

export default router;
