const mysql = require('mysql');
require('dotenv').config();
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "hoidanit",
    password: "Trantuyen2312",
    port: 3306,
})

connect.connect((err, conn) => {
    if (err) {
        console.log('Error connecting', err);
    } else {
        console.log('Connecting');
    }
})

module.exports = connect;
