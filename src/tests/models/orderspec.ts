import { OrderQuries } from '../../models/orders';

const quries = new OrderQuries();

describe('Order Quries', () => {
	it('should have an method that gets completed orders by ID', () => {
		expect(quries.completedOrders).toBeDefined();
	});

	it('should have a method that gets users orders by ID', () => {
		expect(quries.getOrderByUserID).toBeDefined();
	});

	it('getOrderByUserID should return orders of a given user ID', async () => {
		const result = await quries.getOrderByUserID(1);
		expect(result).toEqual([
			{
				orderID: 1,
				userID: 1,
				status: 'ACTIVE',
				products: [
					{
						productName: 'Pepsi',
						quantity: 4,
					},
					{
						productName: 'Oreo',
						quantity: 1,
					},
				],
			},
		]);
	});

	it('completedOrders should only return completed orders with the specified ID', async () => {
		const result = await quries.completedOrders(3);
		expect(result).toEqual([
			{
				orderID: 3,
				userID: 3,
				status: 'COMPLETE',
				products: [
					{
						productName: 'Hogos',
						quantity: 1,
					},
					{
						productName: 'Pepsi',
						quantity: 2,
					},
				],
			},
		]);
	});
});
