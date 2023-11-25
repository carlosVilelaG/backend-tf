const mysql = require("promise-mysql");
// para ver el contenido de .env usamos dotenv, hay que importar
const dotenv = require("dotenv");
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

const getConnection = async ()=> await connection;

module.exports = {
    getConnection
}
