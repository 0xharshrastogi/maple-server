import ClassRoom from "../controllers/class";
import { NotFoundError } from "./error";

// eslint-disable-next-line import/prefer-default-export
export async function putClassroom(req, res, next) {
  const { classId } = req.params;
  try {
    const classroom = await ClassRoom.findById(classId);

    if (!classroom)
      throw new NotFoundError(`No Class Found With ID:${classId}`);

    req.classroom = classroom;

    next();
  } catch (err) {
    next(err);
  }
}
