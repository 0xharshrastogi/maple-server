import { Router } from "express";
import User from "../../controllers/user";
import { NotFoundError } from "../../middleware/error";
import { putUser } from "../../middleware/user";

const route = Router();

route.get("/", async (req, res, next) => {
  try {
    const users = await User.getAllUser();
    const formatedUsers = users.map((user) => user.userId);
    res.json({ count: formatedUsers.length, result: formatedUsers });
  } catch (err) {
    next(err);
  }
});

route.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

route.get("/:userId", putUser, async (req, res, next) => {
  const { user } = req;
  try {
    if (!user) throw new NotFoundError("User Not Found");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

route.patch("/:userId", putUser, async (req, res, next) => {
  const { user: oldUser } = req;
  try {
    const user = new User(oldUser, { isOld: true });
    user.update(req.body);
    await user.save({ isUpdate: true });
    res.json(user.user);
  } catch (err) {
    next(err);
  }
});

route.post("/:userId/class", putUser, async (req, res, next) => {
  const { user } = req;
});

export default route;
