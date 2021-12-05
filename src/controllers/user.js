import { ConflictError, ForbiddenError } from "../middleware/error";
import UserModel from "../models/user";
import ClassRoom from "./class";

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
    const isAlreadyEnrolled = this.user.enrolledClass.find(
      (value) => value?.toString() === classId?.toString(),
    );

    if (isAlreadyEnrolled) throw new ForbiddenError("User Is Already Enrolled");

    this.user.enrolledClass.push(classId);
    return this.save({ isUpdate: true });
  }

  async removeFrom(classId) {
    this.user.enrolledClass = this.user.enrolledClass.filter(
      (value) => value?.toString() !== classId?.toString(),
    );

    return this.save({ isUpdate: true });
  }

  async toJSON() {
    await this.user.populate("enrolledClass");
    await this.user.populate("class");
    return {
      id: this.user.userId,
      email: this.user.email,
      name: { first: this.user.firstname, last: this.user.familyname },
      fullname: `${this.user.firstname} ${this.user.familyname}`,
      imageURL: this.user.imageURL,
      classrooms: await Promise.all(
        this.user.class.map((classroom) =>
          new ClassRoom(classroom, { isOld: true }).toJSON(),
        ),
      ),
      enrolledIn: {
        count: this.user.enrolledClass.length,
        results: await Promise.all(
          this.user.enrolledClass.map((data) => {
            const classroom = new ClassRoom(data, { isOld: true });
            return classroom.toJSON();
          }),
        ),
      },
    };
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
