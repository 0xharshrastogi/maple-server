import express from "express";
import UserQuery from "../database/query/user.query";

const router = express.Router();

router.get("/user", ({ body }, res) => {
  try {
    const result = await UserQuery.create(body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

export default router;
