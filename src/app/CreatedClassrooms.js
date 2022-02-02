import CreatedClassroomModel from "../database/model/createClassroom.model";

class CreatedClassrooms {
  static async insert(userObjectID, classObjectID) {
    CreatedClassroomModel.create({ user: userObjectID, class: classObjectID });
  }

  static async findUserClassrooms(userID) {
    const result = await CreatedClassroomModel.find({ userID })
      .select("class")
      .populate({ path: "class", select: { _id: 0, __v: 0 } });

    return result.map((val) => val.class);
  }

  static async findClassroomStudents(classID) {
    const result = await CreatedClassroomModel.find({ classID });
  }
}

export default CreatedClassrooms;
