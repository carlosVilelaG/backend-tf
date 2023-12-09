const express = require('express');
const database = require("./database");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/usuario/crear', async (req, res) => {
    const connection = await database.getConnection();
    try {
        await connection.beginTransaction(); // Iniciar transacción

        const { usuario, perfil } = req.body;
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
        // Insertar usuario
        const queryUsuario = 'INSERT INTO usuario (nombres, email, password, id_rol, estado, identificacion, tipo_identificacion) VALUES (?,?,?,?,?,?,?)';
        const resultUsuario = await connection.query(queryUsuario, [usuario.nombres,usuario.email, hashedPassword, usuario.rol, "activo", usuario.identificacion,usuario.tipoIdentificacion]);
        
        const idUsuario = resultUsuario.insertId;

        // Insertar perfil
        const queryPerfil = 'INSERT INTO perfil_trabajo (id_usuario, profesion, tiempo_experiencia, introduccion) VALUES (?, ?, ?, ?)';
        await connection.query(queryPerfil, [idUsuario, perfil.profesion, perfil.tiempo_experiencia, perfil.introduccion]);

        await connection.commit(); // Finalizar transacción si todo es correcto
        res.status(201).send({ message: "Usuario y perfil creados exitosamente" });
    } catch (error) {
        await connection.rollback(); // Revertir cambios si hay error
        console.error(error);
        res.status(500).send({ message: "Error al crear el usuario y perfil" });
    } finally {
        connection.end(); // Liberar conexión
    }
})

module.exports = router;