import { model, Schema } from 'mongoose';
import dbConfig from '../../config/DB.json';
import DateExtension from '../../helper/DateExtension';
import ClassModel from './classroom.model';
import UserModel from './user.model';

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
  const obj = {
    user: user.id,
    class: classroom.id,
    timeOfAttendence: {
      $gte: DateExtension.toPreviousHour(new Date()),
      $lte: DateExtension.toNextHour(new Date()),
    },
  };

  if (await this.exists(obj)) return;

  this.create({ user: user.id, class: classroom.id });
});

const AttendenceModel = model(
  dbConfig.attendence.DocumentName,
  schema,
  dbConfig.attendence.CollectionName
);

export default AttendenceModel;

(async function () {
  const user = await UserModel.findOne({ email: 'rastogiharsh04@gmail.com' });
  const classroom = await ClassModel.findById('622c5e9a31f8281db0a79a99');
  AttendenceModel.markAttendence(user, classroom);
  // let all = await await AttendenceModel.find({
  //   user: user.id,
  //   classroom: classroom.id,
  //   timeOfAttendence: { $gte: previousHour(new Date()) },
  // });
  // console.log(all);
  // const dates = all.map((val) => new Date(val.timeOfAttendence));
  // new Date(new Date().)
  // console.log(all);
})();
