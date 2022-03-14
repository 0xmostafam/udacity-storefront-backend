import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const { JWT_SECRET } = process.env;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET as string);
    next();
    return;
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
};
