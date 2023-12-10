const express = require('express');
const database = require("./database");
const router = express.Router();

router.get('/profesion', async (req, res) => {

    const connection = await database.getConnection();
    const estado = "ACTIVO";
    const query = "SELECT * FROM man_location_work.area_profesion where estado = ? ";
    const [result] = await connection.query(query, [estado]);    
    res.json(result);
});

router.get('/profesion/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await database.getConnection();
    const estado = "ACTIVO";
    const query = "SELECT * FROM man_location_work.area_profesion where id_area = ? and estado = ? ";
    const [result] = await connection.query(query, [id, estado]);    
    res.json(result[0]);
});

module.exports = router;