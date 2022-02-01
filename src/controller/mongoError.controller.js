import ApiError from "./error.control";

export const MongoErrorType = {
  duplication: "DuplicationError",
  validation: "ValidationError",
};

class MongoError extends Error {
  constructor(type, message, data) {
    super(message);
    this.name = type;
  }

  toJSON() {
    return { name: this.name, message: this.message };
  }

  static handleDuplicationError(error) {
    const dupKeys = Object.keys(error.keyPattern).join(" ");
    return new MongoError(MongoErrorType.duplication, `Duplicate Keys: ${dupKeys}`);
  }

  static handleValidationError(error) {
    console.log(error.errors);
    const message = Object.keys(error.errors)
      .map((key) => {
        const { path, message } = error.errors[key].properties;
        return `"${path}": ${message}`;
      })
      .join("\n");
    return new MongoError(MongoErrorType.validation, message);
  }

  static _isDuplicationError(error) {
    return error.code === 11000 && error.name === "MongoServerError";
  }
  static _isValidationError(error) {
    return error.name === "ValidationError";
  }

  static typeOf(error) {
    if (MongoError._isDuplicationError(error)) return MongoErrorType.duplication;
    if (MongoError._isValidationError(error)) return MongoErrorType.validation;
  }

  static isMongoError(error) {
    if (MongoError._isDuplicationError(error)) return true;
    if (MongoError._isValidationError(error)) return true;

    return false;
  }

  static handle(error) {
    const type = MongoError.typeOf(error);

    switch (type) {
      case MongoErrorType.duplication:
        return MongoError.handleDuplicationError(error);

      case MongoErrorType.validation:
        return MongoError.handleValidationError(error);
    }

    console.log(error);
  }

  static convertMongoErrorToApiError(error) {
    const mongoerror = MongoError.handle(error);

    switch (mongoerror.name) {
      case MongoErrorType.duplication:
        return ApiError.conflict(mongoerror.message);
      case MongoErrorType.validation:
        return ApiError.badRequest(mongoerror.message);
    }
  }
}

export default MongoError;
