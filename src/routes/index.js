import cookieParser from "cookie-parser";
import express from "express";
import ApiError from "../controller/error.control";
import MongoError from "../controller/mongoError.controller";
import { errorLog, errorType } from "../helper/dubgLogger";
import userRouter from "./v1/users.route";

const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

// Routes
router.use("/v1", userRouter);

// Error Handler
router.use((error, request, response, next) => {
  errorLog("Message::", error.message);
  errorType("Type::", error.name);

  try {
    if (MongoError.isMongoError(error)) {
      const convertedError = MongoError.convertMongoErrorToApiError(error);
      return ApiError.handle(convertedError, request, response);
    }
    if (ApiError.isApiError(error)) return ApiError.handle(error, request, response);

    // throw error whatever it is converted to internal server error
    throw error;
  } catch (error) {
    response.status(500).json({
      code: 500,
      name: "Internal Server Error",
      error_name: process.env.NODE_ENV === "DEV" ? error.name : undefined,
      error_message: process.env.NODE_ENV === "DEV" ? error.message : undefined,
      error_stack: process.env.NODE_ENV === "DEV" ? error.stack : undefined,
    });
  }
});

export default router;
