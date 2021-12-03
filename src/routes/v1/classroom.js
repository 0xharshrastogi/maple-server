import { Router } from "express";
import { putClassroom } from "../../middleware/classroom";

const route = Router();

route.get("/:classId", putClassroom, (req, res) => {
  const { classroom } = req;
  res.json(classroom);
});

export default route;
