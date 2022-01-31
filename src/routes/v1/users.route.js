import express from "express";
import User from "../../app/user";
import { handleAsync } from "../../middleware";

const router = express.Router();

const saveUser = handleAsync(async (req, res, next) => {
  const { body } = req;
  const user = await User.create(body);
  res.status(200).json(user);
});

router.get("/user", saveUser);

export default router;
