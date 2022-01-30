import dotenv from "dotenv";
import path from "path";

const { NODE_ENV } = process.env;
const resolvedPath = path.resolve(__dirname, NODE_ENV === "DEV" ? "dev.env" : "prod.env");

dotenv.config({
  path: resolvedPath,
});
