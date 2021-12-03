import { BadRequestError } from "../middleware/error";
import ClassModel from "../models/classroom";

class ClassRoom {
  constructor(data, option) {
    this.class = option?.isOld ? data : new ClassModel(data);
  }

  save() {
    return this.class.save();
  }

  enrollStudent(userId) {
    if (this.class.students.find((id) => id === userId?.toString()))
      throw new BadRequestError("User Already Enrolled To Class");
    this.class.students.push(userId);
    return this.save();
  }

  static async findById(classId) {
    const classroom = await ClassModel.findById(classId);
    return classroom || null;
  }
}

export default ClassRoom;
