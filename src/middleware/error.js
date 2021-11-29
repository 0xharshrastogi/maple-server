function createErrorClass(code, name) {
  return class CustomError extends Error {
    // eslint-disable-next-line no-useless-constructor
    constructor(message) {
      super(message);
      this.statusCode = code;
      this.name = name;
    }
  };
}

export const NotFoundError = createErrorClass(404, "NotFound");
export const ConflictError = createErrorClass(409, "ConflictError");
export const InternalServerError = createErrorClass(500, "InternalServerError");
