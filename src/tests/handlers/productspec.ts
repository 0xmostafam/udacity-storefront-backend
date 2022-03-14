import supertest from "supertest";
import { User } from "../../models/users";
import app from "../../server";
import jwt from "jsonwebtoken";
import Client from "../../database";

const request = supertest(app);

const newUser: User = {
  firstname: "test",
  lastname: "test",
  password: "test",
};

const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET as string);

describe("Testing products endpoints.", () => {
  it("GET /products", async () => {
    const response = await request.get("/products");

    expect(response.statusCode).toBe(200);
  });

  it("GET /products/:id", async () => {
    const response = await request.get("/products/1");

    expect(response.statusCode).toBe(200);
  });

  it("POST /products with token", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "test",
        price: 4,
        category: "test",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("POST /products without token", async () => {
    const response = await request.post("/products").send({
      name: "test",
      price: 4,
      category: "test",
    });

    expect(response.statusCode).toBe(401);
  });

  afterAll(async () => {
    const sql = `DELETE FROM products WHERE products.name = $1`;
    const result = await Client.query(sql, ["test"]);
  });
});
