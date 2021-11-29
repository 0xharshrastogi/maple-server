import User from "../controllers/user";

// eslint-disable-next-line import/prefer-default-export
export async function putUser(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findUserById(userId);
    req.user = user || null;
    next();
  } catch (err) {
    next(err);
  }
}
