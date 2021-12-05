"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _class = _interopRequireDefault(require("../../controllers/class"));

var _user = _interopRequireDefault(require("../../controllers/user"));

var _classroom = require("../../middleware/classroom");

var _error = require("../../middleware/error");

var _user2 = require("../../middleware/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var route = (0, _express.Router)();
route.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var users, formatedUsers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user["default"].getAllUser();

          case 3:
            users = _context.sent;
            formatedUsers = users.map(function (user) {
              return user.userId;
            });
            res.json({
              count: formatedUsers.length,
              result: formatedUsers
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
route.post("/", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            user = new _user["default"](req.body);
            _context2.next = 4;
            return user.save();

          case 4:
            result = _context2.sent;
            _context2.t0 = res.status(201);
            _context2.next = 8;
            return result.toJSON();

          case 8:
            _context2.t1 = _context2.sent;

            _context2.t0.json.call(_context2.t0, _context2.t1);

            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t2 = _context2["catch"](0);
            next(_context2.t2);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
route.get("/:userId", _user2.putUser, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = req.user;
            _context3.prev = 1;

            if (user) {
              _context3.next = 4;
              break;
            }

            throw new _error.NotFoundError("User Not Found");

          case 4:
            user = new _user["default"](user, {
              isOld: true
            });
            _context3.t0 = res.status(200);
            _context3.next = 8;
            return user.toJSON();

          case 8:
            _context3.t1 = _context3.sent;

            _context3.t0.json.call(_context3.t0, _context3.t1);

            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t2 = _context3["catch"](1);
            next(_context3.t2);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 12]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
route.patch("/:userId", _user2.putUser, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var oldUser, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            oldUser = req.user;
            _context4.prev = 1;

            if (oldUser) {
              _context4.next = 4;
              break;
            }

            throw new _error.NotFoundError("User Not Found");

          case 4:
            user = new _user["default"](oldUser, {
              isOld: true
            });
            user.update(req.body);
            _context4.next = 8;
            return user.save({
              isUpdate: true
            });

          case 8:
            _context4.t0 = res;
            _context4.next = 11;
            return user.toJSON();

          case 11:
            _context4.t1 = _context4.sent;

            _context4.t0.json.call(_context4.t0, _context4.t1);

            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t2 = _context4["catch"](1);
            next(_context4.t2);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 15]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
route.post("/:userId/class", _user2.putUser, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var oldUser, user, classroom, savedClass;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            oldUser = req.user;
            _context5.prev = 1;

            if (oldUser) {
              _context5.next = 4;
              break;
            }

            throw new _error.NotFoundError("User Not Found");

          case 4:
            user = new _user["default"](oldUser, {
              isOld: true
            });
            classroom = new _class["default"](_objectSpread(_objectSpread({}, req.body), {}, {
              instructor: user.user._id
            }));
            _context5.next = 8;
            return classroom.save();

          case 8:
            savedClass = _context5.sent;
            _context5.next = 11;
            return user.addClass(savedClass._id);

          case 11:
            res.json(savedClass);
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](1);
            next(_context5.t0);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 14]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
route.get("/:userId/class", _user2.putUser, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var user, results;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            user = req.user;
            _context6.prev = 1;

            if (user) {
              _context6.next = 4;
              break;
            }

            throw new _error.NotFoundError("User Not Found");

          case 4:
            user = new _user["default"](user, {
              isOld: true
            });
            _context6.next = 7;
            return user.user.populate("class");

          case 7:
            results = _context6.sent;
            results = results["class"].map(function (result) {
              return {
                id: result.id,
                name: result.name,
                students: {
                  count: result.students.length,
                  result: result.students
                },
                createdAt: result.createdAt
              };
            });
            res.json({
              count: results.length,
              result: results
            });
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            next(_context6.t0);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
route.patch("/:userId/enroll/:classId", _user2.putUser, _classroom.putClassroom, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var user, classroom;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user = req.user, classroom = req.classroom;
            _context7.prev = 1;

            if (user) {
              _context7.next = 4;
              break;
            }

            throw new _error.NotFoundError("User Not Found");

          case 4:
            user = new _user["default"](user, {
              isOld: true
            });
            classroom = new _class["default"](classroom, {
              isOld: true
            });
            _context7.next = 8;
            return user.enrollTo(classroom["class"]._id);

          case 8:
            _context7.next = 10;
            return classroom.enrollStudent(user.user._id);

          case 10:
            res.send();
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](1);
            next(_context7.t0);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 13]]);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
route.patch("/:userId/remove/:classId", _user2.putUser, _classroom.putClassroom, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
    var user, classroom;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            user = req.user, classroom = req.classroom;
            _context8.prev = 1;

            if (user) {
              _context8.next = 4;
              break;
            }

            throw new _error.NotFoundError("User Not Found");

          case 4:
            user = new _user["default"](user, {
              isOld: true
            });
            classroom = new _class["default"](classroom, {
              isOld: true
            });
            _context8.next = 8;
            return user.removeFrom(classroom["class"]._id);

          case 8:
            _context8.next = 10;
            return classroom.removeStudent(user.user._id);

          case 10:
            res.json({
              "class": classroom["class"],
              user: user.user
            });
            _context8.next = 16;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](1);
            next(_context8.t0);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 13]]);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}());
var _default = route;
exports["default"] = _default;