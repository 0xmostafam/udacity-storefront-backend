CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  password VARCHAR(50)
);