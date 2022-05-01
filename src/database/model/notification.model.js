import { model, Schema } from 'mongoose';
import DbConfig from '../../config/DB.json';

const DOCUMENT_NAME = DbConfig.notification.DocumentName;
const COLLECTION_NAME = DbConfig.notification.CollectionName;

const schema = new Schema(
  {
    classID: { type: Schema.Types.ObjectId, ref: DbConfig.classrooms.DocumentName, required: true },
    title: {
      type: String,
      required: true,
      trim: true,
      length: 200,
    },
  },
  { timestamps: true }
);

const NotificationModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default NotificationModel;
