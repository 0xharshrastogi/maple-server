import ApiError from "./error.control";

export const MongoErrorType = {
  duplication: "DuplicationError",
};

class MongoError extends Error {
  constructor(type, message) {
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

  static _isDuplicationError(error) {
    return error.code === 11000 && error.name === "MongoServerError";
  }

  static typeOf(error) {
    if (MongoError._isDuplicationError(error)) return MongoErrorType.duplication;
  }

  static isMongoError(error) {
    if (MongoError._isDuplicationError(error)) return true;

    return false;
  }

  static handle(error) {
    const type = MongoError.typeOf(error);

    switch (type) {
      case MongoErrorType.duplication:
        return MongoError.handleDuplicationError(error);
    }

    console.log(error);
  }

  static convertMongoErrorToApiError(error) {
    const mongoerror = MongoError.handle(error);

    switch (mongoerror.name) {
      case MongoErrorType.duplication:
        return ApiError.conflict(mongoerror.message);
    }
  }
}

export default MongoError;
