// orderModel.js
const pool = require('../database/db');

const orderModel = {
  createOrder: async (orderData) => {
    const { userId, totalAmount, status } = orderData;
    
    // Start a transaction
    const client = await pool.connect();
    try {
      // Create order
      await client.query('BEGIN');

      const createOrderQuery = 'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *';
      const createOrderValues = [userId, totalAmount, status];
      const { rows: newOrder } = await client.query(createOrderQuery, createOrderValues);

      // Add order items (if any)
      // Implementation depends on your system architecture

      // Commit the transaction
      await client.query('COMMIT');

      return newOrder[0];
    } catch (error) {
      // If an error occurs, rollback the transaction
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  },
  
  getOrderById: async (orderId) => {
    const query = 'SELECT * FROM orders WHERE order_id = $1';
    const { rows } = await pool.query(query, [orderId]);
    return rows[0];
  },
  
  updateOrder: async (orderId, orderData) => {
    const { totalAmount, status } = orderData;
    const query = 'UPDATE orders SET total_amount = $1, status = $2 WHERE order_id = $3';
    const values = [totalAmount, status, orderId];
    await pool.query(query, values);
  },
  
  deleteOrder: async (orderId) => {
    const query = 'DELETE FROM orders WHERE order_id = $1';
    await pool.query(query, [orderId]);
  }
};

module.exports = orderModel;
