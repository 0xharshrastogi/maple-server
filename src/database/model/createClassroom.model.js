import { model, Schema } from "mongoose";
import dbConfig from "../../config/DB.json";

const DOCUMENT_NAME = dbConfig.createdClassroom.DocumentName;
const COLLECTION_NAME = dbConfig.createdClassroom.CollectionName;

const UserSchemaName = dbConfig.users.DocumentName;
const ClassroomSchemaName = dbConfig.classrooms.DocumentName;

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: UserSchemaName,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: ClassroomSchemaName,
  },
});

const CreatedClassroomModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

export default CreatedClassroomModel;
