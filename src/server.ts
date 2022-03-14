import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ordersRoutes from './handlers/orders';
import productsRoutes from './handlers/products';
import usersRoutes from './handlers/users';

const app: express.Application = express();
const address = '0.0.0.0:3000';
const corsOptions = {
	origin: '*',
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
	res.send('Hello World!');
});

ordersRoutes(app);
productsRoutes(app);
usersRoutes(app);

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});

export default app;
