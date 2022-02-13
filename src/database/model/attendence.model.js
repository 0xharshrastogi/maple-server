import { model, Schema } from 'mongoose';
import dbConfig from '../../config/DB.json';

const schema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: dbConfig.classrooms.DocumentName,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: dbConfig.users.DocumentName,
    required: true,
  },

  timeOfAttendence: {
    type: Date,
    default: () => new Date(),
  },
});

// static method
schema.static('markAttendence', async function markAttendence(user, classroom) {
  const obj = { user: user.id, class: classroom.id };
  if (await this.exists(obj)) return;
  this.create(obj);
});

const AttendenceModel = model(
  dbConfig.attendence.DocumentName,
  schema,
  dbConfig.attendence.CollectionName
);

export default AttendenceModel;
