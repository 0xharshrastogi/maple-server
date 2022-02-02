import { model, Schema } from "mongoose";
import dbConfig from "../../config/DB.json";

const DOCUMENT_NAME = dbConfig.classrooms.DocumentName;
const COLLECTION_NAME = dbConfig.classrooms.CollectionName;

const schema = new Schema(
  {
    classID: {
      type: String,
      required: [true, "Classroom ID is required"],
      unique: [true, "Classroom ID must be unique"],
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Classroom name required"],
      maxlength: [100, "Classroom must be lesst than 100 characters"],
      trim: true,
    },

    subjectName: {
      type: String,
      maxlength: [100, "Classroom must be lesst than 100 characters"],
      trim: true,
      default: "",
    },

    headerImgUrl: {
      type: String,
      trim: true,
      default: dbConfig.classrooms.default.headerImageUrl,
    },

    description: {
      type: String,
      maxlength: [2000, "Classroom must be lesst than 100 characters"],
      default: "",
      trim: true,
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: dbConfig.users.DocumentName,
      required: [true, "Classroom Admin User ID Required"],
    },
  },
  { timestamps: true }
);

const ClassModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

export default ClassModel;
