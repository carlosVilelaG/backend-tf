const express = require('express');
const pool = require("./database");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/usuario/login", async (req, res) => {
  console.log('Inicio del endpoint /usuario/login');
  
  (async () => {
    try {
      const { email, password } = req.body;
      // al usar query se retorna como matriz, y cierra internamente la conexion de la consulta
      const [users] = await pool.query("SELECT * FROM usuario WHERE email = ?", [email]);

      if (users.length > 0) {
        const user = users[0];   
        const passwordIsValid = await bcrypt.compare(password, users[0].password);
            if (passwordIsValid) {
                // Lógica cuando la contraseña es válida
               const { password, ...userData } = user;
               res.json(userData);
            } else {
                // Lógica cuando la contraseña no es válida
               res.status(401).json({ error: "Error al verificar la contraseña" });    
            }
          
      } else {
        res.status(402).json({ message: "Usuario no existe." });
      }
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
      res.status(500).json({ error: error.message });
    }
  })();
  
});

module.exports = router;