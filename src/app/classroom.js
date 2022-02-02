import ClassModel from "../database/model/classroom.model";

class Classroom {
  constructor(data) {
    const classroom = data?._doc;
    const keys = Object.keys(classroom);

    for (const key of keys) {
      this[key] = classroom[key];
    }
  }

  _sanitize() {
    const data = Object.assign({}, this);
    delete this._id;
    delete this.__v;
    return data;
  }

  toJSON() {
    return this._sanitize();
  }

  static async create(body) {
    const data = await ClassModel.create(body);
    return new Classroom(data);
  }

  static async findClassroomsByUserID(userID, select = { admin: 0 }) {
    const result = await ClassModel.find({}, select).populate({
      path: "admin",
      match: { userID },
    });

    return result;
  }
}

export default Classroom;
