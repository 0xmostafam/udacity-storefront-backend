CREATE TABLE IF NOT EXISTS order_products (
	order_id INT,
	product_id INT,
	quantity INT,
	PRIMARY KEY(product_id, order_id),
	FOREIGN KEY(product_id)	REFERENCES products(id),
	FOREIGN KEY(order_id) REFERENCES orders(id)
);


INSERT INTO order_products(order_id, product_id, quantity) VALUES (1, 1, 4);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (1, 2, 1);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (2, 3, 10);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (2, 4, 3);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (3, 5, 1);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (3, 1, 2);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (4, 2, 1);
INSERT INTO order_products(order_id, product_id, quantity) VALUES (4, 3, 2);