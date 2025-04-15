const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',           
  password: 'Tharakutty@',
  database: 'petrosoft'   
});

// Export the pool
module.exports = pool.promise();
