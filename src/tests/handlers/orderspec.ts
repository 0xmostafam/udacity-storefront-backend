import supertest from "supertest";
import { User } from "../../models/users";
import app from "../../server";
import jwt from "jsonwebtoken";

const request = supertest(app);

const newUser: User = {
  firstname: "test",
  lastname: "test",
  password: "test",
};

const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET as string);

describe("Testing orders endpoints.", () => {
  it("GET /orders/:id", async () => {
    const response = await request
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  it("GET /completed_orders/:id", async () => {
    const response = await request
      .get("/completed_orders/3")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
