// Configuración de la conexión a la base de datos MySQL
const mysql = require("promise-mysql");
// para ver el contenido de .env usamos dotenv, hay que importar
const dotenv = require("dotenv");
dotenv.config()

const connection = mysql.createConnection({
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})

const getConnection = async ()=> await connection;

module.exports = {
    getConnection
}