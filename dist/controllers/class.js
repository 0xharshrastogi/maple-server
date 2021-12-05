"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _error = require("../middleware/error");

var _classroom = _interopRequireDefault(require("../models/classroom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ClassRoom = /*#__PURE__*/function () {
  function ClassRoom(data, option) {
    _classCallCheck(this, ClassRoom);

    this["class"] = option !== null && option !== void 0 && option.isOld ? data : new _classroom["default"](data);
  }

  _createClass(ClassRoom, [{
    key: "save",
    value: function save() {
      return this["class"].save();
    }
  }, {
    key: "toJSON",
    value: function () {
      var _toJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this["class"].populate("instructor");

              case 2:
                return _context.abrupt("return", {
                  name: this["class"].name,
                  id: this["class"].id,
                  createdAt: this["class"].createdAt,
                  instructor: {
                    id: this["class"].instructor.userId,
                    imageURL: this["class"].instructor.imageURL,
                    email: this["class"].instructor.email,
                    name: {
                      first: this["class"].instructor.firstname,
                      last: this["class"].instructor.familyname
                    }
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toJSON() {
        return _toJSON.apply(this, arguments);
      }

      return toJSON;
    }()
  }, {
    key: "enrollStudent",
    value: function enrollStudent(userId) {
      if (this["class"].students.find(function (id) {
        return id === (userId === null || userId === void 0 ? void 0 : userId.toString());
      })) throw new _error.BadRequestError("User Already Enrolled To Class");
      this["class"].students.push(userId);
      return this.save();
    }
  }, {
    key: "removeStudent",
    value: function removeStudent(userId) {
      this["class"].students = this["class"].students.filter(function (value) {
        return (value === null || value === void 0 ? void 0 : value.toString()) !== (userId === null || userId === void 0 ? void 0 : userId.toString());
      });
      return this.save();
    }
  }], [{
    key: "findById",
    value: function () {
      var _findById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(classId) {
        var classroom;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _classroom["default"].findById(classId);

              case 2:
                classroom = _context2.sent;
                return _context2.abrupt("return", classroom || null);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findById(_x) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }]);

  return ClassRoom;
}();

var _default = ClassRoom;
exports["default"] = _default;