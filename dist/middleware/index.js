"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAsync = void 0;

var _dubgLogger = require("../helper/dubgLogger");

/**
 * A async callback
 *
 * @callback AsyncronousCallback
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {undefined | Error | Promise<undefined | Error>}
 */

/**
 *
 * @param {AsyncronousCallback} callback
 * @returns {import("express").RequestHandler}
 */
const handleAsync = callback => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
      (0, _dubgLogger.middlewareLog)(handleAsync.name, callback.name, "Run Succesfully");
    } catch (error) {
      console.log(error);
      next(error);
      (0, _dubgLogger.middlewareLog)(handleAsync.name, "Failed With Error:", error.name);
    }
  };
};

exports.handleAsync = handleAsync;