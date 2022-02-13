"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpCode = _interopRequireDefault(require("../config/http-code.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiError extends Error {
  /**
   * Api Error Class
   * @param {string} message
   * @param {object} details
   * @param {object|undefined} data
   */
  constructor(message, details, data) {
    super(message || details.name + " " + "Error");
    this.expose = true;
    this.status = details.name;
    this.statusCode = details.code;
    this.description = details.description;
    if (typeof data === "object") this.data = data;
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      status: this.status,
      message: this.message,
      description: this.description,
      ...this.data
    };
  }

  static isApiError(error) {
    return error instanceof ApiError;
  }

  static conflict(message, data) {
    return new ApiError(message, _httpCode.default.Conflict, data);
  }

  static badRequest(message, data) {
    return new ApiError(message, _httpCode.default["Bad Request"], data);
  }

  static notFound(message, data) {
    return new ApiError(message, _httpCode.default["Not Found"], data);
  }

  static handle(error, request, response) {
    const result = { ...error.toJSON(),
      path: request.path
    };
    response.status(error.statusCode).json(result);
  }

}

var _default = ApiError;
exports.default = _default;