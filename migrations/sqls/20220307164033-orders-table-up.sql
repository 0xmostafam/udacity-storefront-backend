CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  users_id INT,
  status VARCHAR(10),
  FOREIGN KEY (users_id) REFERENCES users(id)
);


INSERT INTO orders(users_id, status) VALUES(1, 'ACTIVE');
INSERT INTO orders(users_id, status) VALUES(2, 'ACTIVE');
INSERT INTO orders(users_id, status) VALUES(3, 'COMPLETE');
INSERT INTO orders(users_id, status) VALUES(4, 'COMPLETE');