import mongoose from 'mongoose';
import { dbLog } from '../../helper/dubgLogger';

const DBHOST = process.env.DB_URL;
const DBNAME = process.env.DB_NAME;
var url;

if (process.env.NODE_ENV === 'PROD') url = DBHOST;
if (process.env.NODE_ENV === 'DEV') url = `${DBHOST}/${DBNAME}`;

mongoose
  .connect(url)
  .then((value) => {
    const { name, port, host } = value.connection;
    console.log({ name, port, host });
    dbLog('Database Connected To', {
      name,
      port,
      host,
    });
  })
  .catch(console.log);
