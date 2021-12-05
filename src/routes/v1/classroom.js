import { Router } from "express";
import ClassRoom from "../../controllers/class";
import { putClassroom } from "../../middleware/classroom";

const route = Router();

route.get("/:classId", putClassroom, async (req, res) => {
  let { classroom } = req;

  classroom = new ClassRoom(classroom, { isOld: true });

  res.json(await classroom.toJSON());
});

export default route;
