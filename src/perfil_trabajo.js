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
    res.json(result);
});

module.exports = router;