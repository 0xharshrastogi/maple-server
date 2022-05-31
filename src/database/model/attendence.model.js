import { model, Schema } from 'mongoose';
import dbConfig from '../../config/DB.json';
import DateExtension from '../../helper/DateExtension';

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
schema.static('markAttendence', async function markAttendence({ user, classroom }) {
  const record = {
    user: user.id,
    class: classroom.id,
    timeOfAttendence: {
      $gte: DateExtension.toPreviousHour(new Date()),
      $lte: DateExtension.toNextHour(new Date()),
    },
  };

  if (await this.exists(record)) return;

  await this.create({ user: user.id, class: classroom.id });
});

const AttendenceModel = model(
  dbConfig.attendence.DocumentName,
  schema,
  dbConfig.attendence.CollectionName
);

export default AttendenceModel;
