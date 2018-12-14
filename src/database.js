require("dotenv").config();
let mysql = require("promise-mysql");    
    
// create the connection information for the sql database
let connection = () => {
    return mysql.createConnection({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.MYSQL_USER_NAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DATABASE
    });
};

module.exports.connection = connection;