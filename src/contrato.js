const express = require("express");
const database = require("./database");
const router = express.Router();

router.post("/contrato/crear", async (req, res) => {
  const {
    id_usuario_contratante,
    id_usuario_trabajador,
    tipo_contrato,
    fecha_inicio,
    fecha_fin,
    descripcion,
  } = req.body;
  try {
    const conn = await database.getConnection();
    const result = await conn.query(
      'INSERT INTO man_location_work.contrato (id_usuario_contratante, id_usuario_trabajador, estado, tipo_contrato, fecha_inicio, fecha_fin, descripcion) VALUES (?, ?, "CONTRATADO", ?, ?,?,?)',
      [
        id_usuario_contratante,
        id_usuario_trabajador,
        tipo_contrato,
        fecha_inicio,
        fecha_fin,
        descripcion,
      ]
    );
    conn.end();
    res.status(201).json({ id_contrato: result.insertId });
  } catch (error) {
    console.error("Error al insertar contrato:", error);
    res
      .status(500)
      .json({
        message: "Error al insertar contrato",
        error: error.message,
        stack: error.stack,
      });
  }
});


module.exports = router;