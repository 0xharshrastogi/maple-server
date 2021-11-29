import { Router } from "express";
import classRoute from "./classroom";
import userRoute from "./user";

const route = Router();

route.use("/user", userRoute);
route.use("/class", classRoute);

export default route;
