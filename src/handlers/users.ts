import express, { Request, Response } from "express";
import { User, UserQuries } from "../models/users";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth";

const { JWT_SECRET } = process.env;
const quries = new UserQuries();

const index = async (req: Request, res: Response) => {
  try {
    const users = await quries.index();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    if (isNaN(parseInt(req.params.id))) throw "ID must be an integer";

    const user = await quries.show(parseInt(req.params.id));
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    if (!req.body.firstname || !req.body.lastname || !req.body.password)
      throw {
        error: `Missing Parameter firstname/lastname/password, given parameter -> ${req.body.firstname}, ${req.body.lastname}, ${req.body.password}`,
      };
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newUser = await quries.create(user);
    const token = jwt.sign({ user: newUser }, JWT_SECRET as string);
    return res.status(200).json(token);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const usersRoutes = (app: express.Application) => {
  app.get("/users", auth, index);
  app.get("/users/:id", auth, show);
  app.post("/create_user", create);
};

export default usersRoutes;
