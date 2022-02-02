import nanoid from "nanoid";
import UserModel from "../database/model/user.model";
import UserQuery from "../database/query/user.query";
import Classroom from "./classroom";
import CreatedClassrooms from "./CreatedClassrooms";

const alphabet = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

class User {
  constructor(data) {
    const user = data?._doc;
    const keys = Object.keys(user);

    for (const key of keys) {
      this[key] = user[key];
    }
  }

  async createClassroom(data) {
    const adminID = this._id;
    const classID = nanoid.customAlphabet(alphabet, 7)();
    const classData = { ...data, admin: adminID, classID };

    const newClass = await Classroom.create(classData);
    await CreatedClassrooms.insert(adminID, newClass._id);

    return newClass;
  }

  static async findUserClassrooms(userID) {
    const result = await CreatedClassrooms.findUserClassrooms(userID);
    return result;
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
