import UserQuery from "../database/query/user.query";

class User {
  constructor(data) {
    this.id = data.id;
    this.userID = data.userID;
    this.email = data.email;
    this.firstname = data.firstname;
    this.familyname = data.familyname;
    this.givenname = data.givenname;
    this.imageURL = data.imageURL;
  }

  _sanitize() {
    const data = Object.assign({}, this);
    delete data.id;
    return data;
  }

  toJSON() {
    return this._sanitize();
  }

  static async create(data) {
    const userData = await UserQuery.create(data);
    const { userID } = new User(userData);
    return { userID };
  }

  static async list(filter, selector, option) {
    const users = await UserQuery.users(filter, selector, option);
    return users;
  }

  /**
   *
   * @param {import("mongoose").FilterQuery} condition
   * @param {import("mongoose").QueryOptions} option
   */
  static async delete(condition, option) {
    const userData = await UserQuery.delete(condition, option);
    return userData && new User(userData);
  }

  /**
   *
   * @param {import("mongoose").FilterQuery} condition
   * @param {import("mongoose").UpdateQuery} updateField
   * @param {import("mongoose").QueryOptions} option
   */
  static async update(condition, updateField, option) {
    return await UserQuery.update(condition, updateField, option).exec();
  }
}

export default User;
