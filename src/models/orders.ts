import Client from "../database";

export type Order = {
  orderID: number;
  userID: number;
  status: string;
  products?: {
    productName: string;
    quantity: number;
  }[];
};

const reformatOrders = (sqlResult: any[], userID: number): Order[] => {
  const orders: Order[] = [];

  sqlResult.forEach((currentOrder) => {
    if (!orders.some((order) => order.orderID === currentOrder.id)) {
      const newOrder: Order = {
        orderID: currentOrder.id,
        userID: userID,
        status: currentOrder.status,
        products: [],
      };
      orders.push(newOrder);
    }

    const newProduct = {
      productName: currentOrder.name as string,
      quantity: currentOrder.quantity as number,
    };
    orders
      .find((order) => order.orderID === currentOrder.id)
      ?.products?.push(newProduct);
  });

  return orders;
};

export class OrderQuries {
  async getOrderByUserID(id: number): Promise<Order[]> {
    try {
      const sql = `SELECT 
        orders.id as id,
        products.name as name,
        order_products.quantity as quantity,
        orders.status as status

        FROM 
        ((orders
           INNER JOIN order_products ON orders.id = order_products.order_id)
           INNER JOIN products ON order_products.product_id = products.id
        )
        
        WHERE
          orders.users_id = ($1)`;
      const result = await Client.query(sql, [id]);
      return reformatOrders(result.rows, id);
    } catch (err) {
      throw { error: `Could not get orders. Error: ${err}` };
    }
  }

  async completedOrders(id: number): Promise<Order[]> {
    try {
      const sql = `SELECT 
      orders.id as id,
      products.name as name,
      order_products.quantity as quantity,
      orders.status as status

      FROM 
      ((orders
         INNER JOIN order_products ON orders.id = order_products.order_id)
         INNER JOIN products ON order_products.product_id = products.id
      )
      
      WHERE
        orders.users_id = ($1) AND status=($2)`;
      const result = await Client.query(sql, [id, "COMPLETE"]);

      return reformatOrders(result.rows, id);
    } catch (err) {
      throw { error: `Could not find order. Error: ${err}` };
    }
  }
}
