const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',            // MySQL username
  password: 'Tharakutty@',// MySQL password
  database: 'petrosoft'    // MySQL database name
});

// Export the pool
module.exports = pool.promise();
