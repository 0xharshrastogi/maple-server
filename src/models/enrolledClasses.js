import { model, Schema } from "mongoose";

const enrolledSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  class: { type: Schema.Types.ObjectId, ref: "class" },
});

const EnrollModel = model("enrolled", enrolledSchema);

export default EnrollModel;
