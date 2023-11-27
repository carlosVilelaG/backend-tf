require('dotenv').config();
const mysql = require('mysql');
// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,  // O tu dirección de host si es diferente
  user     : process.env.DB_USER, // Reemplaza con tu usuario de MySQL
  password : process.env.DB_PASSWORD, // Reemplaza con tu contraseña
  database : process.env.DB_DATABASE // Reemplaza con el nombre de tu base de datos
});

// Conectar a la base de datos
const testDbConnection = () => {
  return new Promise((resolve, reject) => {
      connection.connect((err) => {
          if (err) {
              console.error('Error al conectar a la base de datos:: ', err);
              reject(err);
          } else {
              console.log('Conexión a la base de datos exitosa');
              connection.end();
              resolve('Conexión a la base de datos exitosa::Backend con Node js - Express + Crud Api + mysql');
          }
      });
  });
};
// Cierra la conexión
module.exports = { testDbConnection };
