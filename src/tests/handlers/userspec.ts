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

describe("Testing users endpoints.", () => {
  it("GET /users without token", async () => {
    const response = await request.get("/users");

    expect(response.statusCode).toBe(401);
  });

  it("GET /users/ with token", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("GET /users/:id without token", async () => {
    const response = await request.get("/users/1");

    expect(response.statusCode).toBe(401);
  });

  it("GET /users/:id with token", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("POST /users", async () => {
    const response = await request.post("/create_user").send({
      firstname: "test",
      lastname: "test",
      password: "test",
    });

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    const sql = `DELETE FROM users WHERE users.firstname = $1`;
    const result = await Client.query(sql, ["test"]);
  });
});
