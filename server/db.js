const Pool = require('pg').Pool
module.exports = exports = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'EventApp',
    password: '123456',
    port: 1345,
});
