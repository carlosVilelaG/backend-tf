const express = require('express');
const database = require("./database");
const router = express.Router();

router.get('/usuario/ubicacion/:email', async (req, res) => {
    const { email } = req.params;
    const connection = await database.getConnection();
    const query = "SELECT ub.* FROM man_location_work.ubicacion  ub, man_location_work.usuario us "+
                  "where ub.identificacion_usuario = us.identificacion "+
                  "and us.email= ?";
    const result = await connection.query(query, [email]);
    console.log('Email llego:::',email, ":: valor ::");
    res.json(result[0]);
});

// Endpoint para crear una nueva ubicación
router.post('/usuario/ubicacion', async (req, res) => {
    try {
        const { identificacion_usuario, descripcion, latitud, longitud, telefono } = req.body;
        const connection = await database.getConnection();

        // Verificar si la ubicación ya existe
        const query = "SELECT * FROM man_location_work.ubicacion WHERE identificacion_usuario = ?";
        const existing = await connection.query(query, [identificacion_usuario]);

        console.log('Se encontraron ',existing.length ,' registros con identificacion_usuario=',identificacion_usuario);
        if (existing.length > 0) {
            // Actualizar ubicación existente
            const updateQuery = "UPDATE man_location_work.ubicacion SET descripcion = ?, latitud = ?, longitud = ?, telefono = ? WHERE identificacion_usuario = ?";
            await connection.query(updateQuery, [descripcion, latitud, longitud, telefono, identificacion_usuario]);
            console.log('Ubicación actualizada con éxito');
            res.json({ message: 'Ubicación actualizada con éxito' });
        } else {
            // Insertar nueva ubicación
            const insertQuery = "INSERT INTO man_location_work.ubicacion (identificacion_usuario, descripcion, latitud, longitud, telefono,estado) VALUES (?, ?, ?, ?, ?, ?)";
            await connection.query(insertQuery, [identificacion_usuario, descripcion, latitud, longitud, telefono,"ACTIVO"]);
            console.log('Ubicación creada con éxito');
            res.status(201).json({ message: 'Ubicación creada con éxito' });
        }
    } catch (error) {
        console.error('Error en la operación de ubicación:', error);
        res.status(500).json({ message: 'Error en la operación de ubicación' });
    }
});

module.exports = router;