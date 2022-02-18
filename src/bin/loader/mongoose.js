import mongoose from 'mongoose';
import config from '../../config/config';
import { dbLog } from '../../helper/dubgLogger';

mongoose
  .connect(config.DBConnectionUri)
  .then((value) => {
    const { name, port, host } = value.connection;
    dbLog('Database Connected To', { name, port, host });
  })
  .catch(console.log);
