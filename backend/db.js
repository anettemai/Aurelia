const { Pool } = require("pg");

const pool = new Pool({
    user: "anettesamolberg",
    host: "localhost",
    database: "aurelia_db",
    port: 5432
})

module.exports = pool;