CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name VARCHAR(50),
  price FLOAT(2),
  category VARCHAR(30)
);