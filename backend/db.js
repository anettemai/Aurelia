// Load environment variables from a .env file in development
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'anettesamolberg',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'aurelia_db',
    password: process.env.DB_PASSWORD || undefined,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

module.exports = pool;