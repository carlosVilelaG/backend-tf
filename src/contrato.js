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
    res.status(500).json({
      message: "Error al insertar contrato",
      error: error.message,
      stack: error.stack,
    });
  }
});

router.get("/contrato/usuario/:id_usuario_trabajador", async (req, res) => {
  try {
    const { id_usuario_trabajador } = req.params;
    const conn = await database.getConnection();

    const query =
      "SELECT * FROM man_location_work.contrato WHERE id_usuario_trabajador = ? AND estado = 'CONTRATADO'";
    const [contratos] = await conn.query(query, [id_usuario_trabajador]);

    conn.release();
    if (contratos.length > 0) {
      res.json(contratos[0]);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron contratos para el trabajador" });
    }
  } catch (error) {
    console.error("Error al consultar contratos:", error);
    res
      .status(500)
      .json({ message: "Error al consultar contratos", error: error.message });
  }
});

router.get("/contrato/relacionado/:id_usuario", async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const conn = await database.getConnection();

    const query =
      "SELECT * FROM man_location_work.contrato WHERE (id_usuario_trabajador = ? or id_usuario_contratante = ? ) AND estado = 'CONTRATADO'";
    const [contratos] = await conn.query(query, [id_usuario, id_usuario]);

    conn.release();
    if (contratos.length > 0) {
      res.json(contratos);
    } else {
      res
        .status(404)
        .json({
          message: "No se encontraron contratos relacionado con el usuario",
        });
    }
  } catch (error) {
    console.error("Error al consultar contratos:", error);
    res
      .status(500)
      .json({ message: "Error al consultar contratos", error: error.message });
  }
});

module.exports = router;
