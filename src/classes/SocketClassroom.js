class Classroom {
  constructor(classID) {
    if (!classID) throw new Error('Class ID Required');

    if (Classroom.has(classID))
      throw new Error(`Classroom Already Has ${classID}, try using Classroom.get()`);

    Classroom.classes.set(classID, this);
    this.participants = [];
  }

  addParticipant(participant) {
    this.participants.push(participant);
    return this;
  }

  removeParticipant(filterCallback) {
    this.participants = this.participants.filter(filterCallback);
  }

  // static
  static classes = new Map();

  static has(classID) {
    return Classroom.classes.has(classID);
  }

  static get(classID) {
    return Classroom.classes.get(classID);
  }

  static remove(classID) {
    return Classroom.classes.delete(classID);
  }
}

export default Classroom;
