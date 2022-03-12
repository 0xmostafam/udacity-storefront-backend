CREATE TABLE IF NOT EXISTS order_products (
	order_id INT,
	product_id INT,
	quantity INT,
	PRIMARY KEY(product_id, order_id),
	FOREIGN KEY(product_id)	REFERENCES products(id),
	FOREIGN KEY(order_id) REFERENCES orders(id)
);