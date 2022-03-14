CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  password VARCHAR(200)
);

INSERT INTO users(firstname, lastname, password) VALUES('Mostafa', 'Elbadri', 'abcd');
INSERT INTO users(firstname, lastname, password) VALUES('Nabil', 'Tharwat', 'abcd');
INSERT INTO users(firstname, lastname, password) VALUES('Ahmed', 'Mostafa', 'abcd');
INSERT INTO users(firstname, lastname, password) VALUES('Hussien', 'Essam', 'abcd');
INSERT INTO users(firstname, lastname, password) VALUES('Mohamed', 'Hisham', 'abcd');