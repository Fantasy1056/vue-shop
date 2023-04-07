const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Hy1056',
  database: 'tea'
})
module.exports = connection
