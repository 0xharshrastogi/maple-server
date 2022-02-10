import { model, Schema } from 'mongoose';
import validator from 'validator';
import DbConfig from '../../config/DB.json';

const DOCUMENT_NAME = DbConfig.users.DocumentName;
const COLLECTION_NAME = DbConfig.users.CollectionName;
const DEFAULT_IMAGE_URL = DbConfig.users.default.imageurl;

const schema = new Schema({
  userID: {
    type: String,
    required: [true, 'userID: Required'],
    unique: [true, 'userID: must be unique'],
  },

  firstname: {
    type: String,
    required: [true, 'firstname: Required'],
    minlength: [2, 'Minimum length must be 2'],
    maxlength: [100, 'firstname: length should be more than 100'],
    trim: true,
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
    required: [true, 'email: Required'],
    unique: [true, 'Must Be Unique'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: function ({ value }) {
        return `"${value}" Not a valid Email`;
      },
    },
  },

  familyname: {
    type: String,
    required: [true, 'familyname: Required'],
    maxlength: [100, 'familyname: length should be more than 100'],
    trim: true,
  },

  givenname: {
    type: String,
    required: [true, 'givenname: Required'],
    maxlength: [100, 'givenname: length should be more than 100'],
    trim: true,
  },
});

// *NOTE ---------INSTANCE METHODS ------------- //

// *NOTE ---------STATIC METHODS ------------- //

schema.static('findByEmail', function (email) {
  return this.findOne({ email });
});

schema.static('findByID', function (userID) {
  return this.findOne({ userID });
});

schema.static('all', function () {
  return this.find();
});

schema.static('deleteByID', function ({ userID }) {
  return this.deleteOne({ userID });
});

// *NOTE ---------QUERY METHODS ------------- //

schema.query.customSelect = function (selectors, options) {
  const { includeID, includeVersion } = Object.assign(
    { includeID: true, includeVersion: true },
    options
  );
  let selected = [selectors, !includeID ? '-_id' : '', !includeVersion ? '-__v' : ''].join(' ');
  return this.select(selected);
};
// *NOTE --------- END ------------- //

const UserModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);
export default UserModel;
