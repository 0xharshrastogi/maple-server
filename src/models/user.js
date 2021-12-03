import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstname: { type: String, trim: true },
  imageURL: { type: String, trim: true },
  email: { type: String, trim: true, unique: true },
  userId: { type: Number, required: true, unique: true },
  familyname: { type: String, trim: true },
  givenName: { type: String, trim: true },
  role: { type: String, trim: true },
  class: [{ type: Schema.Types.ObjectId, ref: "class" }],
  enrolledClass: [{ type: Schema.Types.ObjectId, ref: "class" }],
});

const User = model("users", userSchema);

export default User;
