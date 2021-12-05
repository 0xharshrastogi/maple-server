"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putClassroom = putClassroom;

var _class = _interopRequireDefault(require("../controllers/class"));

var _error = require("./error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// eslint-disable-next-line import/prefer-default-export
function putClassroom(_x, _x2, _x3) {
  return _putClassroom.apply(this, arguments);
}

function _putClassroom() {
  _putClassroom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var classId, classroom;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            classId = req.params.classId;
            _context.prev = 1;
            _context.next = 4;
            return _class["default"].findById(classId);

          case 4:
            classroom = _context.sent;

            if (classroom) {
              _context.next = 7;
              break;
            }

            throw new _error.NotFoundError("No Class Found With ID:".concat(classId));

          case 7:
            req.classroom = classroom;
            next();
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            next(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));
  return _putClassroom.apply(this, arguments);
}