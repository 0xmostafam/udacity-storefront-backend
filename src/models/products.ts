import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductQuries {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT 
        products.id,
        products.name,
        products.price,
        products.category
         
        FROM 
        products`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
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
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order with id : ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql = `INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.category]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product. Error: ${err}`);
    }
  }
}
