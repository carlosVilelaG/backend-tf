const mysql = require("promise-mysql");
// para ver el contenido de .env usamos dotenv, hay que importar
const dotenv = require("dotenv");
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.host,
    database:process.env.database,
    user:process.env.user,
    password: process.env.password
})

const getConnection = async ()=> await connection;

module.exports = {
    getConnection
}