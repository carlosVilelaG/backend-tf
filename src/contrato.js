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
  
  const conn = await database.getConnection();
  await conn.beginTransaction();
  try {    
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
    await conn.commit();
    conn.release();
    res.status(201).json({ id_contrato: result[0].insertId });
  } catch (error) {
    await conn.rollback();
    conn.release();
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

router.get("/contrato/general/:id_usuario", async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const conn = await database.getConnection();

    const query =
      "SELECT * FROM man_location_work.contrato WHERE (id_usuario_trabajador = ? or id_usuario_contratante = ? ) ";
    const [contratos] = await conn.query(query, [id_usuario, id_usuario]);

    conn.release();
    if (contratos.length > 0) {
      res.json(contratos);
    } else {
      res
        .status(404)
        .json({
          message: "No se encontraron contratos del usuario",
        });
    }
  } catch (error) {
    console.error("Error al consultar contratos:", error);
    res
      .status(500)
      .json({ message: "Error al consultar contratos", error: error.message });
  }
});

router.put("/contrato/editar", async (req, res) => {
  const { id_contrato, estado, fecha_fin, comentario } = req.body;
  try {
    const conn = await database.getConnection();
    const query =
      "UPDATE man_location_work.contrato SET estado = ?, fecha_fin = ?, comentario = ? WHERE id_contrato = ?";
    const result = await conn.query(query, [estado, fecha_fin, comentario, id_contrato]);

    conn.release();
    if (result[0].affectedRows > 0) {
      res.json({ message: "Contrato actualizado con éxito::." });
    } else {
      res.status(404).json({ message: "Contrato no encontrado:." });
    }
  } catch (error) {
    console.error("Error al actualizar contrato:", error);
    res.status(500).json({
      message: "Error al actualizar contrato",
      error: error.message,
    });
  }
});

module.exports = router;
