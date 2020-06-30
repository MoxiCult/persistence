const Pool = require('pg').Pool;

const db = new Pool({
    database: 'students',
    user:'gmdb_app',
    password: '123',
    host: 'localhost',
    port: 5432
})

module.exports=db;