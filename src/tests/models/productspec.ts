import Client from '../../database';
import { ProductQuries } from '../../models/products';

const quries = new ProductQuries();

describe('Product Quries', () => {
	it('should have an method that index products', () => {
		expect(quries.index).toBeDefined();
	});

	it('should have a method that show products', () => {
		expect(quries.show).toBeDefined();
	});

	it('should have a method that create products', () => {
		expect(quries.create).toBeDefined();
	});

	it('index products should return all products', async () => {
		const result = await quries.index();
		expect(result).toEqual([
			{
				id: 1,
				name: 'Pepsi',
				price: 5,
				category: 'Soft Drinks',
			},
			{
				id: 2,
				name: 'Oreo',
				price: 4,
				category: 'Biscuits',
			},
			{
				id: 3,
				name: 'Jelly Cola',
				price: 1,
				category: 'Sweets',
			},
			{
				id: 4,
				name: 'Cono',
				price: 5,
				category: 'Icecream',
			},
			{
				id: 5,
				name: 'Hogos',
				price: 2,
				category: 'Sweets',
			},
		]);
	});

	it('show products should return a single product with the specified id', async () => {
		const result = await quries.show(1);
		expect(result).toEqual({
			id: 1,
			name: 'Pepsi',
			price: 5,
			category: 'Soft Drinks',
		});
	});

	it('create products should return the created product', async () => {
		const result = await quries.create({
			name: 'test',
			price: 6,
			category: 'test',
		});
		expect(result).toEqual({
			id: 7,
			name: 'test',
			price: 6,
			category: 'test',
		});
	});

	afterAll(async () => {
		const sql = 'DELETE FROM products WHERE products.name = $1';
		await Client.query(sql, ['test']);
	});
});
