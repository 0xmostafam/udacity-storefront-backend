import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { OrderQuries } from '../models/orders';

const quries = new OrderQuries();

const index = async (req: Request, res: Response) => {
	try {
		if (isNaN(parseInt(req.params.id))) throw 'ID must be an integer';

		const orders = await quries.getOrderByUserID(parseInt(req.params.id));
		return res.status(200).json(orders);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const indexCompleted = async (req: Request, res: Response) => {
	try {
		if (isNaN(parseInt(req.params.id))) throw 'ID must be an integer';

		const orders = await quries.completedOrders(parseInt(req.params.id));
		return res.status(200).json(orders);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const ordersRoutes = (app: express.Application) => {
	app.get('/orders/:id', auth, index);
	app.get('/completed_orders/:id', auth, indexCompleted);
};

export default ordersRoutes;
