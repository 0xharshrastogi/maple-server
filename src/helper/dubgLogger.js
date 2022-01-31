import debug from "debug";

const prefix = "maple-server:";

export const dbLog = debug(prefix + "Database");
export const errorLog = debug(prefix + "Error");
export const errorType = debug(prefix + "ErrorType");

const middlewareLogger = debug(prefix + "MiddleWare");
export const middlewareLog = (middlewareName, ...message) => {
  middlewareLogger(middlewareName, ...message);
};
