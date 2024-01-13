const express = require('express');
const database = require("./database");
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/perfilestrabajo', async (req, res) => {
    const connection = await database.getConnection();
    const rolTrabajdor = 2;
    const query = "SELECT us.id, us.nombres, us.email, us.identificacion, ub.latitud, ub.longitud, pr.introduccion ,  pr.profesion "+
    "FROM man_location_work.ubicacion  ub, man_location_work.usuario us, man_location_work.perfil_trabajo pr "+
    "where ub.identificacion_usuario = us.identificacion "+
    "and us.id = pr.id_usuario and us.id_rol = ?";
    const [result] = await connection.query(query, [rolTrabajdor]);
    connection.release();
    res.json(result);
});


router.get('/perfilestrabajo/:profesion', async (req, res) => {
    const { profesion } = req.params;
    const connection = await database.getConnection();
    const rolTrabajdor = 2;
    const query = "SELECT us.id, us.nombres, us.email, us.identificacion, ub.latitud, ub.longitud, pr.introduccion,  pr.profesion, ap.nombre_area_profesion "+
    "FROM man_location_work.ubicacion  ub, man_location_work.usuario us, man_location_work.perfil_trabajo pr , man_location_work.area_profesion ap "+
    "where ub.identificacion_usuario = us.identificacion "+
    "and us.id = pr.id_usuario and us.id_rol = ? "+
    "and pr.profesion = ? and pr.profesion = ap.id_area";
    const [result] = await connection.query(query, [rolTrabajdor, profesion]);
    connection.release();
    res.json(result);
});

router.get('/perfilestrabajo/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const connection = await database.getConnection();
    const query = "SELECT pr.id_perfil, pr.id_usuario, pr.profesion , pr.tiempo_experiencia, pr.introduccion "+
    "FROM man_location_work.perfil_trabajo pr where pr.id_usuario = ? ";
    const [result] = await connection.query(query, [id_usuario]);
    connection.release();
    res.json(result);
});
;

router.get('/perfiles/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const connection = await database.getConnection();
    const query = "SELECT p.* FROM man_location_work.perfil_trabajo p WHERE p.id_usuario = ?";
    const [result] = await connection.query(query, [id_usuario]);
    connection.release();
    res.json(result);
});

// Endpoint para crear una nuevo perfil o actualizar el existente
router.post('/perfilestrabajo/usuario/registra_actualiza_perfil', async (req, res) => {
    try {
        const {id_perfil, id_usuario, profesion,  tiempo_experiencia,
               introduccion } = req.body;
        const connection = await database.getConnection();
        // Verificar si el id_perfil tiene valor
        if (id_perfil) {
            console.log('registro se actualizara:', id_perfil);
            // Actualizar ubicación existente
            const updateQuery = "UPDATE man_location_work.perfil_trabajo SET profesion = ?, tiempo_experiencia = ?, " +
                                " introduccion = ? WHERE id_perfil = ? and id_usuario = ? ";
            await connection.query(updateQuery, [profesion, tiempo_experiencia, introduccion, id_perfil, id_usuario]);
            res.json({ message: 'Perfil actualizada con éxito' , id_perfil: id_perfil });
        } else {
            // Insertar nueva ubicación
            const insertQuery = "INSERT INTO man_location_work.perfil_trabajo ( id_usuario, profesion, "
                              +" tiempo_experiencia,  introduccion ) VALUES ( ?, ?, ?, ?)";
            const [result] = await connection.query(insertQuery, [id_usuario, profesion, tiempo_experiencia, introduccion ]);
            const newIdPerfil = result.insertId;
            res.status(201).json({ message: 'Perfil creada con éxito' , id_perfil: newIdPerfil });            

        }
    } catch (error) {
        console.error('Error en la operación de perfil:', error);
        if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
            res.status(409).json({ message: 'Claves de profesión y usuario ya existen' });
        } else {
            res.status(500).json({ message: 'Error en la operación de perfil' + error });
        }
        
    }
});




module.exports = router;