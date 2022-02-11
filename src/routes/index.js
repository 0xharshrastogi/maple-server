import cookieParser from 'cookie-parser';
import express from 'express';
import ApiError from '../controller/error.control';
import MongoError from '../controller/mongoError.controller';
import userRouter from './v1/users.route';

const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
/* - --------------------------------------------------- - */
// Routes
router.use('/v1', userRouter);
/* - --------------------------------------------------- - */
// No Route Found
router.use((req, res, next) => {
  next(ApiError.notFound(`${req.path} not found`));
});
/* - --------------------------------------------------- - */
// Error Handler
router.use((error, request, response, next) => {
  console.log(error);
  try {
    if (MongoError.isMongoError(error)) {
      const convertedError = MongoError.convertMongoErrorToApiError(error);
      return ApiError.handle(convertedError, request, response);
    }
    if (ApiError.isApiError(error)) return ApiError.handle(error, request, response);

    // throw error whatever it is converted to internal server error
    throw error;
  } catch (error) {
    const isDevEnv = process.env.NODE_ENV === 'DEV';

    response.status(500).json({
      code: 500,
      name: 'Internal Server Error',
      error_name: isDevEnv === 'DEV' ? error.name : undefined,
      error_message: isDevEnv === 'DEV' ? error.message : undefined,
      error_stack: isDevEnv === 'DEV' ? error.stack : undefined,
      extra: isDevEnv === 'DEV' && { ...error },
    });
  }
});

// const v1App = new Version1Routes();

export default router;
