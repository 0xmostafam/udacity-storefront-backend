import express, { Request, Response } from "express";
import { User, UserQuries } from "../models/users";

const quries = new UserQuries();

const index = async (req: Request, res: Response) => {
  try {
    const users = await quries.index();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    if (isNaN(parseInt(req.params.id))) throw "ID must be an integer";

    const user = await quries.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.firstname || !req.body.lastname || !req.body.password)
      throw "Missing Parameter firstname/lastname/password";
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastprice,
      password: req.body.password,
    };

    const newUser = await quries.create(user);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const usersRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/create_user", create);
};

export default usersRoutes;
