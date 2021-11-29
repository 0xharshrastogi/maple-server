import { model, Schema } from "mongoose";

const classSchema = new Schema(
  {
    name: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const ClassModel = model("class", classSchema);

export default ClassModel;
