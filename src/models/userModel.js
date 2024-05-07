// userModel.js
const pool = require('../database/db');

const userModel = {
  createUser: async (userData) => {
    const { username, email, password } = userData;
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
  
  getUserByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },
  
  getUserById: async (userId) => {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  },
  
  updateUser: async (userId, userData) => {
    const { username, email, password } = userData;
    const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4';
    const values = [username, email, password, userId];
    await pool.query(query, values);
  },
  
  deleteUser: async (userId) => {
    const query = 'DELETE FROM users WHERE user_id = $1';
    await pool.query(query, [userId]);
  }
};

module.exports = userModel;
