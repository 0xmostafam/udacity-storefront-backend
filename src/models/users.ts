import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password?: string;
};

const { PEPPER, SALT_ROUNDS } = process.env;

export class UserQuries {
	async index(): Promise<User[]> {
		try {
			const sql = `SELECT 
        users.id,
        users.firstname,
        users.lastname
         
        FROM 
        users`;

			const result = await Client.query(sql);

			return result.rows;
		} catch (err) {
			throw { error: `Could not get users. Error: ${err}` };
		}
	}

	async show(id: number): Promise<User> {
		try {
			const sql = `SELECT 
      users.id,
      users.firstname,
      users.lastname
       
      FROM 
      users
      
      WHERE
      users.id = $1`;
			const result = await Client.query(sql, [id]);

			return result.rows[0];
		} catch (err) {
			throw { error: `Could not find user with id : ${id}. Error: ${err}` };
		}
	}

	async create(u: User): Promise<User> {
		try {
			const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING users.id, users.firstname, users.lastname';
			const hash = bcrypt.hashSync(
				u.password + (PEPPER as string),
				parseInt(SALT_ROUNDS as string)
			);
			const result = await Client.query(sql, [u.firstname, u.lastname, hash]);

			return result.rows[0];
		} catch (err) {
			throw { error: `Could not create user. Error: ${err}` };
		}
	}
}
