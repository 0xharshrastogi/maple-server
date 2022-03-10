import { Router } from 'express';
import { fetchClassroomData } from '../../controller/classroom-controller';
const router = Router();

router.get('/classroom/:classID', fetchClassroomData);

export default router;
