import { ConflictError } from "../middleware/error";
import UserModel from "../models/user";

class User {
  constructor(userData, option) {
    this.user = option?.isOld ? userData : new UserModel(userData);
  }

  async save({ isUpdate } = {}) {
    if (!isUpdate) {
      const res = await User.findUserById(this.user.userId);
      if (res) throw new ConflictError("User With Same User Id Already Exisit");
    }
    return this.user.save();
  }

  update(data) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(data)) this.user[key] = data[key];
  }

  addClass(classId) {
    this.user.class.push(classId);
    return this.save({ isUpdate: true });
  }

  async enrollTo(classId) {
    console.log(classId);
    this.user.enrolledClass.push(classId);
    return this.save({ isUpdate: true });
  }

  static async getAllUser() {
    const users = await UserModel.find();
    return users;
  }

  static async findUserById(userId) {
    const user = await UserModel.findOne({ userId });

    return user || null;
  }
}

export default User;
