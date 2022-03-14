import { UserQuries } from '../../models/users';
import Client from '../../database';

const quries = new UserQuries();

describe('User Quries', () => {
	it('should have an method that index users', () => {
		expect(quries.index).toBeDefined();
	});

	it('should have a method that show users', () => {
		expect(quries.show).toBeDefined();
	});

	it('should have a method that create users', () => {
		expect(quries.create).toBeDefined();
	});

	it('index users should return all users', async () => {
		const result = await quries.index();
		expect(result).toEqual([
			{
				id: 1,
				firstname: 'Mostafa',
				lastname: 'Elbadri',
			},
			{
				id: 2,
				firstname: 'Nabil',
				lastname: 'Tharwat',
			},
			{
				id: 3,
				firstname: 'Ahmed',
				lastname: 'Mostafa',
			},
			{
				id: 4,
				firstname: 'Hussien',
				lastname: 'Essam',
			},
			{
				id: 5,
				firstname: 'Mohamed',
				lastname: 'Hisham',
			},
		]);
	});

	it('show users should return a single user with the specified id', async () => {
		const result = await quries.show(1);
		expect(result).toEqual({
			id: 1,
			firstname: 'Mostafa',
			lastname: 'Elbadri',
		});
	});

	it('create users should return the created user', async () => {
		const result = await quries.create({
			firstname: 'test',
			lastname: 'test',
			password: 'test',
		});
		expect(result).toEqual({
			id: 7,
			firstname: 'test',
			lastname: 'test',
		});
	});
	afterAll(async () => {
		const sql = 'DELETE FROM users WHERE users.firstname = $1';
		await Client.query(sql, ['test']);
	});
});
