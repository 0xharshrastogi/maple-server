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
    const formatedUsers = await Promise.all(
      users.map((user) => new User(user, { isOld: true }).toJSON()),
    );
    res.json({ count: formatedUsers.length, result: formatedUsers });
  } catch (err) {
    next(err);
  }
});

route.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(await result.toJSON());
  } catch (err) {
    next(err);
  }
});

route.get("/:userId", putUser, async (req, res, next) => {
  let { user } = req;
  try {
    if (!user) throw new NotFoundError("User Not Found");
    user = new User(user, { isOld: true });
    res.status(200).json(await user.toJSON());
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
    res.json(await user.toJSON());
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
    const data = await classroom.toJSON();

    res.json({ ...data, instructor: data.instructor.id });
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

    results = await Promise.all(
      results.class.map((classroom) =>
        new ClassRoom(classroom, { isOld: true }).toJSON(),
      ),
    );

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

      res.send();
    } catch (err) {
      next(err);
    }
  },
);

route.patch(
  "/:userId/remove/:classId",
  putUser,
  putClassroom,
  async (req, res, next) => {
    let { user, classroom } = req;
    try {
      if (!user) throw new NotFoundError("User Not Found");
      user = new User(user, { isOld: true });
      classroom = new ClassRoom(classroom, { isOld: true });

      await user.removeFrom(classroom.class._id);
      await classroom.removeStudent(user.user._id);

      res.json({ class: classroom.class, user: user.user });
    } catch (err) {
      next(err);
    }
  },
);

export default route;
