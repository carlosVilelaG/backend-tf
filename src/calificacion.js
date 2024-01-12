const express = require('express');
const database = require("./database");
const router = express.Router();

router.get("/calificacion/todos", async (req, res) => {
    try {
      const connection = await database.getConnection();
      const limiteRegistro = 50;
      const query =
        "SELECT * FROM man_location_work.calificacion WHERE nivel_calificacion != 0 ORDER BY id_calificacion DESC LIMIT ? ";
  
      const [result] = await connection.query(query, [limiteRegistro]);
      connection.release();
  
      if (result.length > 0) {
          res.json(result);
        } else {
          res
            .status(404)
            .json({
              message: "No se encontraron calificaciones todos",
            });
        }
    } catch (error) {
      console.error("Error al consultar calificaciones todos:", error);
      res.status(500)
         .json({message: "Error al consultar calificaciones todos", error: error.message,
        });
    }
  });

router.post("/calificacion/crear", async (req, res) => {
    const {
      nivel_calificacion,
      comentario,
      id_usuario_trabajador,
      id_contrato,
    } = req.body;
    
    const conn = await database.getConnection();
    await conn.beginTransaction();
    try {    
      const result = await conn.query(
        'INSERT INTO man_location_work.calificacion (nivel_calificacion, comentario, id_usuario_trabajador, id_contrato) VALUES (?, ?, ?, ?)',
        [
            nivel_calificacion,
            comentario,
            id_usuario_trabajador,
            id_contrato,
        ]
      );
      await conn.commit();
      conn.release();
      res.status(201).json({ id_calificacion: result[0].insertId });
    } catch (error) {
      await conn.rollback();
      conn.release();
      res.status(500).json({
        message: "Error al insertar calificacion",
        error: error.message,
        stack: error.stack,
      });
    }
  });

  router.put("/calificacion/editar", async (req, res) => {
    const { id_calificacion, nivel_calificacion, comentario } = req.body;
    try {
      const conn = await database.getConnection();
      const query =
        "UPDATE man_location_work.calificacion SET nivel_calificacion = ?, comentario = ? WHERE id_calificacion = ?";
      const result = await conn.query(query, [nivel_calificacion, comentario, id_calificacion]);
  
      conn.release();
      if (result[0].affectedRows > 0) {
        res.json({ message: "Calificacion actualizado con éxito::." });
      } else {
        res.status(404).json({ message: "Calificacion no encontrado:." });
      }
    } catch (error) {
      console.error("Error al actualizar calificacion:", error);
      res.status(500).json({
        message: "Error al actualizar calificacion",
        error: error.message,
      });
    }
  });

  router.get('/calificacion/:idContratante', async (req, res) => {
    try {
     const { idContratante } = req.params;
     const connection = await database.getConnection();
     const query = "SELECT ca.* FROM man_location_work.calificacion ca, man_location_work.contrato c WHERE c.id_usuario_contratante = ? " 
                   + " AND c.id_contrato = ca.ID_CONTRATO "
 
     const [result] = await connection.query(query, [idContratante]);    
     connection.release();
     
     if (result.length > 0) {
         res.json(result);
       } else {
         res
           .status(404)
           .json({
             message: "No se encontraron calificaciones relacionado con el usuario xxx",
           });
       }
 } catch (error) {
     console.error("Error al consultar calificaciones:", error);
     res
       .status(500)
       .json({ message: "Error al consultar calificaciones", error: error.message });
    }
 });
 
 
  module.exports = router;