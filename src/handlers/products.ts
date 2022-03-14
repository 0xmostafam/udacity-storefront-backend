import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { Product, ProductQuries } from '../models/products';

const quries = new ProductQuries();

const index = async (req: Request, res: Response) => {
	try {
		const products = await quries.index();
		return res.status(200).json(products);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		if (isNaN(parseInt(req.params.id))) throw 'ID must be an integer';

		const products = await quries.show(parseInt(req.params.id));
		return res.status(200).json(products);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		if (!req.body.name || !req.body.price || !req.body.category)
			throw 'Missing Parameter name/price/category';
		const product: Product = {
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
		};

		const newProduct = await quries.create(product);
		return res.status(200).json(newProduct);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const productsRoutes = (app: express.Application) => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', auth, create);
};

export default productsRoutes;
