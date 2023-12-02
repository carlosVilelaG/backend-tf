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


module.exports = router;