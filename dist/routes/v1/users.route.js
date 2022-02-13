"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _queryString = _interopRequireDefault(require("query-string"));

var _url = _interopRequireDefault(require("url"));

var _userController = require("../../controller/user-controller");

var _middleware = require("../../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const queryparser = (0, _middleware.handleAsync)((req, res, next) => {
  const {
    search
  } = _url.default.parse(req.url);

  const result = _queryString.default.parse(search, {
    parseBooleans: true,
    parseNumbers: true
  });

  req.query = result;
  next();
});
const selectors = (0, _middleware.handleAsync)((req, res, next) => {
  let {
    select,
    id
  } = req.query;
  if (!select) return next();
  if (typeof select === 'string') select = select.split(' ');
  if (!id) select.push('-_id');
  req.query.select = select;
  next();
}); // Middleware for parsing query and parsing select fields

router.use(queryparser); // operation

router.get('/user', _userController.listAllUser);
router.get('/user/:userID', _userController.searchUser);
router.get('/user/:userID/classroom', _userController.findClassroomByUserID);
router.put('/user/:userID/classroom', _userController.createClassroom);
router.put('/user/:userID/classroom/:classID/enroll', _userController.enrollToClassroom);
router.put('/user/:userID/classroom/:classID/attendence', _userController.markAttendence);
router.post('/user', _userController.createUser);
router.delete('/user/:userID', _userController.deleteUser);
router.patch('/user/:userID', _userController.updateUser);
var _default = router;
exports.default = _default;