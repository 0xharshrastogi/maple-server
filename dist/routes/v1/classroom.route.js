"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middleware = require("../../../dist/middleware");

var _error = _interopRequireDefault(require("../../controller/error.control"));

var _classroom = _interopRequireDefault(require("../../database/model/classroom.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get('/classroom/:classID', (0, _middleware.handleAsync)(async (req, res) => {
  const {
    classID
  } = req.params;
  const classroom = await _classroom.default.findClassroomByID(classID);
  if (!classroom) throw _error.default.notFound('Classroom Not Found');
  res.json(classroom);
}));
var _default = router;
exports.default = _default;