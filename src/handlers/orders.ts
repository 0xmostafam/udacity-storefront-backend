import express, { Request, Response } from "express";
import { Order, OrderQuries } from "../models/orders";

const quries = new OrderQuries();

const index = async (req: Request, res: Response) => {
  try {
    if (isNaN(parseInt(req.params.id))) throw "ID must be an integer";

    const orders = await quries.getOrderByUserID(parseInt(req.params.id));
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

const indexCompleted = async (req: Request, res: Response) => {
  try {
    if (isNaN(parseInt(req.params.id))) throw "ID must be an integer";

    const orders = await quries.completedOrders(parseInt(req.params.id));
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get("/orders/:id", index);
  app.get("/completed_orders/:id", indexCompleted);
};

export default ordersRoutes;
