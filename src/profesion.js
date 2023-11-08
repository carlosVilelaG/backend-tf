const express = require('express');
const database = require("./database");
const router = express.Router();

router.get('/profesion', async (req, res) => {

    const connection = await database.getConnection();
    const estado = "ACTIVO";
    const query = "SELECT * FROM man_location_work.area_profesion where estado = ? ";
    const result = await connection.query(query, [estado]);    
    res.json(result);
});

module.exports = router;