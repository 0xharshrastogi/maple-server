import mongoose from "mongoose";
import { dbLog } from "../../helper/dubgLogger";

const DBHOST = process.env.DB_URL;
const DBNAME = process.env.DB_NAME;
const url = `${DBHOST}/${DBNAME}`;

console.log(DBHOST, DBNAME);

mongoose.connect(url).then((value) => {
  dbLog("Database Connected To", url);
}).catch;
