import Client from "../database";

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password?: string;
};

export class UserQuries {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT 
        users.id,
        users.firstname,
        users.lastname
         
        FROM 
        users`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = `SELECT 
      users.id,
      users.firstname,
      users.lastname,
       
      FROM 
      users
      
      WHERE
      users.id = ($1)`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with id : ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *`;
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product. Error: ${err}`);
    }
  }
}
