import UserModel from "../model/user.model";

class UserQuery {
  static create(data) {
    return UserModel.create(data);
  }

  /**
   *
   * @param {import("mongoose").FilterQuery} condition
   * @param {import("mongoose").QueryOptions} option
   */
  static delete(condition, option) {
    return UserModel.findOneAndDelete(condition, option).exec();
  }

  /**
   *
   * @param {string} condition
   * @param {import("mongoose").QueryOptions} option
   */
  static async deleteById(userID, option) {
    return UserQuery.delete({ userID }, option);
  }

  /**
   *
   * @param {string} condition
   * @param {import("mongoose").QueryOptions} option
   */
  static async deleteByEmail(email, option) {
    return UserQuery.delete({ email }, option);
  }

  static users(filter, selector, option) {
    return UserModel.find(filter, selector, option);
  }

  /**
   *
   * @param {import("mongoose").FilterQuery} condition
   * @param {import("mongoose").UpdateQuery} updateField
   * @param {import("mongoose").QueryOptions} option
   */
  static update(condition, updateField, option) {
    return UserModel.findOneAndUpdate(condition, updateField, option);
  }
}

export default UserQuery;
