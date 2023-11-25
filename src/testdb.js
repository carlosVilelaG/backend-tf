require('dotenv').config();
const mysql = require('mysql');
// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,  // O tu dirección de host si es diferente
  user     : process.env.DB_USER, // Reemplaza con tu usuario de MySQL
  password : process.env.DB_PASSWORD, // Reemplaza con tu contraseña
  database : process.env.DB_DATABASE // Reemplaza con el nombre de tu base de datos
});
console.log('host::',    process.env.DB_HOST);
console.log('usuario::', process.env.DB_USER);
console.log('PASWORD::', process.env.DB_PASSWORD);
console.log('DATABASE::',process.env.DB_DATABASE);
// Conectar a la base de datos
connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
    return;
  }

  console.log('Conectado a la base de datos con el ID ' + connection.threadId);
});

// Cierra la conexión
connection.end();
