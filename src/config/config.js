import dotenv from 'dotenv';

dotenv.config();

const setDatabaseUri = () => {
  if (!process.env.MODE) throw new Error('MODE Required');
  const { DATABASE_NAME } = process.env;

  if (!DATABASE_NAME) throw new Error('Database Name Not Found In Process.Env');

  if (process.env.MODE === 'production') {
    const { DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;
    return `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@mappledb.rj6u6.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
  }

  if (process.env.MODE === 'development') {
    return `mongodb://localhost:27017/${DATABASE_NAME}`;
  }
};

console.log('DEVELOPMENT_MODE:', process.env.MODE);

const config = {
  PORT: 8080,
  MODE: process.env.MODE,
  DBConnectionUri: setDatabaseUri(),
};

console.log(config);

export default config;
