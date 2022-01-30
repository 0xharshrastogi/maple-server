import UserModel from "../model/user.model";

class UserQuery {
  static create(data) {
    return UserModel.create(data);
  }

  /**
   *
   * @param {object} condition
   * @returns {Promise<number>} DeleteCount Number Of Document Deleted
   */
  static delete(condition) {
    return UserModel.deleteOne(condition);
  }

  static async deleteById(userID) {
    return UserQuery.delete({ userID });
  }

  static async deleteByEmail(email) {
    return UserQuery.delete({ email });
  }
}

export default UserQuery;
