import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductQuries {
	async index(): Promise<Product[]> {
		try {
			const sql = `SELECT 
        products.id,
        products.name,
        products.price,
        products.category
         
        FROM 
        products`;

			const result = await Client.query(sql);

			return result.rows;
		} catch (err) {
			throw { error: `Could not get products. Error: ${err}` };
		}
	}

	async show(id: number): Promise<Product> {
		try {
			const sql = `SELECT 
      products.id,
      products.name,
      products.price,
      products.category
       
      FROM 
      products
      
      WHERE
      products.id = ($1)`;
			const result = await Client.query(sql, [id]);

			return result.rows[0];
		} catch (err) {
			throw { error: `Could not find product with id : ${id}. Error: ${err}` };
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
			const result = await Client.query(sql, [p.name, p.price, p.category]);

			return result.rows[0];
		} catch (err) {
			throw { error: `Could not create product. Error: ${err}` };
		}
	}
}
