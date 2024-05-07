// productModel.js
const pool = require('../database/db');

const productModel = {
  createProduct: async (productData) => {
    const { name, description, price, imageUrl } = productData;
    const query = 'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, description, price, imageUrl];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
  
  getAllProducts: async () => {
    const query = 'SELECT * FROM products';
    const { rows } = await pool.query(query);
    return rows;
  },
  
  getProductById: async (productId) => {
    const query = 'SELECT * FROM products WHERE product_id = $1';
    const { rows } = await pool.query(query, [productId]);
    return rows[0];
  },
  
  updateProduct: async (productId, productData) => {
    const { name, description, price, imageUrl } = productData;
    const query = 'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE product_id = $5';
    const values = [name, description, price, imageUrl, productId];
    await pool.query(query, values);
  },
  
  deleteProduct: async (productId) => {
    const query = 'DELETE FROM products WHERE product_id = $1';
    await pool.query(query, [productId]);
  }
};

module.exports = productModel;
