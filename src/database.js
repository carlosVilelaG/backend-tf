// Configuración de la conexión a la base de datos MySQL
const mysql = require("mysql2/promise");
// para ver el contenido de .env usamos dotenv, hay que importar
const dotenv = require("dotenv");
dotenv.config()

const pool = mysql.createPool({
    //host: process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 50, 
    queueLimit: 60,      
    waitForConnections: true,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})


module.exports = pool;