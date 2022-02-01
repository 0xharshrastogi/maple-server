import UserModel from "../database/model/user.model";
import UserQuery from "../database/query/user.query";

class User {
  constructor(data) {
    const user = data?._doc;
    const keys = Object.keys(user);

    for (const key of keys) {
      this[key] = user[key];
    }

    // this.id = data.id;
    // this.userID = data.userID;
    // this.email = data.email;
    // this.firstname = data.firstname;
    // this.familyname = data.familyname;
    // this.givenname = data.givenname;
    // this.imageURL = data.imageURL;
  }

  static *keys() {
    const validKey = [
      "_id",
      "__v",
      "userID",
      "email",
      "firstname",
      "familyname",
      "givenname",
      "imageURL",
    ];

    for (const key of validKey) {
      yield key;
    }
  }

  _sanitize() {
    const data = Object.assign({}, this);
    delete data._id;
    delete data.__v;
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

  static async find(filter, projection) {
    const userData = await UserModel.findOne(filter, projection);
    if (!userData) return null;
    return new User(userData);
  }
}

export default User;
