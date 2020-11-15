const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// Connecting to local postgres server
const pool = new Pool({
  host: process.env.pg_host,
  user: process.env.pg_user,
  port: process.env.pg_port,
  password: process.env.pg_password,
  database: process.env.pg_database,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
