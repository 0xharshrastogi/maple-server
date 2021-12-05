"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _error = require("../middleware/error");

var _user = _interopRequireDefault(require("../models/user"));

var _class = _interopRequireDefault(require("./class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User = /*#__PURE__*/function () {
  function User(userData, option) {
    _classCallCheck(this, User);

    this.user = option !== null && option !== void 0 && option.isOld ? userData : new _user["default"](userData);
  }

  _createClass(User, [{
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref,
            isUpdate,
            res,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, isUpdate = _ref.isUpdate;

                if (isUpdate) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return User.findUserById(this.user.userId);

              case 4:
                res = _context.sent;

                if (!res) {
                  _context.next = 7;
                  break;
                }

                throw new _error.ConflictError("User With Same User Id Already Exisit");

              case 7:
                return _context.abrupt("return", this.user.save());

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "update",
    value: function update(data) {
      // eslint-disable-next-line no-restricted-syntax
      for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this.user[key] = data[key];
      }
    }
  }, {
    key: "addClass",
    value: function addClass(classId) {
      this.user["class"].push(classId);
      return this.save({
        isUpdate: true
      });
    }
  }, {
    key: "enrollTo",
    value: function () {
      var _enrollTo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(classId) {
        var isAlreadyEnrolled;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isAlreadyEnrolled = this.user.enrolledClass.find(function (value) {
                  return (value === null || value === void 0 ? void 0 : value.toString()) === (classId === null || classId === void 0 ? void 0 : classId.toString());
                });

                if (!isAlreadyEnrolled) {
                  _context2.next = 3;
                  break;
                }

                throw new _error.ForbiddenError("User Is Already Enrolled");

              case 3:
                this.user.enrolledClass.push(classId);
                return _context2.abrupt("return", this.save({
                  isUpdate: true
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function enrollTo(_x) {
        return _enrollTo.apply(this, arguments);
      }

      return enrollTo;
    }()
  }, {
    key: "removeFrom",
    value: function () {
      var _removeFrom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(classId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.user.enrolledClass = this.user.enrolledClass.filter(function (value) {
                  return (value === null || value === void 0 ? void 0 : value.toString()) !== (classId === null || classId === void 0 ? void 0 : classId.toString());
                });
                return _context3.abrupt("return", this.save({
                  isUpdate: true
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function removeFrom(_x2) {
        return _removeFrom.apply(this, arguments);
      }

      return removeFrom;
    }()
  }, {
    key: "toJSON",
    value: function () {
      var _toJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.user.populate("enrolledClass");

              case 2:
                _context4.t0 = this.user.userId;
                _context4.t1 = this.user.email;
                _context4.t2 = {
                  first: this.user.firstname,
                  last: this.user.familyname
                };
                _context4.t3 = "".concat(this.user.firstname, " ").concat(this.user.familyname);
                _context4.t4 = this.user.imageURL;
                _context4.t5 = this.user["class"];
                _context4.t6 = this.user.enrolledClass.length;
                _context4.next = 11;
                return Promise.all(this.user.enrolledClass.map(function (data) {
                  var classroom = new _class["default"](data, {
                    isOld: true
                  });
                  return classroom.toJSON();
                }));

              case 11:
                _context4.t7 = _context4.sent;
                _context4.t8 = {
                  count: _context4.t6,
                  results: _context4.t7
                };
                return _context4.abrupt("return", {
                  id: _context4.t0,
                  email: _context4.t1,
                  name: _context4.t2,
                  fullname: _context4.t3,
                  imageURL: _context4.t4,
                  classrooms: _context4.t5,
                  enrolledIn: _context4.t8
                });

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function toJSON() {
        return _toJSON.apply(this, arguments);
      }

      return toJSON;
    }()
  }], [{
    key: "getAllUser",
    value: function () {
      var _getAllUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var users;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _user["default"].find();

              case 2:
                users = _context5.sent;
                return _context5.abrupt("return", users);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getAllUser() {
        return _getAllUser.apply(this, arguments);
      }

      return getAllUser;
    }()
  }, {
    key: "findUserById",
    value: function () {
      var _findUserById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId) {
        var user;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _user["default"].findOne({
                  userId: userId
                });

              case 2:
                user = _context6.sent;
                return _context6.abrupt("return", user || null);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function findUserById(_x3) {
        return _findUserById.apply(this, arguments);
      }

      return findUserById;
    }()
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;