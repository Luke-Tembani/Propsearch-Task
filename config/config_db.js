const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DB,
    password:process.env.PASSWORD,
    queueLimit:process.env.LIMIT,
});
module.exports = db;