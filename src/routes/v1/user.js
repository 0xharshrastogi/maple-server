import { Router } from "express";
import ClassRoom from "../../controllers/class";
import User from "../../controllers/user";
import { putClassroom } from "../../middleware/classroom";
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
    if (!oldUser) throw new NotFoundError("User Not Found");

    const user = new User(oldUser, { isOld: true });
    user.update(req.body);
    await user.save({ isUpdate: true });
    res.json(user.user);
  } catch (err) {
    next(err);
  }
});

route.post("/:userId/class", putUser, async (req, res, next) => {
  const { user: oldUser } = req;

  try {
    if (!oldUser) throw new NotFoundError("User Not Found");

    const user = new User(oldUser, { isOld: true });
    const classroom = new ClassRoom({ ...req.body, instructor: user.user._id });
    const savedClass = await classroom.save();
    await user.addClass(savedClass._id);

    res.json(savedClass);
  } catch (err) {
    next(err);
  }
});

route.get("/:userId/class", putUser, async (req, res, next) => {
  let { user } = req;
  try {
    if (!user) throw new NotFoundError("User Not Found");
    user = new User(user, { isOld: true });
    let results = await user.user.populate("class");
    results = results.class.map((result) => ({
      id: result.id,
      name: result.name,
      students: { count: result.students.length, result: result.students },
      createdAt: result.createdAt,
    }));

    res.json({ count: results.length, result: results });
  } catch (err) {
    next(err);
  }
});

route.patch(
  "/:userId/enroll/:classId",
  putUser,
  putClassroom,
  async (req, res, next) => {
    let { user, classroom } = req;
    try {
      if (!user) throw new NotFoundError("User Not Found");
      user = new User(user, { isOld: true });
      classroom = new ClassRoom(classroom, { isOld: true });
      await user.enrollTo(classroom.class._id);
      await classroom.enrollStudent(user.user._id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
);

export default route;
