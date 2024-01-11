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


router.get("/usuario/nombreusuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await pool.getConnection();

    const query =
      "SELECT u.nombres FROM man_location_work.usuario u WHERE u.id = ?";
    const [result] = await conn.query(query, [id]);

    conn.release();

    if (result.length > 0) {
      const nombre = result[0].nombres;
      res.json({ nombre });
    } else {
      res.status(404).json({ message: "No se encontró el usuario con el ID proporcionado" });
    }
  } catch (error) {
    console.error("Error al consultar el nombre del usuario:", error);
    res.status(500).json({ message: "Error al consultar el nombre del usuario", error: error.message });
  }
});

module.exports = router;