const Pool = require('pg').Pool
module.exports = exports = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'EventApp',
    password: '3005952',
    port: 1345,
});