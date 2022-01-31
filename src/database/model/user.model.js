import { model, Schema } from "mongoose";
import validator from "validator";
import DbConfig from "../../config/DB.json";

const DOCUMENT_NAME = DbConfig.users.DocumentName;
const COLLECTION_NAME = DbConfig.users.CollectionName;
const DEFAULT_IMAGE_URL = DbConfig.users.default.imageurl;
const CLASSROOM_COLLECTION_NAME = DbConfig.classrooms.CollectionName;

const schema = new Schema({
  userID: {
    type: String,
    required: [true, "userID: Required"],
    unique: [true, "userID: must be unique"],
  },

  firstname: {
    type: String,
    required: [true, "firstname: Required"],
    trim: true,
    maxlength: [100, "firstname: length should be more than 100"],
  },

  imageURL: {
    type: String,
    trim: true,
    default: DEFAULT_IMAGE_URL,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "email: Required"],
    unique: [true, "Must Be Unique"],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: (value) => `"${value}" Not a valid Email`,
    },
  },

  familyname: {
    type: String,
    required: [true, "familyname: Required"],
    maxlength: [100, "familyname: length should be more than 100"],
    trim: true,
  },

  givenname: {
    type: String,
    required: [true, "givenname: Required"],
    maxlength: [100, "givenname: length should be more than 100"],
    trim: true,
  },

  classrooms: {
    created: [
      {
        type: Schema.Types.ObjectId,
        ref: CLASSROOM_COLLECTION_NAME,
      },
    ],
    enrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: CLASSROOM_COLLECTION_NAME,
      },
    ],
  },
});

const UserModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

export default UserModel;
