import { model, Schema } from 'mongoose';
import dbConfig from '../../config/DB.json';

const DOCUMENT_NAME = dbConfig.enrolledClassroom.DocumentName;
const COLLECTION_NAME = dbConfig.enrolledClassroom.CollectionName;

const UserSchemaName = dbConfig.users.DocumentName;
const ClassroomSchemaName = dbConfig.classrooms.DocumentName;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true },
  class: { type: Schema.Types.ObjectId, ref: ClassroomSchemaName, required: true },
});

// Static Method
schema.static('enrollUserToClassroom', async function (user, classroom) {
  if (!classroom.id) throw new Error('Unable To Find ID in Classroom Object');
  if (!user.id) throw new Error('Unable To Find ID in User Object');

  if (await this.exists({ user: user.id, class: classroom.id }))
    throw new Error('Already enrolled to classroom');

  return this.create({ user: user.id, class: classroom.id });
});

const EnrolledClassroomModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default EnrolledClassroomModel;
