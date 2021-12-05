import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import { NotFoundError } from "./middleware/error";
import v1Routes from "./routes/v1";

const app = express();

// view engine setup

app.use(logger("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/v1", v1Routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new NotFoundError("Invalid Path"));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.statusCode || 500);
  res.json({
    code: err.statusCode || 500,
    name: err.name || "InternalServerError",
    message: err.message || "Internal Server Error",
  });
});

export default app;
