const { Pool } = require("pg");

let pool = new Pool({
    user: process.env.DBUSERNAME,
    host: process.env.DBHOSTNAME,
    database: process.env.DBDATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
});

module.exports = pool;