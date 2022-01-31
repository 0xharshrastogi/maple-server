const httpcode = require("./src/config/http-code.json");

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
      ...this.data,
    };
  }

  static isApiError(error) {
    return error instanceof ApiError;
  }

  static conflict(message, data) {
    return new ApiError(message, httpcode.Conflict, data);
  }
}

const err = ApiError.conflict();

console.log(JSON.stringify(err, null, 2));
