const express = require('express');
const database = require("./database");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/usuario/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const connection = await database.getConnection();
      const query = "SELECT * FROM usuario WHERE email = ?";
      const users = await connection.query(query, [email]);

      if (users.length > 0) {
        const user = users[0];
        // Usamos la versión asíncrona de bcrypt para verificar la contraseña y evitar bloqueos
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
              console.error('############# Error al generar hash:', hash);
            } else {
              console.log('############# Hash de la contraseña:', hash);
            }
          });                
    

        bcrypt.compare(password, user.password, (err, passwordIsValid) => {
          if (err) {
            // Manejamos el error aquí
            res.status(500).json({ error: "Error al verificar la contraseña" });
          } else if (passwordIsValid) {
            // Suponiendo que no quieres devolver la contraseña,
            // puedes hacer algo como esto: se quita la contraseña del objeto a devolver
            const { password, ...userData } = user;
            res.json(userData);
          } else {
            res.status(401).json({ message: "Credenciales inválidas." });
          }
        });
      } else {
        res.status(402).json({ message: "Usuario no existe." });
      }
    } catch (error) {
      console.error("Error en la conexión o la consulta:", error);
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;