CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  users_id INT,
  status VARCHAR(10),
  FOREIGN KEY (users_id) REFERENCES users(id)
);
