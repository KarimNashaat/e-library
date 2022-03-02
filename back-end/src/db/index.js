const mysql = require("mysql2");
const { dbConfig } = require("../config/index");

var connection = mysql.createPool({
    host: process.env.HOST || dbConfig.HOST,
    user: process.env.USER || dbConfig.USER,
    password: process.env.PASSWORD || dbConfig.PASSWORD,
    database: process.env.DB || dbConfig.DB
});

module.exports = connection;