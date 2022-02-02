import express from "express";
import User from "../../app/user";
import ApiError from "../../controller/error.control";
import { handleAsync } from "../../middleware/";

const router = express.Router();

const createClassroom = handleAsync(async (req, res, next) => {
  const { userID } = req.params;
  const { body } = req;

  const user = await User.find({ userID });

  if (!user)
    throw ApiError.conflict("Failed To Create Classroom", { reason: "Invalid userID" });

  const classData = await user.createClassroom(body);

  res.json(classData);
});

router.post("/classroom/:userID/create", createClassroom);

export default router;
