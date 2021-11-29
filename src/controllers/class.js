import ClassModel from "../models/classroom";

class ClassRoom {
  constructor(data, { isOld }) {
    this.class = isOld ? data : new ClassModel(data);
  }
}

export default ClassRoom;
