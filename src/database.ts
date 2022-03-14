import { Pool } from "pg";

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST_TEST,
  POSTGRES_DB_TEST,
  POSTGRES_USER_TEST,
  POSTGRES_PASSWORD_TEST,
  ENV,
} = process.env;
let database_credentials;

if (ENV === "dev") {
  database_credentials = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
} else if (ENV === "test") {
  database_credentials = {
    host: POSTGRES_HOST_TEST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER_TEST,
    password: POSTGRES_PASSWORD_TEST,
  };
}

const client = new Pool(database_credentials);
export default client;
