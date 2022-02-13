"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _express = _interopRequireDefault(require("express"));

var _error = _interopRequireDefault(require("../controller/error.control"));

var _mongoError = _interopRequireDefault(require("../controller/mongoError.controller"));

var _users = _interopRequireDefault(require("./v1/users.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // Middlewares


router.use(_express.default.json());
router.use(_express.default.urlencoded({
  extended: false
}));
router.use((0, _cookieParser.default)());
/* - --------------------------------------------------- - */
// Routes

router.use('/v1', _users.default);
/* - --------------------------------------------------- - */
// No Route Found

router.use((req, res, next) => {
  next(_error.default.notFound(`${req.path} not found`));
});
/* - --------------------------------------------------- - */
// Error Handler

router.use((error, request, response, next) => {
  console.log(error);

  try {
    if (_mongoError.default.isMongoError(error)) {
      const convertedError = _mongoError.default.convertMongoErrorToApiError(error);

      return _error.default.handle(convertedError, request, response);
    }

    if (_error.default.isApiError(error)) return _error.default.handle(error, request, response); // throw error whatever it is converted to internal server error

    throw error;
  } catch (error) {
    const isDevEnv = process.env.NODE_ENV === 'DEV';
    response.status(500).json({
      code: 500,
      name: 'Internal Server Error',
      message: error.message,
      error_name: isDevEnv === 'DEV' ? error.name : undefined,
      error_message: isDevEnv === 'DEV' ? error.message : undefined,
      error_stack: isDevEnv === 'DEV' ? error.stack : undefined,
      extra: isDevEnv === 'DEV' && { ...error
      }
    });
  }
}); // const v1App = new Version1Routes();

var _default = router;
exports.default = _default;