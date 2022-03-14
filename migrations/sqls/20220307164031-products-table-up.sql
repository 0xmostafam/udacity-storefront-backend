CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name VARCHAR(50),
  price FLOAT(2),
  category VARCHAR(30)
);

INSERT INTO products(name, price, category) VALUES('Pepsi', 5.00 , 'Soft Drinks');
INSERT INTO products(name, price, category) VALUES('Oreo', 4.00 , 'Biscuits');
INSERT INTO products(name, price, category) VALUES('Jelly Cola', 1.00 , 'Sweets');
INSERT INTO products(name, price, category) VALUES('Cono', 5.00 , 'Icecream');
INSERT INTO products(name, price, category) VALUES('Hogos', 2.00 , 'Sweets');