"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../model/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserQuery {
  static create(data) {
    return _user.default.create(data);
  }
  /**
   *
   * @param {import("mongoose").FilterQuery} condition
   * @param {import("mongoose").QueryOptions} option
   */


  static delete(condition, option) {
    return _user.default.findOneAndDelete(condition, option).exec();
  }
  /**
   *
   * @param {string} condition
   * @param {import("mongoose").QueryOptions} option
   */


  static async deleteById(userID, option) {
    return UserQuery.delete({
      userID
    }, option);
  }
  /**
   *
   * @param {string} condition
   * @param {import("mongoose").QueryOptions} option
   */


  static async deleteByEmail(email, option) {
    return UserQuery.delete({
      email
    }, option);
  }

  static users(filter, selector, option) {
    return _user.default.find(filter, selector, option);
  }
  /**
   *
   * @param {import("mongoose").FilterQuery} condition
   * @param {import("mongoose").UpdateQuery} updateField
   * @param {import("mongoose").QueryOptions} option
   */


  static update(condition, updateField, option) {
    return _user.default.findOneAndUpdate(condition, updateField, option);
  }

}

var _default = UserQuery;
exports.default = _default;