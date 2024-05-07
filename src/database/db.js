const { Pool } = require('pg');

// Create a new pool instance with database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce_db',
  password: '830701',
  port: 5432, // Default PostgreSQL port
});

// Export the pool instance for use in other modules
module.exports = pool;
