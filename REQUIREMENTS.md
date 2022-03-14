# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  - `GET /products`
- Show
  - `GET /products/1`
- Create
  - `POST /products`
  - Example Body { "name" : "test", price: 5, "category" : "test" }
  - token required

#### Users

- Index
  - `GET /users`
  - token required
- Show
  - `GET /users/1`
  - token required
- Create
  - `POST /create_user`
  - token given

#### Orders

- Current Order by user
  - `GET /orders/1`
  - token required
- Completed Orders by user
  - `GET /completed_order/1`
  - token required

## Data Shapes

#### Product

```
TABLE products (
  id serial PRIMARY KEY,
  name VARCHAR(50),
  price FLOAT(2),
  category VARCHAR(30)
);
```

#### User

```
TABLE users (
  id serial PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  password VARCHAR(200)
);
```

#### Orders

```
TABLE orders (
  id serial PRIMARY KEY,
  users_id INT,
  status VARCHAR(10),
  FOREIGN KEY (users_id) REFERENCES users(id)
);
```

#### Order Products

- this table is for connecting between orders and products

```
TABLE order_products (
	order_id INT,
	product_id INT,
	quantity INT,
	PRIMARY KEY(product_id, order_id),
	FOREIGN KEY(product_id)	REFERENCES products(id),
	FOREIGN KEY(order_id) REFERENCES orders(id)
);
```
