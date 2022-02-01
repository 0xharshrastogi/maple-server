import express from "express";
import queryString from "query-string";
import { parse } from "url";
import User from "../../app/user";
import ApiError from "../../controller/error.control";
import { handleAsync } from "../../middleware";

const router = express.Router();

const queryparser = handleAsync((req, res, next) => {
  const { search } = parse(req.url);
  const result = queryString.parse(search, { parseBooleans: true, parseNumbers: true });
  req.query = result;
  next();
});

const selectors = handleAsync((req, res, next) => {
  let { select, id } = req.query;
  if (!select) return next();

  if (typeof select === "string") select = select.split(" ");
  if (!id) select.push("-_id");
  req.query.select = select;
  next();
});

const createUser = handleAsync(async (req, res, next) => {
  const { body } = req;
  const user = await User.create(body);
  res.status(200).json(user);
});

const listUser = handleAsync(async (req, res, next) => {
  const { select } = req.query;
  const users = await User.list({}, select);
  res.status(200).json(users);
});

const deleteUser = handleAsync(async (req, res, next) => {
  const { userID } = req.params;
  const user = await User.delete({ userID }, { projection: "" });
  if (!user) throw ApiError.notFound(`User With ID: ${userID} Not Exist`, { userID });

  return res.status(200).json({ user });
});

const updateUser = handleAsync(async (req, res, next) => {
  const { userID } = req.params;
  const { body } = req;

  delete body?.userID;
  delete body?._id;

  const updateData = await User.update({ userID }, body, { runValidators: true });

  const updatedFields = Object.keys(body)
    .filter((key) => key in updateData)
    .join(", ");

  res.status(200).json({ message: "User Record Successfully", field: updatedFields });
});

// Middleware for parsing query and parsing select fields
router.use(queryparser, selectors);

router.get("/user", listUser);
router.post("/user", createUser);
router.delete("/user/:userID", deleteUser);
router.patch("/user/:userID", updateUser);

export default router;