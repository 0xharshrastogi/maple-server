/**
 * A async callback
 *
 * @callback AsyncronousCallback
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {undefined | Error | Promise<undefined | Error>}
 */

import { middlewareLog } from "../helper/dubgLogger";

/**
 *
 * @param {AsyncronousCallback} callback
 * @returns {import("express").RequestHandler}
 */
export const handleAsync = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
      middlewareLog(handleAsync.name, callback.name, "Run Succesfully");
    } catch (error) {
      console.log(error);
      next(error);
      middlewareLog(handleAsync.name, "Failed With Error:", error.name);
    }
  };
};
